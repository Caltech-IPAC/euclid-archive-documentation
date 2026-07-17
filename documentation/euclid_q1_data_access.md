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

## Browsable Directories
The root of the Euclid data directories for Q1 is:

https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/

The data are organized into 8 subdirectories:

- MER – 19.4 TB
- MER_SEG – 970 GB
- NIR – 2.35 TB
- RAW – 1.47 TB
- SIR – 848 GB
- VIS – 9.27 TB
- VMPZ – 5 GB
- catalogs – 573 GB

The content of each subdirectory is described in greater detail in {ref}`data-products`.

## Application Program Interfaces (APIs)

In addition to data laid out in browsable directories, users can take advantage of APIs to search among Euclid data products.
IRSA is providing Virtual Observatory (VO) compliant APIs to access Euclid Q1 images and catalogs.

### Images

IRSA provides API access to Euclid Q1 images through version 2 of the VO Simple Image Access (SIA2) protocol.
This allows users to query for a list of images that satisfy constraints such as position(s) on the sky, band, time, ID, and instrument.
The list returned by the service includes data access URLs, which can be used to retrieve some or all of the images in the list using wget or curl.
A brief summary of SIA2 for accessing Euclid data for IRSA is given below.
Additional documentation on IRSA’s SIA2 service can be found on the IRSA website.

IRSA’s SIA2 endpoint is:

https://irsa.ipac.caltech.edu/SIA?

The Euclid Q1 data collections available from this endpoint are:

- euclid_DpdMerBksMosaic

See the following section on Python packages to learn how to use Python wrappers around IRSA’s SIA2 service.

### Catalogs

IRSA provides API access to Euclid Q1catalogs through the VO Table Access Protocol (TAP).
This allows users to query for the subset of catalog rows that satisfies user constraints specified in Astronomical Data Query Language (ADQL).

The available catalogs are:

- `euclid_q1_mer_catalogue`
- `euclid_q1_mer_morphology`
- `euclid_q1_phz_photo_z`
- `euclid_q1_spectro_zcatalog_spe_quality`
- `euclid_q1_spectro_zcatalog_spe_classification`
- `euclid_q1_spectro_zcatalog_spe_galaxy_candidates`
- `euclid_q1_spectro_zcatalog_spe_star_candidates`
- `euclid_q1_spectro_zcatalog_spe_qso_candidates`
- `euclid_q1_spe_lines_line_features`
- `euclid_q1_spe_lines_continuum_features`
- `euclid_q1_spe_lines_atomic_indices`
- `euclid_q1_spe_lines_molecular_indices`

IRSA provides two additional tables that are not part of the official Euclid Q1 release, but provide metadata associations that may be helpful to users:

- Euclid Q1 TILEID to Observation ID Association Table
- Euclid Q1 Object ID to Spectral File Association Table

See the following section on Python packages to learn how to use Python wrappers around IRSA’s TAP service.

### Spectra

The spectral products included in Euclid Q1 include:

- DpdSirScienceFrame
- DpdSirCombinedSpectra

The SIR science frames will eventually be available through SIA2, as they are 2D images.
The SIR Combined Spectra are multi-object packages of 1D spectra, which will eventually be queryable via the VO Simple Spectral Access (SSA) protocol.

## Python Packages: PyVO & Astroquery

If you would like to take advantage of IRSA’s SIA2 service for querying Euclid Q1 images or IRSA’s TAP service for querying Euclid Q1 catalogs, but prefer to use Python rather than the command line, you may be interested in using one of two Python libraries:

- [PyVO](https://pyvo.readthedocs.io/en/latest/)  – PyVO lets you find and retrieve astronomical data available from archives that support standard IVOA virtual observatory service protocols.
- [Astroquery](https://astroquery.readthedocs.io/en/latest/ipac/irsa/irsa.html)  – This module provides access to the public astrophysics catalogs, images, and spectra curated by the NASA/IPAC Infrared Science Archive (IRSA) at Caltech.
  IRSA hosts data from many missions, including Euclid, Spitzer, WISE/NEOWISE, SOFIA, IRTF, 2MASS, Herschel, IRAS, and ZTF.

Examples of data queries using both of these libraries can be found in [IRSA’s Python Notebook Tutorial Repository](https://caltech-ipac.github.io/irsa-tutorials/).

## Euclid Data Explorer

Users who prefer an interactive graphical user interface (GUI) for specifying search constraints, submitting queries, and visualizing the results should consider the [Euclid Data Explorer](https://irsa.ipac.caltech.edu/applications/euclid).
The tool includes its own context-sensitive help, but we summarize the main functionality below.

The “**Images**” search provides access to the multiwavelength MER mosaics.
Users can visualize the planned (as of early 2025 and subject to change) spatial coverage of the Euclid wide-field survey and the data available as part of Q1, submit spatial queries (including table uploads) for the MER mosaics, and interactively visualize cutouts of the mosaics and coverage of the mosaics on the sky.

The “**Inspect Objects**” search provides access to the MER final catalog.
Users can visualize the planned spatial coverage of the Euclid wide-field survey and the data available as part of Q1, submit spatial queries (including table uploads) of the MER final catalog, and interactively visualize data about the returned objects.
This visualization includes an interactive table of the MER final catalog columns, customizable charts of the data in this table, a coverage map showing the spatial distribution of these objects in the sky, and cutouts of the multiwavelength MER mosaics for each object.

The “**Search by ID**” search allows users to search for MER multiwavelength mosaics by Tile ID and to search for rows in the MER final catalog by Object ID.

The “**Euclid Catalogs**” search allows users to search select Q1 catalogs via an interface which allows users to enter spatial, temporal, column, ID, or general ADQL constraints.

## Cloud Access

Euclid Q1 data are available in Amazon Web Services (AWS) Open Data Repository (ODR).
Downloads from AWS can be made without logging in and without incurring any egress costs.
Information on how to access these data is available at [IRSA’s Cloud Data Access webpage](https://irsa.ipac.caltech.edu/cloud_access/).

## Bulk Downloads

The entire Q1 data set is approximately 35 TB.
Users interested in downloading significant fractions of the data set should plan for long download times and substantial local storage.
IRSA has staged Euclid Q1 data both on premises at IPAC and in the cloud using AWS.
IRSA’s synchronous data services, including the SIA and TAP APIs and the Euclid Data Explorer, rely on the on-premises copy of the Q1 data.
To avoid interfering with the use of these synchronous services, we recommend that users download large amounts of data from the AWS copy.

First, users should browse the on-premises directory structure here to understand the directory structure (which is identical in the cloud):

https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/

There are multiple ways to download many Euclid Q1 data files:

If a user can identify a full directory to download, they can use the AWS Command Line Interface (CLI): https://aws.amazon.com/cli/

| Data Product | Volume | Time to download at 250 Mbps | Time to download at 1 Gbps |
| -------- | -------- | -------- | --- |
| single MER mosaic (space- and ground-based mosaics per tile) | 1.5 GB | 1 minute    | 14 s|
| single calibrated VIS frame (4 dithers per visit) | 7.5 GB | 4.5 minutes | 1 minute |
| single calibrated NISP frame (4 dithers, 3 bands per visit) | 0.8 GB | 30 seconds | 7 seconds |

| Directory| Volume | Time to download at 250 Mbps | Time to download at 1 Gbps|
| -------- | -------- | -------- | ---|
| MER| 	19.4 TB| 	8 days| 	2 days|
| MER_SEG| 	970 GB| 	9 hours| 	2 hours|
| NIR| 	2.35 TB| 	23 hours| 	6 hours|
| RAW| 	1.47 TB| 	14 hours| 	4 hours|
| SIR| 	848 GB| 	8 hours| 	2 hours|
| VIS| 	9.27 TB| 	4 days| 	23 hours|
| VMPZ| 	5 GB| 	3 minutes| 	1 minute|
| catalogs| 	573 GB| 	6 hours| 	1 hour|
| Total Q1| 	34.9 TB| 	14 days| 	3 days|

Download times for Euclid Q1 will depend on many factors.
One factor is the networking capability available to the user.
This can vary substantially.
For an example home internet speed of 250 Mbps, it would take about 14 days to download the entirely of the Euclid Q1 data release.
The Q1 download time would be reduced to about 3 days at an institution that can achieve 1 Gbps downloads.
Table 1 shows the computed download times given representative download speeds, neglecting all other factors that might affect download times.
The times provided in this table are meant to provide users with a sense of scale, and do not represent actual measured download times, which may also depend on the activities of other users and on whether the on-premises or cloud copies are being accessed.
Euclid Q1 data are provided in the AWS S3 standard storage class, which is their general purpose storage for frequently accessed data.
IRSA is in the process of measuring download speeds over time, and will update the nominal estimates as measurements are collected.

## Acronym List

:::{glossary}

ADQL
: Astronomical Data Query Language

API
: Application Program Interface

AWS
: Amazon Web Services

DECAM
: Dark Energy Camera

EDF
: Euclid Deep Field

ENSCI
: Euclid NASA Science Center

ESA
: European Space Agency

EXT
: External images collected by ground-based telescopes and served alongside the Euclid images

FITS
: Flexible Image Transport System

GPC
: GigaPixel Camera

GUI
: Graphical User Interface

HSC
: Hyper Suprime Cam

IRSA
: NASA/IPAC Infrared Science Archive

IVOA
: International Virtual Observatory Alliance

LDN
: Lynds Dark Nebula

LE1
: Level 1

LE2
: Level 2

LE3
: Level 3

MEF
: Multi-Extension FITS

NASA
: National Aeronautics and Space Administration

NISP
: Near-Infrared Spectrometer and Photometer

ODR
: Open Data Repository

PF
: Processing Function

PSF
: Point Spread Function

Q1
: Quick Release 1

SED
: Spectral Energy Distribution

SIA2
: Simple Image Access version 2

TAP
: Table Access Protocol

VIS
: VISible instrument

VO
: Virtual Observatory

:::
