(data-access)=
# Euclid Data Access

IRSA provides access to Euclid DR1 and Q1 data products through interactive applications, programmatic interfaces, and cloud storage.
These access methods support different workflows, from searching and visualizing individual sources to analyzing large datasets.
The available methods are summarized in [](#table-data-access-overview) and described in the following sections.

Euclid DR1 contains approximately 1.8 PB of data.
For large-scale analysis, we recommend using [Fornax](https://docs.fornax.sciencecloud.nasa.gov/quick-start/) to work with Euclid data on the cloud rather than downloading it.
This approach avoids transferring large volumes of data and supports efficient, scalable analysis.

:::{table} Data access overview
:label: table-data-access-overview

| Access Method | Description |
| --- | --- |
| [Browsable Directories](#browsable-directories) | Browse directory structures and access individual files |
| [Euclid Data Explorer](#euclid-data-explorer) | Interactively search and visualize selected images, catalogs, and spectra |
| [Catalog Search Tool](#catalog-search-tool) | Search and retrieve catalog data through a graphical interface |
| [Application Programming Interfaces (APIs)](#apis) | Access images, catalogs, and spectra using Virtual Observatory protocols |
| [Python Packages](#python-libraries) | Search, retrieve, and analyze Euclid data using Python |
| [Cloud Access](#cloud-access) | Access data directly from Amazon S3 |
| [Fornax](#fornax) | Analyze Euclid data on the cloud without downloading large datasets |
| [Bulk Downloads](#bulk-downloads) | Download large collections of Euclid files |
:::

(browsable-directories)=
## Browsable Directories

Euclid data products are organized into directories that can be browsed using a web browser.
This provides a way to explore the available files and retrieve individual data products.

URLs to the root directories are:

- DR1 at S3: https://nasa-irsa-euclid-dr1.s3.us-east-1.amazonaws.com/index.html
- Q1 at S3: https://nasa-irsa-euclid-q1.s3.us-east-1.amazonaws.com/index.html
- Q1 at IRSA: https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/

Users can also browse the S3 bucket in Python, as demonstrated in the [Euclid Cloud Access](https://caltech-ipac.github.io/irsa-tutorials/euclid-cloud-access/) tutorial.

The directory organization is described in [](#data-products).

(euclid-data-explorer)=
## Euclid Data Explorer

The [Euclid Data Explorer](https://irsacloud.ipac.caltech.edu/applications/euclid/) provides an interactive graphical interface for searching and visualizing selected Euclid images, catalogs, and spectra.
The application includes context-sensitive help.

The Euclid Data Explorer provides the following interfaces:

- **DR1 Images:** Search for and visualize MER image mosaics.
- **Inspect DR1 Objects:** Search the MER final catalog and inspect individual objects, including associated image cutouts and spectra when available.
- **Search by ID:** Retrieve images and catalog information using Euclid identifiers.
- **Euclid Catalogs:** Search selected Euclid catalogs using spatial, column, ID, or ADQL constraints.
- **Job Monitor:** Monitor and retrieve results from asynchronous queries.

The DR1 interfaces are displayed by default.
Similar interfaces are available for Euclid Q1 data through the hamburger menu in the upper-left corner of the application.

The Euclid Data Explorer provides access to selected Euclid data products.
For access to the full set of released data products, see [](#data-products) and [](#cloud-access).

(catalog-search-tool)=
## Catalog Search Tool

The [IRSA Catalog Search Tool](https://irsa.ipac.caltech.edu/cgi-bin/Gator/nph-scan?mission=irsa&submit=Select&projshort=Euclid) provides a graphical interface for searching Euclid catalogs.
Users can search by sky position, apply constraints on catalog columns, and retrieve results in several formats.

(apis)=
## Application Programming Interfaces (APIs)

IRSA provides Virtual Observatory (VO) compliant APIs for accessing Euclid images, catalogs, and spectra.

### Images

IRSA provides access to Euclid images through the VO Simple Image Access version 2 (SIA2) and Observation Table Access Protocol (ObsTAP) services.

The following Euclid DR1 collections are available:

- `euclid_dr1_wide_DpdMerBksMosaic`
- `euclid_dr1_deep_DpdMerBksMosaic`
- `euclid_dr1_DpdNirStackedFrame`
- `euclid_dr1_DpdVisStackedFrame`

The following Euclid Q1 collections are available:

- `euclid_DpdMerBksMosaic`
- `euclid_DpdNirCalibratedFrame`
- `euclid_DpdSirCombinedSpectra`
- `euclid_DpdVisCalibratedQuadFrame`

#### SIA2

[SIA2](https://irsa.ipac.caltech.edu/ibe/sia.html) allows users to discover Euclid images using constraints such as sky position, wavelength, time, and instrument.
The SIA2 service can also be [accessed in Python](#python-libraries).

IRSA's SIA2 endpoint is:

```
https://irsa.ipac.caltech.edu/SIA?
```

SIA2 query results include URLs for accessing individual data products and cloud access metadata identifying their locations in Amazon S3.
See [](#cloud-access) for additional information.

#### ObsTAP

Euclid observation metadata can also be queried through ObsTAP.
ObsTAP supports flexible queries using ADQL against the `ivoa.obscore` table.

ObsTAP uses IRSA's TAP service:

```
https://irsa.ipac.caltech.edu/TAP/sync?
```

### Catalogs

Euclid catalogs can be queried through the VO [Table Access Protocol (TAP)](https://irsa.ipac.caltech.edu/docs/program_interface/TAP.html) and [Simple Cone Search (SCS)](https://irsa.ipac.caltech.edu/docs/vo_scs.html) protocols.
TAP supports flexible queries using ADQL, while SCS supports positional cone searches.
Both services can be accessed through [Python packages](#python-libraries).

IRSA's TAP and SCS endpoints are:

```
https://irsa.ipac.caltech.edu/TAP/sync?
https://irsa.ipac.caltech.edu/TAP/async?
https://irsa.ipac.caltech.edu/SCS?
```

#### Euclid DR1 Catalogs

The available Euclid DR1 catalogs are:

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

IRSA also provides supporting tables that are not part of the official Euclid data releases.
These provide metadata associations that may be helpful to users.

The following DR1 supporting tables are available:

- `euclid.euclid_dr1_objectid_tileid`: Euclid DR1 Object ID to Tile ID Association Table
- `euclid.objectid_spectrafile_association_dr1`: Euclid DR1 Object ID to Spectral File Association Table
- `euclid.observation_euclid_dr1`: Euclid DR1 CAOM Observation Table
- `euclid.plane_euclid_dr1`: Euclid DR1 CAOM Plane Table
- `euclid.artifact_euclid_dr1`: Euclid DR1 CAOM Artifact Table

#### Euclid Q1 Catalogs

The available Euclid Q1 catalogs are:

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

The following Q1 supporting tables are available:

- `euclid.tileid_association_q1`: Euclid Q1 Tile ID to Observation ID Association Table
- `euclid.objectid_spectrafile_association_q1`: Euclid Q1 Object ID to Spectral File Association Table
- `euclid.observation_euclid_q1`: Euclid Q1 CAOM Observation Table
- `euclid.plane_euclid_q1`: Euclid Q1 CAOM Plane Table
- `euclid.artifact_euclid_q1`: Euclid Q1 CAOM Artifact Table

### Spectra

Euclid DR1 and Q1 include one-dimensional (1D) spectra in the `DpdSirCombinedSpectra` data products.
These are FITS files containing spectra for multiple objects.

The FITS files for both releases can be accessed through [](#browsable-directories) and [](#cloud-access).
DR1 spectra are also available as [](#hats).
The `euclid.objectid_spectrafile_association_dr1` table (listed under Catalogs above) associates DR1 Object IDs with spectral files.

Euclid Q1 spectra can also be discovered and accessed through the VO Simple Spectral Access (SSA) protocol using the collection `euclid_DpdSirCombinedSpectra`.
DR1 spectra are not available through SSA at this time.

IRSA's SSA endpoint is:

```
https://irsa.ipac.caltech.edu/SSA?
```

(python-libraries)=
## Python Packages

For programmatic access to Euclid data through IRSA's [APIs](#apis), we recommend:

- [Astroquery](https://astroquery.readthedocs.io/en/latest/ipac/irsa/irsa.html): Search and retrieve Euclid images, catalogs, and spectra using Python.
  We recommend it for most users.
- [PyVO](https://pyvo.readthedocs.io/en/latest/): Access Euclid data through standard Virtual Observatory protocols, including SIA2, TAP, SCS, and SSA.
  Use PyVO when you want lower-level access to the services than Astroquery provides, or want to use the same code to query several archives.

See IRSA's [Euclid Python tutorials](https://caltech-ipac.github.io/irsa-tutorials/euclid) for examples.

For working with the DR1 and Q1 [HATS catalogs](#hats), we recommend:

- [LSDB](https://docs.lsdb.io/en/latest/index.html): Query and cross-match large HATS catalogs using spatial indexing and parallel processing.
  See [Access HATS Collections Using LSDB: Euclid and ZTF](https://caltech-ipac.github.io/irsa-tutorials/irsa-hats-with-lsdb/) for examples.
- [PyArrow](https://arrow.apache.org/docs/python/index.html): Read and process Parquet files, including those used by HATS catalogs.
  See the [Merged Objects HATS Catalog tutorial series](https://caltech-ipac.github.io/irsa-tutorials/euclid-q1-hats-intro/) for examples.

(cloud-access)=
## Cloud Access

IRSA serves Euclid DR1 and Q1 data in separate {term}`AWS S3 <S3>` cloud storage buckets.
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

(fornax)=
## Fornax

[Fornax](https://docs.fornax.sciencecloud.nasa.gov/quick-start/) is a NASA cloud-based science platform that enables astronomers to analyze large datasets without downloading them to their local computers.

Fornax provides Jupyter notebooks and scalable computing resources for working with Euclid data alongside data from other astronomical archives.
Users can:

- Explore and analyze Euclid images, catalogs, and spectra using Python.
- Perform large-scale catalog searches and cross-matches using HATS and LSDB.
- Combine Euclid data with observations from other missions and surveys.
- Develop and share reproducible analysis workflows in Jupyter notebooks.

See the [Fornax Quick Start Guide](https://docs.fornax.sciencecloud.nasa.gov/quick-start/) to get started.

(bulk-downloads)=
## Bulk Downloads

Euclid datasets are large, and downloading substantial portions may require significant time and local storage.
The entire DR1 data set is approximately 1.8 PB, and the entire Q1 data set is approximately 35 TB.

For large-scale analysis, we recommend using [Fornax](#fornax) to work with the data on the cloud, or [reading data directly from S3](#cloud-access).

Individual files can be downloaded through the [browsable directories](#browsable-directories).

For users who need to download large collections of files, we recommend using Amazon S3 rather than IRSA's on-premises services.
The [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) supports recursive downloads.
For Q1, download scripts for both `wget` and the AWS CLI are provided in the bucket.
An example command that downloads all Q1 SIR data is:

```bash
# Download all Q1 SIR data. Beware, this is about 850 GB and may take several hours.
aws s3 cp --recursive --no-sign-request "s3://nasa-irsa-euclid-q1/q1/SIR/" .
```
