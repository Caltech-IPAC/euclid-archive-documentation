(data-access)=
# Euclid Data Access

IRSA serves the DR1 data products from the cloud ({term}`AWS S3 <S3>` bucket).
The Q1 data products are served from both on premises and the cloud.
The data is provided in layered access to support a variety of use cases and users, as summarized in [](#table-data-access-overview).
Each data access layer is described in greater detail in the following subsections.

:::{table} Data access overview
:label: table-data-access-overview

| Data Access Mechanism | Images Available | Catalogs Available | Spectra Available |
| --- | --- | --- | --- |
| [Browsable Directories](#browsable-directories) | DR1 and Q1 | DR1 and Q1 | DR1 and Q1 |
| [Euclid Data Explorer](#euclid-data-explorer) | MER mosaics via direct image search, associated NIR and VIS calibrated frames upon download. | Q1 | Q1 |
| [Catalog Search Tool](#catalog-search-tool) | N/A | Q1 | N/A |
| [Application Program Interfaces (APIs)](#apis) | DR1 and Q1 MER mosaics, NISP and VIS frames | Select DR1, Q1 | Q1 combined spectra |
| [Python Libraries](#python-libraries) | DR1 and Q1 MER mosaics, NISP and VIS frames | Select DR1, Q1 | Q1 combined spectra |
| [Cloud Access](#cloud-access) | DR1 and Q1 | DR1 and Q1 | DR1 and Q1 |
| [Bulk Downloads](#bulk-downloads) | DR1 and Q1 | DR1 and Q1 | DR1 and Q1 |
:::

(browsable-directories)=
## Browsable Directories

Euclid data products curated by IRSA are laid out in directories that can be navigated with standard web browsers.
This is convenient for users to get a quick sense of the types of data products that are available, to quickly download some examples by clicking through the directory tree, and to script [bulk downloads](#bulk-downloads).

URLs to the root directories are:

- DR1 at S3: https://nasa-irsa-euclid-dr1.s3.us-east-1.amazonaws.com/index.html
- Q1 at S3: https://nasa-irsa-euclid-q1.s3.us-east-1.amazonaws.com/index.html
- Q1 at IRSA: https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/

Users can also browse the S3 bucket in Python, as demonstrated in the [Euclid Cloud Access](https://caltech-ipac.github.io/irsa-tutorials/euclid-cloud-access/) tutorial.

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

IRSA’s [Catalog Search Tool](https://irsa.ipac.caltech.edu/applications/Gator) enables users to search hundreds of astronomical catalogs by position, object name, or other catalog properties.
Search results can be explored through interactive tables, plots, and image overlays, or accessed programmatically through an API for use in scripts and automated workflows.

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

The Euclid DR1 data collections available from this endpoint are:

- `euclid_dr1_wide_DpdMerBksMosaic`
- `euclid_dr1_deep_DpdMerBksMosaic`
- `euclid_dr1_DpdNirStackedFrame`
- `euclid_dr1_DpdVisStackedFrame`

The Euclid Q1 data collections available from this endpoint are:

- `euclid_DpdMerBksMosaic`
- `euclid_DpdNirCalibratedFrame`
- `euclid_DpdVisCalibratedQuadFrame`

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

The available DR1 catalogs are:

- `euclid_dr1_mer_catalogue_wide_survey`
- `euclid_dr1_mer_catalogue_wide_mode`
- `euclid_dr1_mer_catalogue_deep_survey`
- `euclid_dr1_mer_catalogue_deep_survey_photometry`
- `euclid_dr1_mer_catalogue_deep_mode`
- `euclid_dr1_mer_catalogue_deep_mode_photometry`
- `euclid_dr1_phz_classification_wide`
- `euclid_dr1_phz_classification_deep_survey`
- `euclid_dr1_phz_photo_z_wide`
- `euclid_dr1_phz_photo_z_deep_survey`
- `euclid_dr1_spectro_line_features_spe_line_features_wide_survey`
- `euclid_dr1_spectro_line_features_spe_line_features_deep`
- `euclid_dr1_spectro_z_spe_classification_wide_survey`
- `euclid_dr1_spectro_z_spe_classification_deep`
- `euclid_dr1_spectro_z_spe_galaxy_candidates_wide_survey`
- `euclid_dr1_spectro_z_spe_galaxy_candidates_deep`
- `euclid_dr1_spectro_z_spe_quality_wide_survey`
- `euclid_dr1_spectro_z_spe_quality_deep`

The available Q1 catalogs are:

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

- `euclid.euclid_dr1_objectid_tileid`: Euclid DR1 Object ID to Tile ID Association Table
- `euclid.objectid_spectrafile_association_dr1`: Euclid DR1 Object ID to Spectral File Association Table
- `euclid.observation_euclid_dr1`: Euclid DR1 CAOM Observation Table
- `euclid.plane_euclid_dr1`: Euclid DR1 CAOM Plane Table
- `euclid.artifact_euclid_dr1`: Euclid DR1 CAOM Artifact Table
- `euclid.tileid_association_q1`: Euclid Q1 TILEID to Observation ID Association Table
- `euclid.objectid_spectrafile_association_q1`: Euclid Q1 Object ID to Spectral File Association Table
- `euclid.observation_euclid_q1`: Euclid Q1 CAOM Observation Table
- `euclid.plane_euclid_q1`: Euclid Q1 CAOM Plane Table
- `euclid.artifact_euclid_q1`: Euclid Q1 CAOM Artifact Table

### Spectra

The spectral products included in Euclid DR1 and Q1 are:

- DpdSirScienceFrame
- DpdSirCombinedSpectra

The SIR science frames will eventually be available through SIA2, as they are 2D images.
The SIR Combined Spectra are multi-object packages of 1D spectra.
The Q1 combined spectra can be queried with the VO Simple Spectral Access (SSA) protocol, using the collection `euclid_DpdSirCombinedSpectra`.
The SSA service can also be [accessed in Python](#python-libraries).

IRSA’s SSA endpoint is:

```
https://irsa.ipac.caltech.edu/SSA?
```

The DR1 spectra are not available through SSA at this time.
They can be accessed from the [browsable directories](#browsable-directories), the [cloud](#cloud-access), by [bulk download](#bulk-downloads), or as [](#hats).
The `euclid.objectid_spectrafile_association_dr1` table (listed under Catalogs above) associates DR1 Object IDs with spectral files.

(python-libraries)=
## Python Packages

IRSA’s [Python Tutorial Notebooks: Euclid](https://caltech-ipac.github.io/irsa-tutorials/euclid) contain many examples of how to access and analyze Euclid data.

For Python access to IRSA’s VO-compliant [API services](#apis), we recommend the following libraries:

- [Astroquery](https://astroquery.readthedocs.io/en/latest/ipac/irsa/irsa.html): The `astroquery.ipac.irsa` module provides convenient functions for searching IRSA’s images (SIA2), catalogs (TAP), and spectra (SSA), including the Euclid collections and catalogs listed in [APIs](#apis).
  We recommend it for most users.
- [PyVO](https://pyvo.readthedocs.io/en/latest/): PyVO is a general-purpose library for VO services at IRSA and at any other archive that supports the standard IVOA protocols.
  Use PyVO when you want lower-level access to the services than Astroquery provides, or want to use the same code to query several archives.

For Python access to the [HATS Catalogs](#hats), we recommend the following libraries:

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
  IRSA's [Euclid Cloud Access](https://caltech-ipac.github.io/irsa-tutorials/euclid-cloud-access/) tutorial gives more in-depth information and examples.
- [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
  - Example: `aws s3 ls --no-sign-request s3://nasa-irsa-euclid-dr1/dr1/`
  - Example: `aws s3 ls --no-sign-request s3://nasa-irsa-euclid-q1/q1/`

The data are provided in the AWS S3 standard storage class, which is their general purpose storage for frequently accessed data.

(bulk-downloads)=
## Bulk Downloads

Before downloading data, users should [browse](#browsable-directories) to understand the directory structure.
A small number of individual files can be downloaded from those browsable directories.
Note that the data can be [read from S3](#cloud-access) without downloading it first, even in massively parallel workflows.

We recommend users download full directories or a large number of files from S3 to avoid interfering with IRSA's data services (which rely on the on-premises copy of the data).
For Q1, download scripts for both `wget` and the [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) are provided in the bucket.
The AWS CLI will be faster.
An example command that downloads all Q1 SIR data is:

```bash
# Download all Q1 SIR data. Beware, this is about 850 GB and may take several hours.
aws s3 cp --recursive --no-sign-request "s3://nasa-irsa-euclid-q1/q1/SIR/" .
```

The entire DR1 data set is approximately 1.8 PB, and the entire Q1 data set is approximately 35 TB.
Users interested in downloading significant fractions should plan for long download times and substantial local storage.
Download times will depend on many factors.
One factor is the networking capability available to the user, which can vary substantially.
