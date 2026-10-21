# Knowledge map examples

Examples for writers of the [IRSA knowledge map](https://github.com/jaladh-singhal/irsa-knowledge-map) syntax: each box shows the source, then what it renders.
This page is hidden from the site's navigation; the build checks it like any other page.

**Take from the map** the values IRSA's services can confirm: collection and table names, paths, links, DOIs, release status and dates.
**Write yourself** everything else: descriptions, guidance, how the page is organized.
If the map doesn't have a value yet, type it, and ask for it to be added to the map.

Ids are `<mission>.<collection>` (e.g. `euclid.q1`) or `<mission>.<collection>.<product>` (e.g. `euclid.q1.mer-catalog`); they're listed in the map's [missions/euclid.yaml](https://github.com/jaladh-singhal/irsa-knowledge-map/blob/main/missions/euclid.yaml).
A wrong id, field or column stops the build with a message saying what's valid and linking to the right place in the map.

## A value in a sentence: `{km}` role

`` {km}`<field> <id>` ``: the field is a service key (`sia`, `ssa`, `tap`, `scs`, `s3`, `browse`, `moc`, …) or any field of the collection or dataset (`name`, `doi`, `status`, `released`, `overview`, …).
Names render as code, URLs as links, DOIs as citations, and several values comma-separated.

::::{myst:demo}
The MER catalog ({km}`doi euclid.q1.mer-catalog`) is the TAP table
{km}`tap euclid.q1.mer-catalog`, with its coverage map at
{km}`moc euclid.q1.mer-catalog`.
Q1 was released on {km}`released euclid.q1`; see its {km}`overview euclid.q1`.
::::

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
{km}`sia euclid.q1.mer-catalog`.
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
