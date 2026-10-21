/**
 * MyST plugin: render facts from the IRSA knowledge map (km-names, km-access directives).
 *
 * How it works. MyST builds a page in stages: parse Markdown into an AST, run directives
 * (each returns AST nodes), run transforms (which can edit the whole tree), then render HTML.
 * Directives run synchronously, so they can't wait for the map to download; transforms can be
 * async. So the work is split:
 *   1. Directive: records what the author asked for in a placeholder node, and saves
 *      ctx.parseMyst (Markdown -> AST, only handed to directives) for its page.
 *   2. Transform (once per page): finds the placeholders, loads the map with km-lookup.mjs
 *      (fetched once per build), renders each request as a Markdown string, parses it with
 *      the page's saved parseMyst, and swaps the placeholder for the resulting nodes. Errors become an
 *      {error} box plus a build error, which stops --strict builds.
 * Same pattern as the community plugins, e.g. github-issue-table in
 * https://github.com/jupyter-book/myst-plugins
 */

import * as km from './km-lookup.mjs';

// Placeholder node type for the AST nodes returned by the directives
const PLACEHOLDER = 'knowledgeMapPlaceholder';
// Each page's ctx.parseMyst, saved by the directives for the transform
const parserForPage = new Map();


// MyST markdown templates — kept separate from logic for readability ----------------------
const errorMyst = (directive, message) => [
  `:::{error} \`${directive}\` error`,
  message,
  ':::',
].join('\n');

const listMyst = (items) => items.map(item => `- ${item}`).join('\n');
// End of MyST markdown templates


// Rendering placeholders into MyST --------------------------------------------------------
// Each loads what it needs, returns MyST markdown, or throws an Error whose message is shown
// on the page.

/** Load the mission for a collection id like 'euclid.q1': [missionData, collectionKey]. */
async function loadCollection(collectionId) {
  const [mission, collectionKey] = collectionId.split('.');
  let missionData;
  try {
    missionData = await km.load(mission);
  } catch (error) {
    throw new Error(`Could not read mission \`${mission}\` from the knowledge map at ${km.SOURCE}: ${error.message}`);
  }
  if (!km.collection(missionData, collectionKey)) {
    throw new Error(`No collection \`${collectionId}\` in the knowledge map`);
  }
  return [missionData, collectionKey];
}

async function renderNames({ collectionId, via, datasetType, describe }) {
  const [missionData, collectionKey] = await loadCollection(collectionId);
  const entries = km.collectionNames(missionData, collectionKey, via, datasetType)
    .map(([name, dataset]) => describe ? `\`${name}\`: ${dataset.name}` : `\`${name}\``)
    .sort();
  if (!entries.length) throw new Error(`No \`${via}\` entries in \`${collectionId}\``);
  return listMyst(entries);
}

async function renderAccess({ collectionId, products }) {
  const [missionData, collectionKey] = await loadCollection(collectionId);
  const services = await km.services();
  return listMyst(products.map(product => {
    const dataset = km.dataset(missionData, collectionKey, product);
    if (!dataset) throw new Error(`No product \`${product}\` in \`${collectionId}\``);
    const routes = (dataset.access ?? []).map(entry => {
      const serviceName = services[entry.via]?.name ?? entry.via;
      // Show the name only where it's an identifier a user queries with; paths are noise here.
      return ['sia', 'ssa', 'tap', 'scs'].includes(entry.via) && entry.name
        ? `${serviceName} (\`${entry.name}\`)` : serviceName;
    });
    return `**${dataset.name}**: ${[...new Set(routes)].join(', ')}`;
  }));
}

const RENDERERS = { 'km-names': renderNames, 'km-access': renderAccess };


// Directives: record the request in a placeholder for the transform to fill ---------------

/**
 * MyST directive: km-names
 *
 * Lists the names a collection's datasets are served under for one service, e.g. its SIA
 * collections or TAP tables, sorted.
 *
 * Arg:      collection id, e.g. euclid.q1
 * Options:  via      service key from the map's irsa.yaml, e.g. sia, ssa, tap (required)
 *           type     only datasets of this type, e.g. catalog, table
 *           describe add each dataset's name after the service name
 *
 * Example:
 *   ```{km-names} euclid.q1
 *   :via: tap
 *   :type: table
 *   :describe:
 *   ```
 */
const kmNamesDirective = {
  name: 'km-names',
  arg: { type: String, required: true },
  options: {
    via: { type: String, required: true },
    type: { type: String },
    describe: { type: Boolean },
  },

  run(data, vfile, ctx) {
    const { via, type, describe } = data.options;
    // `type` is the node type, so the dataset-type option travels as `datasetType`
    const placeholder = { type: PLACEHOLDER, directive: 'km-names', collectionId: data.arg, via, datasetType: type, describe };
    parserForPage.set(vfile.path, ctx.parseMyst);
    return [placeholder];  // the placeholder AST node, to be replaced by the transform
  },
};

/**
 * MyST directive: km-access
 *
 * For each listed product, says how it can be accessed: the services the map lists for it,
 * with their names (e.g. the SSA collection), using the service names from irsa.yaml.
 *
 * Arg:   collection id, e.g. euclid.q1
 * Body:  one product key per line (the last part of a dataset id, e.g. sir-spectra)
 *
 * Example:
 *   ```{km-access} euclid.q1
 *   sir-spectra
 *   sir-frames
 *   ```
 */
const kmAccessDirective = {
  name: 'km-access',
  arg: { type: String, required: true },
  body: { type: String, required: true },

  run(data, vfile, ctx) {
    const products = data.body.split('\n').map(line => line.trim()).filter(Boolean);
    const placeholder = { type: PLACEHOLDER, directive: 'km-access', collectionId: data.arg, products };
    parserForPage.set(vfile.path, ctx.parseMyst);
    return [placeholder];  // the placeholder AST node, to be replaced by the transform
  },
};


// Transform: replace each placeholder with its rendered content ----------------------------

function findPlaceholders(node, parent = null, found = []) {
  if (node?.type === PLACEHOLDER) found.push({ node, parent });
  for (const child of node?.children ?? []) findPlaceholders(child, node, found);
  return found;
}

const kmTransform = {
  name: 'knowledge-map-transform',
  doc: 'Replace knowledge-map placeholders with content from the IRSA knowledge map',
  stage: 'document',
  plugin: () => async (tree, vfile) => {
    const placeholders = findPlaceholders(tree);
    if (!placeholders.length) return;

    const parseMyst = parserForPage.get(vfile.path);

    for (const { node, parent } of placeholders) {
      let myst;
      try {
        myst = await RENDERERS[node.directive](node);
      } catch (error) {
        // Shown on the page and logged as a build error, which fails `--strict` builds.
        vfile.message(`${node.directive}: ${error.message}`).fatal = true;
        myst = errorMyst(node.directive, error.message);
      }
      // Replace the placeholder in its parent with the nodes parsed from the rendered MyST
      const renderedNodes = parseMyst(myst).children;
      const index = parent.children.indexOf(node);
      parent.children.splice(index, 1, ...renderedNodes);
    }
  },
};


const plugin = {
  name: 'IRSA knowledge map',
  directives: [kmNamesDirective, kmAccessDirective],
  transforms: [kmTransform],
};

export default plugin;
