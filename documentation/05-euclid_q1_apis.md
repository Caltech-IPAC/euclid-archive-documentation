(apis)=
# Application Program Interfaces (APIs)

In addition to data laid out in browsable directories, users can take advantage of APIs to search among Euclid data products.
IRSA is providing Virtual Observatory (VO) compliant APIs to access Euclid Q1 images and catalogs.

## Images

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

## Catalogs

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

## Spectra

The spectral products included in Euclid Q1 include:

- DpdSirScienceFrame
- DpdSirCombinedSpectra

The SIR science frames will eventually be available through SIA2, as they are 2D images.
The SIR Combined Spectra are multi-object packages of 1D spectra, which will eventually be queryable via the VO Simple Spectral Access (SSA) protocol.
