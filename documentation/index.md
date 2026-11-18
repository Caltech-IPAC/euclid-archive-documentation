(index)=
# Euclid Archive at IRSA User Guide

## Document Purpose and Scope

The purpose of this document is to help users work with Euclid data available at the NASA/IPAC Infrared Science Archive ([IRSA](https://irsa.ipac.caltech.edu)) at Caltech.
It provides an overview of the available data products, guidance on discovering and accessing the data, information about using [Fornax](https://docs.fornax.sciencecloud.nasa.gov/quick-start/) for cloud-based analysis, and instructions for [getting help](https://irsa.ipac.caltech.edu/docs/help_desk.html).

## Euclid Overview

Euclid is a European Space Agency (ESA) mission, launched in July 2023, with contributions from the National Aeronautics and Space Administration (NASA).
Its primary science goals are to investigate dark matter, dark energy, and the evolution of cosmic structure.

The Euclid space telescope carries two instruments: the Visible Instrument (VIS) and the Near-Infrared Spectrometer and Photometer (NISP).
Euclid data products include space-based imaging and spectroscopy from these instruments, as well as supporting ground-based imaging known as external (EXT) data.
For the complete list of instruments contributing to Euclid data products, see [](#instruments).

(surveys)=
## Euclid Surveys

Euclid’s primary observing program consists of two surveys: the Wide Survey and the Deep Survey.

The Euclid Wide Survey is designed to cover approximately 14,000 square degrees of the extragalactic sky over the mission’s six-year duration.
It provides imaging and spectroscopy across a large fraction of the sky to support studies of dark energy, dark matter, and galaxy evolution.

The Euclid Deep Survey covers approximately 50 square degrees across three fields, which are observed repeatedly throughout the mission to achieve greater depth than the Wide Survey.

:::{table} Euclid Deep Fields
:label: table-fields-overview
| Field | Acronym | Field Center (RA, Dec) |
| --- | --- | --- |
| Euclid Deep Field North | EDF-N | 17:58:55.9 +66:01:03.7 |
| Euclid Deep Field Fornax | EDF-F | 04:04:57.84 -48:25:22.8 |
| Euclid Deep Field South | EDF-S | 03:31:43.6 -28:05:18.6 |
:::

In addition to carrying out the Wide and Deep surveys, Euclid conducts calibration observations, Performance Verification observations, and other specialized observing programs.
Data from these observations may also be included in public releases.

(dr1)=
## Euclid Data Release 1 (DR1)

The first stage of DR1, released in November 2026, includes approximately 1.8 PB of images, catalogs, and spectra from the first year of survey operations.
The release covers approximately 1,900 square degrees of the Euclid Wide Survey, as well as observations of the Euclid Deep Fields, calibration fields, and Performance Verification data.

Additional DR1 data products for galaxy clustering and weak lensing studies are expected in mid-2027.

(other-data-releases)=
## Other Euclid Data Releases

IRSA also provides access to three earlier Euclid data releases:

- **Quick Release 1 (Q1)**, released in March 2025, contains images, catalogs, and spectra covering approximately 60 square degrees across the three Euclid Deep Fields and the Lynds Dark Nebula 1641 field.
  The observations of the Deep Fields are at approximately the depth planned for the Wide Survey.

- **Quick Release 2 (Q2)**, released in June 2026, contains VIS images and stellar photometry and astrometry catalogs from the Euclid Galactic Bulge Survey.
  Q2 focuses on a specialized observing program rather than the Wide and Deep Surveys covered by DR1.

- **Early Release Observations (ERO)**, released in May 2024, include observations of selected astronomical targets intended to demonstrate Euclid's scientific capabilities.
