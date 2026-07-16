(data-products)=
# Data Products in Euclid Quick Release 1

Euclid data products curated by IRSA are laid out in directories that can be navigated with standard web browsers.
This is convenient for users to get a quick sense of the types of data products that are available, to quickly download some examples by clicking through the directory tree, and to script bulk downloads using wget or curl.

**Table 4. Euclid Q1 Release: Data Products Overview**

| Level | Processing Function | Data Product Name | Data Product Description |
| --- | --- | --- | --- |
|LE1 | VIS | [DpdVisRawFrame](https://euclid.esac.esa.int/dr/q1/dpdd/le1dpd/dpcards/le1_visrawframe.html) | Raw VIS images |
|LE1|NIR|[DpdNispRawFrame](https://euclid.esac.esa.int/dr/q1/dpdd/le1dpd/dpcards/le1_nisprawframe.html) | Raw NISP images|
|LE2|VIS|[DpdVisCalibratedQuadFrame](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedquadframe.html)|Calibrated VIS exposures, background maps, weight maps, and PSF files|
|LE2|VIS|[DpdVisCalibratedFrameCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedframecatalog.html)|Catalog measured on calibrated VIS images|
|LE2|SIR|[DpdSirScienceFrame](https://euclid.esac.esa.int/dr/q1/dpdd/sirdpd/dpcards/sir_scienceframe.html)|2D SIR spectra|
|LE2|SIR|[DpdSirCombinedSpectra](https://euclid.esac.esa.int/dr/q1/dpdd/sirdpd/dpcards/sir_combinedspectra.html)|For each object in the MER final catalog single, this product includes spectra extracted from individual dithers as well as the combined spectra.|
|LE2|MER|[DpdMerBksMosaic](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html)|MER mosaics, including EXT ground-based UGRIZ images|
|LE2|MER|[DpdMerSegmentationMap](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_segmentationmap.html)|Maps of MER image pixels assigned to detected objects|
|LE2|MER|[DpdMerFinalCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_finalcatalog.html)|Main MER catalog containing photometric and morphological information for detected sources|
|LE2|PHZ|[DpdPhzPfOutputForL3](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html)|Photometric redshift catalogs|
|LE2|PHZ|[DpdPhzPfOutputCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputcatalog.html)|Photometric redshift catalogs|
|LE2|SPE|[DpdSpePfOutputCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/dpcards/spe_spepfoutputcatalog.html)|Spectroscopy catalogs|
|LE3|Visibility Masks|[DpdHealpixBitMaskVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_bitmask.html)|Bitmask maps|
|LE3|Visibility Masks|[DpdHealpixFootprintMaskVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_footprint.html)|Survey footprint masks for each band |
|LE3|Visibility Masks|[DpdHealpixCoverageVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_coverage.html)|Coverage masks for each band |
|LE3|Visibility Masks|[DpdHealpixDepthMapVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_depthmap.html)|MER depth maps|
|LE3|Visibility Masks|[DpdHealpixInfoMapVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_infomap.html)|Environment and instrument information for each band|

## MER

This directory contains the [DpdMerBksMosaic](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html) data products.
They are organized by TILE ID, a 9 digit integer uniquely identifying a Euclid Tile, which represents a well-defined area of the sky.
MER data from the wide-field survey (including all Q1 data) are organized into tiles with core area sizes ~  30 arcmin x 30 arcmin and extended area sizes ~ 32 arcmin x 32 arcmin.
Within each TILE ID subdirectory are instrument subdirectories.
All tiles have VIS and NISP subdirectories, corresponding to the two instruments on board the Euclid spacecraft.
Some tiles have additional subdirectories representing external (EXT) ground-based observations.
All mosaics share the same pixel scale (0.1 arcsec) for all bands.
The full list of possible Q1 instrument subdirectories is:

**Table 5. Euclid Q1: List of instruments**

| Q1 instrument subdirectory name | Description |
| -------- | -------- |
| VIS | mosaics produced from data taken with the VIS instrument on board the Euclid spacecraft|
| NISP | mosaics produced from data taken with the NISP instrument on board the Euclid spacecraft|
| DECAM | mosaics produced from data taken with the Dark Energy Camera (DECam) on the Blanco 4-meter telescope at the Cerro Tololo Inter-American Observatory in Chile|
| MEGACAM | mosaics produced from data taken with the MegaCam instrument on the 3.6 meter Canada France Hawaii Telescope (CFHT) in Hawaii|
| HSC | mosaics produced from data taken with the Hyper Suprime-Cam instrument on the 8.2 meter Subaru Telescope in Hawaii|
| GPC | mosaics produced from data taken with the GigaPixel Camera (GPC) on the 1.8 meter PanSTARRS telescope in Hawaii|

Within each instrument subdirectory are the individual MER data products.
These include:

| Filename convention | Description |
| -------- | -------- |
| `EUC_MER_BGSUB-MOSAIC-[instrument]-[band]_TILE[tile]-*_[timestamp]_*.fits` | Background-subtracted mosaic image |
| `EUC_MER_MOSAIC-[instrument]-[band]-RMS_TILE[tile]-*_[timestamp]_*.fits` | Root Mean Square associated with the background-subtracted mosaic|
| `EUC_MER_MOSAIC-[instrument]-[band]-FLAG_TILE[tile]-*_[timestamp]_*.fits` | Bit flags associated with the background-subtracted mosaic.|
| `EUC_MER_BGMOD-[instrument]-[band]_TILE[tile]-*_[timestamp]_*.fits` | Backgrounds are subtracted from the input images prior to coaddition. Once the mosaics are produced, any remaining background is subtracted.  The model used for this secondary background subtraction is provided here|
| `EUC_MER_CATALOG-PSF-[instrument]-[band]_TILE[tile]-*_[timestamp]_*.fits` | Catalog point spread function
| `EUC_MER_GRID-PSF-[VIS or NIR]_TILE[tile]-*_[timestamp]_*.fits` | Grid of point spread functions (PSFs) for sources in the MER Final Catalog|

For the above table, possible values of `[instrument]` are given in Table 5, `[band]` can be one of CAW, `[tile]` is the tile id, and `[timestamp]` is broken down as `[DATE]T[TIME]Z` where `[DATE]` is broken down as `[YYYYMMDD]` (when YYYY is the year, MM is the month, and DD is the day) and `[TIME]` (when HH is the hour, MM is the minutes, and SS.SSSSSS is the seconds).

| field | description |
| --- | --- |
| `instrument` | see Table 5 |
| `band` |
| `tile` |
| `timestamp` | [YYYYMMDD]T[HHMMSS.SSSSSS]Z

## MER_SEG

The MER_SEG directory contains the DpdMerSegmentationMap data products, organized by TILE ID.

Each MER segmentation map shows the connected pixels of the detected objects in a tile, and is a combination of the associated VIS and NIR segmentation maps.
The Object IDs in the MER segmentation maps correspond to the SEGMENTATION_MAP_ID column values in the MER Final Catalog.

The individual segmentation maps are about 2.7 GB and adhere to the following filename convention:

`EUC_MER_FINAL-SEGMAP_TILE[tile]-*_[timestamp]_*.fits`

## NIR

The NIR directory contains the near-infrared imaging data taken by the Euclid NISP instrument, specifically the DpdNirCalibratedFrame and DpdNirCalibratedFrameCatalog data products.
These are organized by observation ID.
The NIR data products are:

- `EUC_NIR_W-CAL-IMAGE_[band]-[obs]-*_[timestamp].fits` – a multi-extension FITS (MEF) file with three extensions for each of 16 detectors: calibrated science image (SCI), RMS, and Data Quality flags (DQ).
- `EUC_NIR_W-CAL-IMAGE-BKG_[band]-[obs]-*_[timestamp].fits` – a MEF file with the same structure as EUC_NIR_W-CAL-IMAGE*.fits, containing the estimated background.
- `EUC_NIR_W-CAL-PSF-I_[band]-[obs]-*_[timestamp].fits` – PSF image associated with the science image.
- `EUC_NIR_W-CAL-PSF-M_[band]-[obs]-*_[timestamp].psf` – PSF model created by combining all the pipeline input images, as provided by PSFEx software (.psf).

## RAW

The RAW directory contains the raw VIS and NISP data products (DpdVisRawFrame and DpdNispRawFrame):

- `EUC_LE1_NISP-[obs]-1-D_[timestamp]*.fits`
- `EUC_LE1_VIS-[obs]-1-D_[timestamp]*.fits`

where [obs] is the observation ID and [timestamp] provides the year, month, day, and time of the observation in UTC.

## SIR

The SIR directory contains the spectroscopy data (DpdSirScienceFrame and DpdSirCombinedSpectra) taken with the NISP instrument.
The science frames are organized by observation ID while the combined spectra are organized by tile ID.

- `EUC_SIR_W-SCIFRM_BKGSUB_[obs]_[sca_id]_[dithobs]_[gwa_pos]_*_[timestamp].fits` – SIR science frames
- `EUC_SIR_W-COMBSPEC_[tile]_[timestamp].fits`

[gwa_pos] = Grism Wheel Assembly position
[sca_id] = Sensor Chip Assembly ID

## VIS

The VIS directory contains imaging data (DpdVisCalibratedQuadFrame) taken with the VIS instrument, organized by observation ID.
The VIS data products are:

- `EUC_VIS_SWL-DET-[obs]-[dither]_[timestamp]*.fits` – calibrated VIS individual exposure
- `EUC_VIS_SWL-BKG-[obs]-[dither]_[timestamp]*.fits` – background map for calibrated VIS individual exposure
- `EUC_VIS_SWL_WGT-[obs]-[dither]_[timestamp]*.fits` – weight map for calibrated VIS individual exposure
- `EUC_VIS_GRD-PSF*[timestamp].fits` – point spread function

## VMPZ

This directory contains a number of “Visibility Mask Photo-Z” products (DpdHealpixBitMaskVMPZ, DpdHealpixFootprintMaskVMPZ, DpdHealpixCoverageVMPZ, DpdHealpixDepthMapVMPZ, DpdHealpixInfoMapVMPZ), each organized in its own subdirectory, then by tile ID.

## Catalogs

The catalogs directory contains Euclid Q1 catalogs from the MER, PHZ, SPE, NIR, and VIS PFs.
Subdirectories are:

MER_FINAL_CATALOG
 : This directory contains multiple catalogs, organized by TILE_ID and packaged as FITS tables:
	- `EUC_MER_FINAL-CAT_TILE[tile]-*_[timestamp]_*.fits` – This is the main MER catalog.
	  It contains 469 columns, including position, flux, and morphology measurements of detected sources.
	- `EUC_MER_FINAL-MORPH_CAT_TILE[tile]-*_[timestamp]_*.fits` –  This table has 104 columns, including morphology measurements such as concentration, asymmetry, smoothness, Gini, moment, Sersic indices, bulge sizes, clump counts, orientation, Hubble type, and more.
	- `EUC_MER_FINAL-CUTOUTS-CAT_TILE[tile]-*_[timestamp]_*.fits` – This table has 25 columns, including the coordinates of the corners of the source cutouts for each object detected in the MER Final Catalog.

NIR_CAL_CATALOG
 : This directory is organized by OBS_ID and packaged as FITS tables:
	- `EUC_NIR_W-CALIB-CAT_[obs]-[band]-[dithobs]*_[timestamp].fits` – This catalog is extracted from the NIR Calibrated Frames.
	  The main header contains metadata that applies to all 16 NIR detectors.
	  An additional 16 extensions represent catalogs extracted from each detector.
	  The catalogs have 43 columns including position, photometry, and morphology measurements.

PHZ_PF_OUTPUT_CATALOG
 : This directory is organized by TILE_ID and packaged as FITS tables:
	- `EUC_PHZ_PHZCAT_[timestamp]*.fits` – This file contains two tables.
	  The first is the PHOTOZ CATALOG, which contains 61 columns describing the photometric redshift probability distribution, fluxes, and classification.
	  The second is the ZERO_POINT table, which contains the correction for each filter.
	- `EUC_PHZ_GALAXYSED_[timestamp]*.fits` – This catalog contains 120 columns describing the spectral energy distributions for MER objects classified as galaxies.
	- `EUC_PHZ_STARSED_[timestamp]*.fits` – This catalog contains 120 columns describing the spectral energy distributions for MER objects classified as stars.

PHZ_PF_OUTPUT_FOR_L3
 : This directory is organized by TILE_ID and organized as FITS tables:
	- `EUC_PHZ_CLASSCAT_[timestamp]_*.fits` – The Classification Catalog contains 13 columns describing the object classification (star, galaxy, QSO, globular cluster).
	- `EUC_PHZ_PHYSPARAM_[timestamp]_*fits` – The Physical Parameters Catalog contains 93 columns describing physical parameters such as redshift, luminosity, extinction, dust law parameters, absolute magnitudes, stellar mass, metallicity.
	- `EUC_PHZ_PHYSPARAMQSO_[timestamp]_*.fits` – The QSO Physical Parameters Catalog contains 56 columns describing physical parameters for objects classified as QSOs.
	  Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
	- `EUC_PHZ_PHYSPARAMNIR_[timestamp]_*.fits` – The NIR Physical Parameters Catalog contains 57 columns.
	- `EUC_PHZ_STARCLASS_[timestamp]_*.fits` – The Star Template Catalog contains 55 columns describing physical parameters for objects classified as stars.
	  Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.

SPE_PF_OUTPUT_CATALOG
 : This directory is organized by TILE_ID and organized as FITS tables:
	- `EUC_SPE_WIDE-CAT-Z_[tile]_N_[timestamp]_*.fits` – This file has 5 table extensions: SP_QUALITY (25 columns, including data quality flags), SPE_CLASSIFICATION (5 columns, including the probabilities of an object being classified as a star, galaxy, or QSO), SPE_GALAXY_CANDIDATES (12 columns, including the spectroscopic redshift estimate, uncertainty, and reliability), SPE_STAR_CANDIDATES (8 columns, including the radial velocity estimate, uncertainty, and reliability), SPE_QSO_CANDIDATES (12 columns, including the spectroscopic redshift estimate, uncertainty, and reliability).
	- `EUC_SPE_WIDE-CAT-LIN_[tile]_N_[timestamp]_*.fits` – This file has 4 table extensions: SPE_LINE_FEATURES_CAT (34 columns, including the detected spectral line), SPE_ATOMIC_INDICES (6 columns, including the atomic Lick index), SPE_MOLECULAR_INDICES (6 columns, including the molecular Lick index), SPE_CONTINUUM_FEATURES (6 columns, including the molecular Lick index).
	- `EUC_SPE_WIDE-CAT-MOD_[tile]_N_[timestamp]_*.fits` – This file has 4 table extensions: SPE_LINES_CATALOG (4 columns, including the type of spectral line), SPE_GALAXY_MODELS (21 columns, including the spectroscopic redshift estimate), SPE_STAR_MODELS (8 columns, including the spectroscopic redshift estimate), SPE_QSO_MODELS (21 columns, including the spectroscopic redshift estimate).

VIS_CAL_CATALOG
 : This directory is organized by OBS_ID and packaged as FITS tables:
	- `EUC_VIS_SWL-CAT-[obs]-*_[timestamp]*.fits`
