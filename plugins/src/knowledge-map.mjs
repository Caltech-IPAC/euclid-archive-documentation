/**
 * MyST plugin: facts from the IRSA knowledge map, in a writer's own prose and tables.
 *   {km} role         one value inside a sentence or table cell, e.g. {km}`tap euclid.q1.mer-catalog`
 *   km-list directive a list of datasets, e.g. every TAP catalog of a collection
 *   km-table          the same as a table, optionally merged with the writer's own columns
 *
 * How it works. MyST builds a page in stages: parse Markdown into an AST, run directives and
 * roles (each returns AST nodes), run transforms (which can edit the whole tree), then render HTML.
 * Directives and roles run synchronously, so they can't wait for the map to download; transforms
 * can be async. So the work is split:
 *   1. Directive or role: records what the writer asked for in a placeholder node. Directives
 *      also save ctx.parseMyst (Markdown -> AST, only handed to directives) for their page.
 *   2. Transform (once per page): finds the placeholders, loads the map with km-lookup.mjs
 *      (fetched once per build), builds each one's AST nodes and swaps them in. Errors become an
 *      {error} box (or inline text for the role) plus a build error, which stops --strict builds.
 * Same pattern as the community plugins, e.g. github-issue-table in
 * https://github.com/jupyter-book/myst-plugins
 */

import * as km from './km-lookup.mjs';

// Placeholder node type for the AST nodes returned by the directives and role
const PLACEHOLDER = 'knowledgeMapPlaceholder';
// Each page's ctx.parseMyst, saved by the directives for the transform
const parserForPage = new Map();


// AST nodes ---------------------------------------------------------------------------------
const text = value => ({ type: 'text', value });
const code = value => ({ type: 'inlineCode', value });
const link = (url, children = [text(url)]) => ({ type: 'link', url, children });
const paragraph = children => ({ type: 'paragraph', children });
const cell = (children, header = false) => ({ type: 'tableCell', ...(header && { header }), children });

/** Inline nodes joined with commas. */
const joined = nodes => nodes.flatMap((node, index) => index ? [text(', '), node] : [node]);

/** A value as an inline node: a link for URLs and DOIs, code for service names, else text. */
function valueNode(field, value, serviceKeys) {
  if (/^https?:\/\//.test(value)) return link(value);
  if (field === 'doi') return link(`https://doi.org/${value}`, [text(value)]);
  return serviceKeys.has(field) ? code(value) : text(value);
}

/** The inline nodes of a one-paragraph Markdown string, e.g. an error message. */
function inlineMyst(parseMyst, markdown) {
  if (!parseMyst) return [text(markdown)];
  const [first] = parseMyst(markdown).children;
  return first?.type === 'paragraph' ? first.children : [text(markdown)];
}

const errorBox = (directive, message, parseMyst) => ({
  type: 'admonition',
  kind: 'error',
  children: [
    { type: 'admonitionTitle', children: [code(directive), text(' error')] },
    paragraph(inlineMyst(parseMyst, message)),
  ],
});


// Errors that teach: say what's valid and where to look in the map ----------------------------

/** The candidate closest to a misspelled word, if any is close enough to be a likely typo. */
function closest(word, candidates) {
  const distance = (a, b) => {
    let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
      const current = [i];
      for (let j = 1; j <= b.length; j++) {
        current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      previous = current;
    }
    return previous[b.length];
  };
  const [best] = candidates
    .map(candidate => [candidate, distance(word, candidate)])
    .sort((x, y) => x[1] - y[1]);
  return best && best[1] <= Math.max(2, word.length / 3) ? best[0] : null;
}

const didYouMean = (word, candidates) => {
  const suggestion = closest(word, candidates);
  return suggestion ? ` Did you mean \`${suggestion}\`?` : '';
};
const codeList = items => items.map(item => `\`${item}\``).join(', ');
const seeInMap = async (mission, id) => `[See \`${id}\` in the map](${await km.sourceLink(mission, id)}).`;

/** Load a collection or dataset by id: { mission, missionData, entity }, or throw a teaching error. */
async function resolve(id) {
  const [mission, collectionKey, product, ...extra] = id.split('.');
  let missionData;
  try {
    missionData = await km.load(mission);
  } catch (error) {
    throw new Error(`Could not read mission \`${mission}\` from the knowledge map at ${km.SOURCE}: ${error.message}`);
  }
  const collection = km.collection(missionData, collectionKey);
  if (!collection || extra.length) {
    const ids = missionData.collections.map(c => c.id);
    throw new Error(`No collection \`${mission}.${collectionKey}\` in the knowledge map.${didYouMean(`${mission}.${collectionKey}`, ids)} Collections: ${codeList(ids)}.`);
  }
  if (!product) return { mission, missionData, entity: collection };
  const entity = km.dataset(missionData, collectionKey, product);
  if (!entity) {
    const products = (collection.datasets ?? []).map(d => d.id.split('.')[2]);
    throw new Error(`No dataset \`${id}\`.${didYouMean(product, products)} ${await seeInMap(mission, collection.id)}`);
  }
  return { mission, missionData, entity };
}

/** The values of one field, or throw a teaching error listing the fields it has. */
async function fieldValues(mission, entity, field) {
  const found = km.values(entity, field);
  const fields = km.fieldNames(entity);
  if (found === null) {
    throw new Error(`\`${entity.id}\` has no \`${field}\`.${didYouMean(field, fields)} Fields: ${codeList(fields)}. ${await seeInMap(mission, entity.id)}`);
  }
  if (!found.length) {
    throw new Error(`\`${entity.id}\` lists \`${field}\` without a name to show. ${await seeInMap(mission, entity.id)}`);
  }
  return found;
}

/** A collection's datasets, filtered by the via, type and products options. */
async function selectDatasets({ collectionId, via, datasetType, products }) {
  const { mission, entity: collection } = await resolve(collectionId);
  if (collectionId.split('.').length !== 2) {
    throw new Error(`Expected a collection id like \`euclid.q1\`, got \`${collectionId}\`.`);
  }
  const datasets = collection.datasets ?? [];
  const serviceKeys = Object.keys(await km.services());
  if (via && !serviceKeys.includes(via)) {
    throw new Error(`No service \`${via}\` in the knowledge map.${didYouMean(via, serviceKeys)} Services: ${codeList(serviceKeys)}.`);
  }
  const types = [...new Set(datasets.map(d => d.type))];
  if (datasetType && !types.includes(datasetType)) {
    throw new Error(`No datasets of type \`${datasetType}\` in \`${collectionId}\`.${didYouMean(datasetType, types)} Types: ${codeList(types)}.`);
  }
  const productOf = dataset => dataset.id.split('.')[2];
  for (const product of products ?? []) {
    if (!datasets.some(d => productOf(d) === product)) {
      throw new Error(`No dataset \`${collectionId}.${product}\`.${didYouMean(product, datasets.map(productOf))} ${await seeInMap(mission, collectionId)}`);
    }
  }
  const selected = datasets
    .filter(d => !datasetType || d.type === datasetType)
    .filter(d => !via || (d.access ?? []).some(entry => entry.via === via && entry.name))
    .filter(d => !products || products.includes(productOf(d)));
  if (!selected.length) {
    throw new Error(`No datasets in \`${collectionId}\` match ${codeList([via && `via: ${via}`, datasetType && `type: ${datasetType}`].filter(Boolean))}. ${await seeInMap(mission, collectionId)}`);
  }
  return { mission, collection, selected, productOf };
}


// Rendering placeholders into AST nodes ------------------------------------------------------
// Each loads what it needs and returns nodes, or throws an Error whose message is shown on the
// page. `messages` collects warnings to log.

async function renderRole({ request }) {
  const [field, id, ...extra] = request.trim().split(/\s+/);
  if (!id || extra.length) {
    throw new Error(`Expected \`<field> <id>\`, e.g. \`\`{km}\`tap euclid.q1.mer-catalog\` \`\`, got \`${request}\`.`);
  }
  const { mission, entity } = await resolve(id);
  const serviceKeys = new Set(Object.keys(await km.services()));
  const found = await fieldValues(mission, entity, field);
  return joined(found.map(value => valueNode(field, value, serviceKeys)));
}

async function renderList({ collectionId, via, datasetType, products, describe }) {
  const { selected } = await selectDatasets({ collectionId, via, datasetType, products });
  const items = selected.flatMap(dataset => {
    if (!via) return [[text(dataset.name)]];
    return km.values(dataset, via).map(name => describe ? [code(name), text(`: ${dataset.name}`)] : [code(name)]);
  });
  return [{
    type: 'list',
    ordered: false,
    spread: false,
    children: items.map(children => ({ type: 'listItem', spread: false, children: [paragraph(children)] })),
  }];
}

const DEFAULT_HEADERS = { name: 'Name', id: 'ID', type: 'Type', doi: 'DOI', description: 'Description' };

async function renderTable({ collectionId, via, datasetType, products, columns, headers, caption, tableOptions, body }, messages) {
  const filtered = Boolean(via || datasetType || products);
  if (!filtered && !body) {
    throw new Error('Add `:via:`, `:type:` or `:products:` to choose rows, or a body table keyed by product.');
  }

  // The writer's own columns: a Markdown table in the body whose `key` column holds product keys
  let writerRows = new Map();
  let writerHeaders = [];
  if (body) {
    const [headerRow, ...rows] = body.children;
    writerHeaders = headerRow.children.map(c => c.children.map(n => n.value ?? '').join('').trim());
    const keyColumn = writerHeaders.indexOf('key');
    if (keyColumn < 0) throw new Error(`The body table needs a \`key\` column of product keys; its columns are ${codeList(writerHeaders)}.`);
    writerRows = new Map(rows.map(row => [row.children[keyColumn].children.map(n => n.value ?? '').join('').trim(), row]));
  }

  const { mission, collection, selected, productOf } = await selectDatasets({
    collectionId, via, datasetType, products: filtered ? products : [...writerRows.keys()],
  });
  const selectedKeys = selected.map(productOf);
  for (const key of writerRows.keys()) {
    if (!selectedKeys.includes(key)) {
      const inCollection = (collection.datasets ?? []).some(d => productOf(d) === key);
      throw new Error(inCollection
        ? `Body row \`${key}\` isn't among the datasets this table selects (${codeList([via && `via: ${via}`, datasetType && `type: ${datasetType}`].filter(Boolean))}).`
        : `Body row \`${key}\`: no dataset \`${collectionId}.${key}\`.${didYouMean(key, selectedKeys)} ${await seeInMap(mission, collectionId)}`);
    }
  }

  // Writer's rows first, in their order, then any the map has that they didn't write
  const ordered = [
    ...[...writerRows.keys()].map(key => selected.find(d => productOf(d) === key)),
    ...selected.filter(d => !writerRows.has(productOf(d))),
  ];
  const serviceKeys = new Set(Object.keys(await km.services()));
  for (const column of columns) {
    if (writerHeaders.includes(column) || serviceKeys.has(column)) continue;
    if (ordered.every(d => km.values(d, column) === null)) {
      const fields = [...new Set(ordered.flatMap(km.fieldNames))];
      throw new Error(`No column \`${column}\` in the map or the body.${didYouMean(column, [...fields, ...writerHeaders])} Map fields: ${codeList(fields)}.${body ? ` Body columns: ${codeList(writerHeaders)}.` : ''}`);
    }
  }
  if (headers && headers.length !== columns.length) {
    throw new Error(`\`:headers:\` has ${headers.length} labels for ${columns.length} columns.`);
  }

  const missing = ordered.filter(d => !writerRows.has(productOf(d))).map(productOf);
  const writerColumns = columns.filter(column => writerHeaders.includes(column));
  if (body && writerColumns.length && missing.length) {
    const shown = missing.length > 8 ? `${codeList(missing.slice(0, 8))} and ${missing.length - 8} more` : codeList(missing);
    messages.push(`km-table: ${missing.length} row(s) from the map have no ${codeList(writerColumns)} in the body: ${shown}`);
  }

  const headerLabel = column => DEFAULT_HEADERS[column] ?? (serviceKeys.has(column) ? column.toUpperCase() : column);
  const headerRow = {
    type: 'tableRow',
    children: columns.map((column, index) => cell([text(headers?.[index] ?? headerLabel(column))], true)),
  };
  const dataRows = ordered.map(dataset => ({
    type: 'tableRow',
    children: columns.map(column => {
      if (writerHeaders.includes(column)) {
        const row = writerRows.get(productOf(dataset));
        return cell(row ? row.children[writerHeaders.indexOf(column)].children : []);
      }
      const found = km.values(dataset, column) ?? [];
      return cell(joined(found.map(value => valueNode(column, value, serviceKeys))));
    }),
  }));

  // Same nodes as MyST's own {list-table}: a table in a container carrying the caption, label etc.
  const { align, label, ...containerOptions } = tableOptions;
  const table = { type: 'table', ...(align && { align }), children: [headerRow, ...dataRows] };
  return [{
    type: 'container',
    kind: 'table',
    ...containerOptions,
    ...(label && { label, identifier: label.trim().replace(/\s+/g, ' ').toLowerCase() }),
    children: [...(caption ? [{ type: 'caption', children: [paragraph([text(caption)])] }] : []), table],
  }];
}

const RENDERERS = { km: renderRole, 'km-list': renderList, 'km-table': renderTable };


// Directives and role: record the request in a placeholder for the transform to fill ---------

const commaList = value => value?.split(',').map(item => item.trim()).filter(Boolean);

// Options shared by km-list and km-table to choose datasets
const SELECT_OPTIONS = {
  via: { type: String, doc: 'Only datasets served by this service, e.g. sia, ssa, tap (a key in the map\'s irsa.yaml)' },
  type: { type: String, doc: 'Only datasets of this type, e.g. image, catalog, table' },
  products: { type: String, doc: 'Only these product keys, comma-separated, e.g. sir-spectra, sir-frames' },
};

function selection(data) {
  // `type` is the node type, so the dataset-type option travels as `datasetType`
  return { collectionId: data.arg, via: data.options.via, datasetType: data.options.type, products: commaList(data.options.products) };
}

/**
 * MyST role: km. One value from the map, inline.
 *   {km}`tap euclid.q1.mer-catalog`   -> `euclid_q1_mer_catalogue`
 *   {km}`doi euclid.q1.mer-catalog`   -> 10.26131/IRSA602, linked
 *   {km}`overview euclid.q1`          -> the release's overview page, linked
 * Body: `<field> <id>`; the id is a collection or dataset, the field a service key or any of its fields.
 */
const kmRole = {
  name: 'km',
  body: { type: String, required: true },
  run(data) {
    return [{ type: PLACEHOLDER, renderer: 'km', request: data.body, position: data.node.position }];
  },
};

/**
 * MyST directive: km-list. A collection's datasets as a list, in the map's order: the names they're
 * served under for `via`, or their names if no `via`.
 *   :::{km-list} euclid.q1
 *   :via: tap
 *   :type: catalog
 *   :::
 */
const kmListDirective = {
  name: 'km-list',
  arg: { type: String, required: true, doc: 'Collection id, e.g. euclid.q1' },
  options: {
    ...SELECT_OPTIONS,
    describe: { type: Boolean, doc: 'Add each dataset\'s name after its service name' },
  },
  run(data, vfile, ctx) {
    parserForPage.set(vfile.path, ctx.parseMyst);
    return [{ type: PLACEHOLDER, renderer: 'km-list', ...selection(data), describe: data.options.describe, position: data.node.position }];
  },
};

/**
 * MyST directive: km-table. A collection's datasets as a table, one row per dataset. Columns are
 * map fields (service keys like tap, or dataset fields like name, doi) or the writer's own
 * columns from a Markdown table in the body, matched to datasets by its `key` column.
 *   :::{km-table} euclid.q1
 *   :type: catalog
 *   :columns: name, tap, Notes
 *
 *   | key         | Notes            |
 *   | ----------- | ---------------- |
 *   | mer-catalog | Also as HATS.    |
 *   :::
 */
const kmTableDirective = {
  name: 'km-table',
  arg: { type: String, required: true, doc: 'Collection id, e.g. euclid.q1' },
  options: {
    ...SELECT_OPTIONS,
    columns: { type: String, required: true, doc: 'Comma-separated: map fields (tap, name, doi, ...) and body column headers' },
    headers: { type: String, doc: 'Comma-separated header labels, one per column' },
    caption: { type: String, doc: 'Table caption ({list-table}\'s argument; ours is the collection)' },
    // The options of MyST's own {list-table}, applied the same way
    label: { type: String, doc: 'Label to cross-reference the table' },
    class: { type: String, doc: 'CSS classes for the table' },
    align: { type: String, doc: 'Table alignment: left, center or right' },
    enumerated: { type: Boolean, doc: 'Number the table (or not)' },
    enumerator: { type: String, doc: 'Number to use instead of the automatic one' },
  },
  body: { type: String, doc: 'Optional Markdown table with a `key` column of product keys and the writer\'s own columns' },
  run(data, vfile, ctx) {
    parserForPage.set(vfile.path, ctx.parseMyst);
    const table = data.body ? ctx.parseMyst(data.body).children.find(node => node.type === 'table') : undefined;
    return [{
      type: PLACEHOLDER,
      renderer: 'km-table',
      position: data.node.position,
      ...selection(data),
      columns: commaList(data.options.columns),
      headers: commaList(data.options.headers),
      caption: data.options.caption,
      tableOptions: Object.fromEntries(['label', 'class', 'align', 'enumerated', 'enumerator']
        .filter(option => data.options[option] !== undefined)
        .map(option => [option, data.options[option]])),
      // `body` holds the parsed table, not as children, so the transform doesn't walk into it first
      body: table,
      bodyProblem: data.body && !table ? 'The body should be a Markdown table with a `key` column.' : undefined,
    }];
  },
};


// Transform: replace each placeholder with its rendered content ----------------------------

// The box {myst:demo} (from jupyter-book/myst-plugins) wraps its rendered example in
const DEMO_CLASS = 'myst-demo-container';

/** Each placeholder with its parent, and whether it's inside a {myst:demo} box. */
function findPlaceholders(node, parent = null, inDemo = false, found = []) {
  if (node?.type === PLACEHOLDER) found.push({ node, parent, inDemo });
  const childInDemo = inDemo || node?.class === DEMO_CLASS;
  for (const child of node?.children ?? []) findPlaceholders(child, node, childInDemo, found);
  return found;
}

const kmTransform = {
  name: 'knowledge-map-transform',
  doc: 'Replace knowledge-map placeholders with content from the IRSA knowledge map',
  stage: 'document',
  plugin: () => async (tree, vfile) => {
    const parseMyst = parserForPage.get(vfile.path);
    // Repeat until none are left: a km-table's body can hold {km} roles, found once it's rendered
    let placeholders;
    while ((placeholders = findPlaceholders(tree)).length) {
      for (const { node, parent, inDemo } of placeholders) {
        const messages = [];
        let rendered;
        try {
          if (node.bodyProblem) throw new Error(node.bodyProblem);
          rendered = await RENDERERS[node.renderer](node, messages);
        } catch (error) {
          // Shown on the page and logged as a build error, which fails `--strict` builds; except
          // in a {myst:demo} box, where errors are examples (see km_examples.md).
          if (!inDemo) vfile.message(`${node.renderer}: ${error.message}`, node.position).fatal = true;
          rendered = node.renderer === 'km'
            ? [{ type: 'strong', children: [text('⚠ km: '), ...inlineMyst(parseMyst, error.message)] }]
            : [errorBox(node.renderer, error.message, parseMyst)];
        }
        if (!inDemo) for (const message of messages) vfile.message(message, node.position);
        // Replace the placeholder in its parent with the rendered nodes
        parent.children.splice(parent.children.indexOf(node), 1, ...rendered);
      }
    }
  },
};


const plugin = {
  name: 'IRSA knowledge map',
  directives: [kmListDirective, kmTableDirective],
  roles: [kmRole],
  transforms: [kmTransform],
};

export default plugin;
