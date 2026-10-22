# Euclid docs MyST plugins

Custom [MyST](https://mystmd.org) plugins for the Euclid Archive at IRSA documentation.

## Building

```bash
cd plugins
npm install
npm run build
```

This bundles `src/knowledge-map.mjs` (and the `src/km-lookup.mjs` it imports) into `dist/knowledge-map.mjs`. Must *re-run* after any changes to `src/`, and restart a running `jupyter-book start`: MyST only loads plugins at startup, so hot reload won't pick up a rebuilt plugin. `tox -e buildhtml` builds the plugin before building the site.

## Registering with MyST

The built bundle is registered in `myst.yml`:

```yaml
project:
  plugins:
    - plugins/dist/knowledge-map.mjs
```

---

## Plugin: `knowledge-map`

Puts facts from the [IRSA knowledge map](https://github.com/jaladh-singhal/irsa-knowledge-map) (collection and table names, paths, links, DOIs, release dates) into the pages' own prose and tables, so they stay in step with what IRSA serves instead of being hand-copied.

### For writers

| You want | Write |
| --- | --- |
| A value in a sentence or table cell | `` {km}`tap euclid.q1.mer-catalog` `` |
| A list of all of something | `:::{km-list} euclid.q1` |
| A table of them, optionally with your own columns | `:::{km-table} euclid.q1` |

**See the examples page** for every option, what to take from the map vs. write yourself, and what mistakes look like: run `jupyter-book start` and open <http://localhost:3000/km-examples> (it's hidden from the site's navigation; source: [`km_examples.md`](km_examples.md)).

### How it works

Directives and roles can't wait for network requests, so each one leaves a placeholder that an async [transform](https://mystmd.org/guide/javascript-plugins#implementing-a-custom-transform) fills in, following the [community plugins](https://github.com/jupyter-book/myst-plugins) such as `github-issue-table`. The map itself is read by `src/km-lookup.mjs`, the JavaScript counterpart of the map's [`km_lookup.py`](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/km_lookup.py), with the same function names.

Errors (an unreadable map, or an unknown id, field, service, type or column) show on the page and as ⛔️ build errors, which stop `--strict` builds as in `tox.ini`; they're raised in the transform so that they count. Two exceptions: rows a `km-table` body doesn't cover are only a ⚠️ warning, and errors inside a `{myst:demo}` box are examples, so they aren't logged. `myst.yml`'s `error_rules` make MyST's own unknown-directive and unknown-role messages (e.g. `{km-lst}`) stop the build too.

### Where the map comes from

Each file (`irsa.yaml`, and each mission's YAML the first time a page asks for it) is read once per build, from:

| Environment variable | Default | Use |
| --- | --- | --- |
| `KM_SOURCE` | `https://raw.githubusercontent.com/jaladh-singhal/irsa-knowledge-map/main/` | Base URL or local checkout of the map, e.g. a branch's raw URL to preview an unmerged map change. `km_lookup.py` reads the same variable. |

To preview the site locally, with live reload of page edits:

```bash
jupyter-book start                                        # map from GitHub main
KM_SOURCE=/path/to/irsa-knowledge-map jupyter-book start  # try map changes before pushing them
```

### `llms.txt`

`tox -e buildhtml` also downloads the site's [`llms.txt`](https://llmstxt.org), a summary for AI assistants of where Euclid data lives and how to query it. The knowledge map generates it from `main` and publishes it to its [`generated` branch](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/generated/euclid.md); it doesn't follow `KM_SOURCE`, so unmerged map changes show up there only once merged.
