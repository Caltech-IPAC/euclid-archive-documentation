(data-access)=
# Data Access

IRSA serves the Q1 data products from both on premises and on the cloud ({term}`AWS S3 <S3>` bucket).
The data is provided in layered access to support a variety of use cases and users, as summarized in [](#table-data-access-overview).
Each data access layer is described in greater detail in the following subsections.

:::{table} Data access overview
:label: table-data-access-overview

| Data Access Mechanism | Images Available | Catalogs Available | Spectra Available |
| --- | --- | --- | --- |
| [Browsable Directories](#browsable-directories) | All Q1 | All Q1 and HATS | All Q1 |
| [Euclid Data Explorer](#euclid-data-explorer) | MER mosaics via direct image search, associated NIR and VIS calibrated frames upon download. | All Q1 | All Q1 |
| [Catalog Search Tool](#catalog-search-tool) | N/A | All Q1 | N/A |
| [Application Program Interfaces (APIs)](#apis) | MER mosaics | All Q1 | Coming soon! |
| [Python Libraries](#python-libraries) | MER mosaics | All Q1 and HATS | Coming Soon! |
| [Cloud Access](#cloud-access) | All Q1 | All Q1 and HATS | All Q1 |
| [Bulk Downloads](#bulk-downloads) | All Q1 | All Q1 and HATS | All Q1 |
:::

(browsable-directories)=
## Browsable Directories

Euclid data products curated by IRSA are laid out in directories that can be navigated with standard web browsers.
This is convenient for users to get a quick sense of the types of data products that are available, to quickly download some examples by clicking through the directory tree, and to script [bulk downloads](#bulk-downloads).

URLs to the root directories are:

- IRSA Q1: https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/
- IRSA HATS: https://irsa.ipac.caltech.edu/data/download/parquet/euclid/q1/merged_objects/hats/
- S3: https://nasa-irsa-euclid-q1.s3.us-east-1.amazonaws.com/index.html

Users can also browse the S3 bucket in Python, as demonstrated in the [Euclid Q1: Cloud Access](https://caltech-ipac.github.io/irsa-tutorials/euclid-cloud-access/) tutorial.

The contents and organization relative to the root directory is described in [](#data-products).
It is the same at IRSA and S3.

(euclid-data-explorer)=
## Euclid Data Explorer

Users who prefer an interactive graphical user interface (GUI) for specifying search constraints, submitting queries, and visualizing the results should consider the [Euclid Data Explorer](https://irsa.ipac.caltech.edu/applications/euclid).
The tool includes its own context-sensitive help, but we summarize the main functionality below.

The “**Images**” search provides access to the multiwavelength MER mosaics.
Users can visualize the planned (as of early 2025 and subject to change) spatial coverage of the Euclid wide-field survey and the data available as part of Q1, submit spatial queries (including table uploads) for the MER mosaics, and interactively visualize cutouts of the mosaics and coverage of the mosaics on the sky.

The “**Inspect Objects**” search provides access to the MER final catalog.
Users can visualize the planned spatial coverage of the Euclid wide-field survey and the data available as part of Q1, submit spatial queries (including table uploads) of the MER final catalog, and interactively visualize data about the returned objects.
This visualization includes an interactive table of the MER final catalog columns, customizable charts of the data in this table, a coverage map showing the spatial distribution of these objects in the sky, and cutouts of the multiwavelength MER mosaics for each object.

The “**Search by ID**” search allows users to search for MER multiwavelength mosaics by {term}`Tile ID` and to search for rows in the MER final catalog by Object ID.

The “**Euclid Catalogs**” search allows users to search select Q1 catalogs via an interface which allows users to enter spatial, temporal, column, ID, or general ADQL constraints.

(catalog-search-tool)=
## Catalog Search Tool

[FIXME] this needs a description.

https://irsa.ipac.caltech.edu/applications/Gator

(apis)=
## Application Program Interfaces (APIs)

IRSA provides Virtual Observatory (VO) compliant APIs to access Euclid images, catalogs, and spectra.

### Images

IRSA provides API access to Euclid images through the VO [Simple Image Access v2 (SIA2)](https://irsa.ipac.caltech.edu/ibe/sia.html) protocol.
The SIA2 service can also be [accessed in Python](#python-libraries).
The service allows users to query for a list of images that satisfy constraints such as position(s) on the sky, band, time, ID, and instrument.

IRSA’s SIA2 endpoint is:

```
https://irsa.ipac.caltech.edu/SIA?
```

The Euclid Q1 data collections available from this endpoint are:

- `euclid_DpdMerBksMosaic`

The list returned by the SIA2 service includes data access URLs and URIs, which can be used to retrieve some or all of the images in the list using `wget` or `curl` (URLs) or `aws s3 cp` (URIs; see [](#cloud-access)).

### Catalogs

IRSA provides API access to Euclid catalogs through the VO [Table Access Protocol (TAP)](https://irsa.ipac.caltech.edu/docs/program_interface/TAP.html) and [Simple Cone Search (SCS)](https://irsa.ipac.caltech.edu/docs/vo_scs.html) protocol.
The TAP and SCS services can also be [accessed in Python](#python-libraries).

IRSA’s TAP and SCS endpoints are:

```
https://irsa.ipac.caltech.edu/TAP/sync?
https://irsa.ipac.caltech.edu/TAP/async?
https://irsa.ipac.caltech.edu/SCS?
```

The available catalogs are:

- `euclid_q1_mer_catalogue`
- `euclid_q1_mer_cutouts`
- `euclid_q1_mer_morphology`
- `euclid_q1_phz_classification`
- `euclid_q1_phz_galaxy_sed`
- `euclid_q1_phz_nir_physical_parameters`
- `euclid_q1_phz_photo_z`
- `euclid_q1_phz_qso_physical_parameters`
- `euclid_q1_phz_star_sed`
- `euclid_q1_phz_star_template`
- `euclid_q1_spe_lines_atomic_indices`
- `euclid_q1_spe_lines_continuum_features`
- `euclid_q1_spe_lines_line_features`
- `euclid_q1_spe_lines_molecular_indices`
- `euclid_q1_spectro_model_catalog_spe_lines_catalog`
- `euclid_q1_spectro_model_catalog_spe_star_models`
- `euclid_q1_spectro_zcatalog_spe_classification`
- `euclid_q1_spectro_zcatalog_spe_galaxy_candidates`
- `euclid_q1_spectro_zcatalog_spe_qso_candidates`
- `euclid_q1_spectro_zcatalog_spe_quality`
- `euclid_q1_spectro_zcatalog_spe_star_candidates`

IRSA also provides additional tables that are not part of the official Euclid data release.
These provide metadata associations that may be helpful to users.

- `euclid.tileid_association_q1`: Euclid Q1 TILEID to Observation ID Association Table
- `euclid.objectid_spectrafile_association_q1`: Euclid Q1 Object ID to Spectral File Association Table
- `euclid.observation_euclid_q1`: Euclid Q1 CAOM Observation Table
- `euclid.plane_euclid_q1`: Euclid Q1 CAOM Plane Table
- `euclid.artifact_euclid_q1`: Euclid Q1 CAOM Artifact Table

### Spectra

The spectral products included in Euclid Q1 include:

- DpdSirScienceFrame
- DpdSirCombinedSpectra

The SIR science frames will eventually be available through SIA2, as they are 2D images.
The SIR Combined Spectra are multi-object packages of 1D spectra, which will eventually be queryable via the VO Simple Spectral Access (SSA) protocol.

(python-libraries)=
## Python Packages

For Python access to IRSA’s VO-compliant [API services](#apis), we recommend the following libraries.
IRSA’s [Python Tutorial Notebooks: Euclid](https://caltech-ipac.github.io/irsa-tutorials/euclid) contain many examples.

[FIXME] the descriptions below were just copied from pyvo and astroquery docs and should be rewritten to blend with the rest of this page better.

- [PyVO](https://pyvo.readthedocs.io/en/latest/): PyVO lets you find and retrieve astronomical data available from archives that support standard IVOA virtual observatory service protocols.
- [Astroquery](https://astroquery.readthedocs.io/en/latest/ipac/irsa/irsa.html): This module provides access to the public astrophysics catalogs, images, and spectra curated by the NASA/IPAC Infrared Science Archive (IRSA) at Caltech.
  IRSA hosts data from many missions, including Euclid, Spitzer, WISE/NEOWISE, SOFIA, IRTF, 2MASS, Herschel, IRAS, and ZTF.

For Python access to the [Merged Objects HATS Catalog](#enhanced-catalogs), we recommend:

- [LSDB](https://docs.lsdb.io/en/latest/index.html): LSDB is a bespoke library for HATS catalogs and is especially good for spatial searches and cross matches or users who prefer parallelizing with Dask.
  See the tutorial [Access HATS Collections Using LSDB: Euclid Q1 and ZTF DR24](https://caltech-ipac.github.io/irsa-tutorials/irsa-hats-with-lsdb/) for examples.
- [PyArrow](https://arrow.apache.org/docs/python/index.html): PyArrow is a powerful library for Parquet (the HATS file format) datasets and can be used to perform a wide variety of queries efficiently.
  See the [Merged Objects HATS Catalog tutorial series](https://caltech-ipac.github.io/irsa-tutorials/euclid-q1-hats-intro/) for examples.

(cloud-access)=
## Cloud Access

IRSA serves a copy of the Euclid data from an {term}`AWS S3 <S3>` cloud storage bucket.
Access is free and does not require credentials.
For basic bucket information, see [Cloud Data Access: Euclid](https://irsa.ipac.caltech.edu/cloud_access/#euclid).
Several access methods are available, including:

- [Browse the bucket](#browsable-directories)
- Python libraries can be used to browse the bucket and read data without downloading it first.
  IRSA's [Euclid Q1: Cloud Access](https://caltech-ipac.github.io/irsa-tutorials/euclid-cloud-access/) tutorial gives more in-depth information and examples.
- [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
  - Example: `aws s3 ls --no-sign-request s3://nasa-irsa-euclid-q1/q1/`

The data are provided in the AWS S3 standard storage class, which is their general purpose storage for frequently accessed data.

(bulk-downloads)=
## Bulk Downloads

Before downloading data, users should [browse](#browsable-directories) to understand the directory structure.
A small number of individual files can be downloaded from those browsable directories.
Note that the data can be [read from S3](#cloud-access) without downloading it first, even in massively parallel workflows.

We recommend users download full directories or a large number of files from S3 to avoid interfering with IRSA's data services (which rely on the on-premises copy of the data).
Download scripts for both `wget` and the [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) are provided in the bucket.
The AWS CLI will be faster.
An example command that downloads all Q1 SIR data is:

```bash
# Download all Q1 SIR data. Beware, this is 1 TB and may take several hours.
aws s3 cp --recursive --no-sign-request "s3://nasa-irsa-euclid-q1/q1/SIR/" .
```

The entire Q1 data set is approximately 35 TB.
Users interested in downloading significant fractions should plan for long download times and substantial local storage.
Download times will depend on many factors.
One factor is the networking capability available to the user, which can vary substantially.
[](#table-download-times) shows computed download times given representative download speeds, neglecting all other factors.
These times are meant to provide users with a sense of scale, and do not represent actual measured download times, which may also depend on the activities of other users and on whether the on-premises or cloud copies are being accessed.
IRSA is in the process of measuring download speeds over time, and will update the nominal estimates as measurements are collected.
[FIXME] can we remove that last sentence?

:::{table} Download time estimates
:label: table-download-times

| Data Product or Directory    | Volume  | Download time at 250 Mbps | Download time at 1 Gbps |
| ---------------------------- | :-----: | :-----------------------: | :---------------------: |
| single MER mosaic            | 1.5 GB  |         1 minute          |          14 s           |
| single calibrated VIS frame  | 7.5 GB  |        4.5 minutes        |        1 minute         |
| single calibrated NISP frame | 0.8 GB  |        30 seconds         |        7 seconds        |
| Q1 MER                       | 19.4 TB |          8 days           |         2 days          |
| Q1 MER_SEG                   | 970 GB  |          9 hours          |         2 hours         |
| Q1 NIR                       | 2.35 TB |         23 hours          |         6 hours         |
| Q1 RAW                       | 1.47 TB |         14 hours          |         4 hours         |
| Q1 SIR                       | 848 GB  |          8 hours          |         2 hours         |
| Q1 VIS                       | 9.27 TB |          4 days           |        23 hours         |
| Q1 VMPZ                      |  5 GB   |         3 minutes         |        1 minute         |
| Q1 catalogs                  | 573 GB  |          6 hours          |         1 hour          |
| contributed                  | 355 GB  |          4 hours          |         1 hour          |
| Total Q1 and contributed     | 35.2 TB |          15 days          |         3 days          |
:::
