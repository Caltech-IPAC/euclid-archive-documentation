# Knowledge map examples

Examples for writers of the [IRSA knowledge map](https://github.com/jaladh-singhal/irsa-knowledge-map) syntax: each box shows the source, then what it renders.
This page is hidden from the site's navigation; the build checks it like any other page.

**Take from the map** the values IRSA's services can confirm: collection and table names, paths, links, DOIs, release status and dates.
**Write yourself** everything else: descriptions, guidance, how the page is organized.
If the map doesn't have a value yet, type it, and ask for it to be added to the map.

**The map.** Every piece of it is an `id` plus fields, e.g. this dataset:

```yaml
id: euclid.q1.mer-catalog
name: MER final catalog
doi: 10.26131/IRSA602
access:                   # the services it's served by, and the name each uses
  - {via: tap, name: euclid_q1_mer_catalogue}
  - …
```

Ids are paths: `euclid` is the mission, `euclid.q1` a release, `euclid.q1.mer-catalog` a dataset in it, and `euclid.tools.gator` an entry of its `tools` (likewise `tutorials`, `identifiers`, `docs`).
IRSA's services are `irsa.<service>`, e.g. `irsa.tap`.
See [missions/euclid.yaml](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/missions/euclid.yaml) and [irsa.yaml](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/irsa.yaml).

A wrong id, field or column stops the build with a message saying what's valid and linking to the right place in the map.

## A value in a sentence: `{km}` role

`` {km}`<field> <id>` `` shows one field of the piece with that id:

::::{myst:demo}
Euclid launched on {km}`launch euclid`, and Q1 was released on
{km}`released euclid.q1`.
::::

A service (`tap`, `sia`, `ssa`, `s3`, `moc`, …) works as a field too: it shows the `name` in the dataset's `access` entry for that service (comma-separated if there are several).

::::{myst:demo}
The MER catalog is the TAP table {km}`tap euclid.q1.mer-catalog`.
::::

### Links

A URL shows as a link to itself; a tutorial's, tool's or doc's `url` shows its title or name instead, and a DOI shows as a citation:

::::{myst:demo}
- Q1 overview: {km}`overview euclid.q1`
- Try the {km}`url euclid.tutorials.euclid-cloud-access` tutorial.
- Cite the MER catalog as {km}`doi euclid.q1.mer-catalog`.
::::

To choose the text yourself, write it before the field and id, in `<…>`, as in MyST's [`{ref}`](https://mystmd.org/guide/cross-references#reference-roles).
DOIs keep MyST's citation text.

::::{myst:demo}
- Q1 overview: {km}`Quick Release 1 <overview euclid.q1>`
- Try the {km}`cloud access <url euclid.tutorials.euclid-cloud-access>`
  tutorial.
::::

### In tables

It works in your own tables too:

::::{myst:demo}
| Product | Query with |
| --- | --- |
| SIR 1D spectra | SSA collection {km}`ssa euclid.q1.sir-spectra` |
| MER mosaics | SIA collection {km}`sia euclid.q1.mer-mosaic` |
::::

## All of something: `{km-list}`

Lists a collection's datasets, in the map's order: the names they're served under for `:via:`, or their names without it.
`:type:` keeps one type (`image`, `spectrum`, `catalog`, `table`), `:products:` a comma-separated list of product keys, and `:describe:` adds each dataset's name.

::::{myst:demo}
:::{km-list} euclid.q1
:via: sia
:::
::::

::::{myst:demo}
:::{km-list} euclid.q1
:via: tap
:type: table
:describe:
:::
::::

## A table of them: `{km-table}`

Chooses datasets like `{km-list}`, one row each.
`:columns:` picks map fields (service keys, `name`, `doi`, `type`, `description`, …), `:headers:` relabels them and `:caption:` adds a caption; `:label:`, `:class:`, `:align:`, `:enumerated:` and `:enumerator:` work as in MyST's `{list-table}`.

::::{myst:demo}
:::{km-table} euclid.q1
:type: spectrum
:columns: name, ssa, doi
:headers: Product, SSA collection, DOI
:caption: Euclid Q1 spectra
:label: q1-spectra
:::

See [](#q1-spectra).
::::

### With your own columns

Add a Markdown table in the body with a `key` column of product keys and your columns; name them in `:columns:` alongside the map's.
Rows follow your order, and datasets you haven't written up yet still get a row, with a build warning naming them, so the table stays complete when a release adds products.
Without `:via:`, `:type:` or `:products:`, the table has only your rows.

::::{myst:demo}
:::{km-table} euclid.q1
:products: mer-catalog, phz-photo-z, phz-classification
:columns: name, tap, Notes

| key         | Notes                                  |
| ----------- | -------------------------------------- |
| mer-catalog | Main source catalog; also as HATS.     |
| phz-photo-z | Join to the MER catalog on `object_id`. |
:::
::::

## When something's wrong

A mistake shows an error like these on the page, and stops the build (`tox -e buildhtml`, or the CI check on your pull request) with the same message: a suggested fix, what's valid, and a link to the right line of the map.
(Errors inside these example boxes are expected, so they don't stop the build.)

::::{myst:demo}
The MER catalog is {km}`tap euclid.q1.mer-catalogue`, and its SIA collection is
{km}`sia euclid.q1.mer-catalog`. See {km}`url euclid.tutorials.cloud-access`.
::::

::::{myst:demo}
:::{km-list} euclid.q1
:type: catalogs
:::
::::

::::{myst:demo}
:::{km-table} euclid.q1
:products: mer-catalog
:columns: name, tap, Note

| key         | Notes                              |
| ----------- | ---------------------------------- |
| mer-catalog | Main source catalog; also as HATS. |
:::
::::

Datasets the map has but a `{km-table}` body doesn't cover are only a ⚠️ build warning, not an error, so a new release doesn't break the build; their rows show with empty cells until you write them up.
A misspelled directive or role name, e.g. `{km-lst}`, gets MyST's own "unknown directive" error.
