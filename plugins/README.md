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

## Plugin: `knowledge-map` directives

Render facts from the [IRSA knowledge map](https://github.com/jaladh-singhal/irsa-knowledge-map) (collection and table names, how each product can be accessed), so these pages stay in step with what IRSA serves instead of being hand-copied.

### How it works

Directives can't wait for network requests, so each one leaves a placeholder that an async [transform](https://mystmd.org/guide/javascript-plugins#implementing-a-custom-transform) fills in, following the [community plugins](https://github.com/jupyter-book/myst-plugins) such as `github-issue-table`. The map itself is read by `src/km-lookup.mjs`, the JavaScript counterpart of the map's [`km_lookup.py`](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/km_lookup.py), with the same function names.

### Where the map comes from

Each file (`irsa.yaml`, and each mission's YAML the first time a directive asks for it) is read once per build, from:

| Environment variable | Default | Use |
| --- | --- | --- |
| `KM_SOURCE` | `https://raw.githubusercontent.com/jaladh-singhal/irsa-knowledge-map/main/` | Base URL or local checkout of the map, e.g. a branch's raw URL to preview an unmerged map change. `km_lookup.py` reads the same variable. |

To preview the site locally, with live reload of page edits:

```bash
jupyter-book start                                        # map from GitHub main
KM_SOURCE=/path/to/irsa-knowledge-map jupyter-book start  # try map changes before pushing them
```

### Directive: `km-names`

Lists the names a collection's datasets are served under for one service, sorted.

````markdown
```{km-names} euclid.q1
:via: tap
:type: table
:describe:
```
````

- The **argument** is a collection id from the map, e.g. `euclid.q1`.
- `via` (required) is a service key from the map's `irsa.yaml`, e.g. `sia`, `ssa`, `tap`.
- `type` (optional) keeps only datasets of that type, e.g. `catalog`, `table`.
- `describe` (optional) adds each dataset's name after the service name.

### Directive: `km-access`

For each listed product, says how it can be accessed: the services the map lists for it, with the query name for SIA, SSA, TAP and SCS.

````markdown
```{km-access} euclid.q1
sir-spectra
sir-frames
```
````

- The **argument** is a collection id, e.g. `euclid.q1`.
- The **body** lists one product key per line (the last part of a dataset id in the map).

### Error handling

| Situation | Rendered output |
| --- | --- |
| Map can't be read (`KM_SOURCE` wrong, network down) | An `{error}` admonition on the page, and a ⛔️ build error |
| Collection or product not in the map, or no matching entries | Same |

The errors are raised in the transform, so `--strict` builds (as in `tox.ini`) stop on them.
