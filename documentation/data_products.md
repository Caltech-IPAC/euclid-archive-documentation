(data-products)=
# Data Products

[](#table-data-products) gives an overview of the Euclid data products, including the Euclid pipeline level and PF (see [Processing Function (PF)](#processing-functions)), product name, root directory, and a brief description.
[](#table-filename-fields) describes the fields that are used to construct filenames.
The subsections that follow provide more information about the data products and how they are organized at IRSA.
There is one subsection per directory listed in [](#table-data-products).
Information about how to browse the directories and other ways to access the data is given in [](#data-access).

:::{table} Data products overview
:label: table-data-products

| Level | PF | Data Product Name | Directory | Data Product Description |
| --- | --- | --- | --- | --- |
| 1 | LE1 | DpdVisRawFrame | [RAW](#raw) | Raw VIS images |
| 1 | LE1 | DpdNispRawFrame | [RAW](#raw) | Raw NISP images |
| 2 | VIS | DpdVisCalibratedQuadFrame | [VIS](#vis) | Calibrated VIS exposures, background maps, weight maps, and PSF files |
| 2 | VIS | DpdVisCalibratedFrameCatalog | [Catalogs](#catalogs) | Catalog measured on calibrated VIS images |
| 2 | NIR | DpdNirCalibratedFrame | [NIR](#nir) | Calibrated NISP images, background models, and PSF files. |
| 2 | NIR | DpdNirCalibratedFrameCatalog | [Catalogs](#catalogs) | Catalog extracted from NIR Calibrated Frame containing information on pointings and detectors. |
| 2 | SIR | DpdSirScienceFrame | [SIR](#sir) | 2D SIR spectra |
| 2 | SIR | DpdSirCombinedSpectra | [SIR](#sir) | For each object in the MER final catalog single, this product includes spectra extracted from individual dithers as well as the combined spectra. |
| 2 | MER | DpdMerBksMosaic | [MER](#mer) | MER mosaics, including EXT ground-based UGRIZ images |
| 2 | MER | DpdMerSegmentationMap | [MER_SEG](#mer-seg) | Maps of MER image pixels assigned to detected objects |
| 2 | MER | DpdMerFinalCatalog | [Catalogs](#catalogs) | Main MER catalog containing photometric and morphological information for detected sources |
| 2 | PHZ | DpdPhzPfOutputForL3 | [Catalogs](#catalogs) | Photometric redshift catalogs |
| 2 | PHZ | DpdPhzPfOutputCatalog | [Catalogs](#catalogs) | Photometric redshift catalogs |
| 2 | SPE | DpdSpePfOutputCatalog | [Catalogs](#catalogs) | Spectroscopy catalogs |
| 3 | VMPZ-ID | DpdHealpixBitMaskVMPZ | [VMPZ](#vmpz) | Bitmask maps |
| 3 | VMPZ-ID | DpdHealpixFootprintMaskVMPZ | [VMPZ](#vmpz) | Survey footprint masks for each band |
| 3 | VMPZ-ID | DpdHealpixCoverageVMPZ | [VMPZ](#vmpz) | Coverage masks for each band |
| 3 | VMPZ-ID | DpdHealpixDepthMapVMPZ | [VMPZ](#vmpz) | MER depth maps |
| 3 | VMPZ-ID | DpdHealpixInfoMapVMPZ | [VMPZ](#vmpz) | Environment and instrument information for each band |
:::

The fields used to construct filenames and their possible values are:

:::{list-table} Filename field descriptions
:header-rows: 1
:label: table-filename-fields

* - Field
  - Possible Values
* - `tile`
  - {term}`TILE ID`
* - `obs`
  - {term}`Observation ID`
* - `instrument`
  - `VIS`, `NISP`, `DECAM`, `MEGACAM`, `HSC`, `GPC` (see [](#instruments))
* - `band`
  - `Y`, `H`, `J`
* - `gwa_pos`
  - Grism Wheel Assembly position
* - `sca_id`
  - Sensor Chip Assembly ID
* - `dithobs`
  - [FIXME] need a description
* - `timestamp`
  - Year, month, day, and time of the observation (UTC) using the syntax `[YYYYMMDD]T[HHMMSS.SSSSSS]Z`
:::

(mer)=
## MER

The `MER` directory contains the [DpdMerBksMosaic](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html) data products.
All mosaics share the same pixel scale (0.1 arcsec) for all bands.

This directory is organized by {term}`TILE ID` and then [instrument](#instruments).
All tiles have `VIS` and `NISP` subdirectories, corresponding to the two instruments on board the Euclid spacecraft.
Some tiles have additional subdirectories representing external (EXT) ground-based observations.

The path syntax is `MER/[tile]/[instrument]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Background-subtracted mosaic image](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#image-fits-file)
  - `EUC_MER_BGSUB-MOSAIC-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Root Mean Square](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#rms-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-RMS_TILE[tile]-*_[timestamp]_*.fits`
- [Bit flags](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#flag-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-FLAG_TILE[tile]-*_[timestamp]_*.fits`
- [Background model](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#background-fits-file). Backgrounds are subtracted from the input images prior to coaddition. Once the mosaics are produced, any remaining background is subtracted.  The model used for this secondary background subtraction is provided here.
  - `EUC_MER_BGMOD-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Catalog point spread function](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file)
  - `EUC_MER_CATALOG-PSF-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Grid of point spread functions](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file) (PSFs) for sources in the MER Final Catalog
  - `EUC_MER_GRID-PSF-[VIS or NIR]_TILE[tile]-*_[timestamp]_*.fits`
  - [FIXME] there's two PSF files on disk (ie, in this list) but only one PSF file in the euclid docs, so I currently have both files linked to the same euclid url.
    is this wrong or are the euclid docs wrong?

(mer-seg)=
## MER_SEG

The `MER_SEG` directory contains the [DpdMerSegmentationMap](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_segmentationmap.html) data products.
Each MER segmentation map shows the connected pixels of the detected objects in a {term}`tile`, and is a combination of the associated VIS and NIR segmentation maps.
The Object IDs in the MER segmentation maps correspond to the `SEGMENTATION_MAP_ID` column values in the [MER Final Catalog](#catalogs).

This directory is organized by {term}`TILE ID`.
The path syntax is `MER_SEG/[tile]/EUC_MER_FINAL-SEGMAP_TILE[tile]-*_[timestamp]_*.fits`, where `[tile]` is described in [](#table-filename-fields).

The individual segmentation maps are about 2.7 GB.

(nir)=
## NIR

The `NIR` directory contains the near-infrared imaging data taken by the Euclid NISP instrument, specifically the [DpdNirCalibratedFrame](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframe.html) data products.

This directory is organized by {term}`Observation ID`.
The path syntax is `NIR/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Scientific image](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframe.html#scientific-image-fits-file) is a multi-extension FITS (MEF) file with three extensions for each of 16 detectors: calibrated science image (SCI), RMS, and Data Quality flags (DQ).
  - `EUC_NIR_W-CAL-IMAGE_[band]-[obs]-*_[timestamp].fits`
- [Estimated background](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframe.html#background-fits-file) MEF file with the same structure as the scientific image.
  - `EUC_NIR_W-CAL-IMAGE-BKG_[band]-[obs]-*_[timestamp].fits`
- [PSF image](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) associated with the science image.
  - `EUC_NIR_W-CAL-PSF-I_[band]-[obs]-*_[timestamp].fits`
- [PSF model](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) created by combining all the pipeline input images, as provided by PSFEx software.
  - `EUC_NIR_W-CAL-PSF-M_[band]-[obs]-*_[timestamp].psf`

(raw)=
## RAW

The `RAW` directory contains the raw VIS and NISP data products.

This directory is organized by {term}`observation ID`.
The path syntax is `RAW/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [DpdVisRawFrame](https://euclid.esac.esa.int/dr/q1/dpdd/le1dpd/dpcards/le1_visrawframe.html)
  - `EUC_LE1_VIS-[obs]-1-D_[timestamp]*.fits`
- [DpdNispRawFrame](https://euclid.esac.esa.int/dr/q1/dpdd/le1dpd/dpcards/le1_nisprawframe.html)
  - `EUC_LE1_NISP-[obs]-1-D_[timestamp]*.fits`

(sir)=
## SIR

The `SIR` directory contains the spectroscopy data taken with the NISP instrument.
The science frames are organized by {term}`observation ID` while the combined spectra are organized by {term}tile ID.

Fields in the paths below are described in [](#table-filename-fields).

- [DpdSirScienceFrame](https://euclid.esac.esa.int/dr/q1/dpdd/sirdpd/dpcards/sir_scienceframe.html), organized by {term}`observation ID`
  - Path syntax: `SIR/[obs]/EUC_SIR_W-SCIFRM_BKGSUB_[obs]_[sca_id]_[dithobs]_[gwa_pos]_*_[timestamp].fits`
- [DpdSirCombinedSpectra](https://euclid.esac.esa.int/dr/q1/dpdd/sirdpd/dpcards/sir_combinedspectra.html), organized by {term}`TILE ID`
  - Path syntax: `SIR/[tile]/EUC_SIR_W-COMBSPEC_[tile]_[timestamp].fits`

(vis)=
## VIS

The `VIS` directory contains imaging data ([DpdVisCalibratedQuadFrame](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedquadframe.html)) taken with the

This directory is organized by {term}`observation ID`.
The path syntax is `VIS/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Calibrated VIS individual exposure](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedquadframe.html#calibrated-vis-individual-exposure)
  - `EUC_VIS_SWL-DET-[obs]-[dither]_[timestamp]*.fits`
- [Background map](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedquadframe.html#background-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL-BKG-[obs]-[dither]_[timestamp]*.fits`
- [Weight map](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedquadframe.html#weight-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL_WGT-[obs]-[dither]_[timestamp]*.fits`
- Point spread function
  - `EUC_VIS_GRD-PSF*[timestamp].fits`

(vmpz)=
## VMPZ

The `VMPZ` directory contains a number of “Visibility Mask Photo-Z” products.

This directory is organized by data product and then {term}`TILE ID`.
Fields in the paths below are described in [](#table-filename-fields).

- [DpdHealpixBitMaskVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_bitmask.html)
  - Path syntax: `VMPZ/VMPZ_HEALPIX_BIT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPBITMASK-[tile]_[timestamp].fits`
- [DpdHealpixFootprintMaskVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_footprint.html)
  - Path syntax: `VMPZ/VMPZ_HEALPIX_FOOTPRINT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPFOOTPRINTMASK-[tile]_[timestsamp].fits`
- [DpdHealpixCoverageVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_coverage.html)
  - Path syntax: `VMPZ/VMPZ_HEALPIX_COVERAGE_MASK/[tile]/EUC_LE3_VMPZ-ID_HPCOVERAGE-[tile]_[timestamp].fits`
- [DpdHealpixDepthMapVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_depthmap.html)
  - Path syntax: `VMPZ/VMPZ_HEALPIX_DEPTH_MAP/[tile]/EUC_LE3_VMPZ-ID_HPDEPTHMAP-[tile]_[timestamp].fits`
- [DpdHealpixInfoMapVMPZ](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_infomap.html))
  - Path syntax: `VMPZ/VMPZ_HEALPIX_INFO_MAP/[tile]/EUC_LE3_VMPZ-ID_HPEXPOSURES-[tile]_[timestamp].fits`

(catalogs)=
## Catalogs

The `catalogs` directory contains Euclid Q1 catalogs from the MER, PHZ, SPE, NIR, and VIS [PFs](#processing-functions).
The data are packaged as FITS tables.

This directory is organized by data product and then either {term}`TILE ID` or {term}`observation ID`.
The path syntax is `catalogs/[product]/[tile or obs]/[filename]`, where `[product]` and `[filename]` are given below and the other fields are described in [](#table-filename-fields).

MER_FINAL_CATALOG
: The `MER_FINAL_CATALOG` product ([DpdMerFinalCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_finalcatalog.html)) directory is organized by TILE ID.
  - [Main MER catalog](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_finalcatalog.html#main-catalog-fits-file) contains 469 columns, including position, flux, and morphology measurements of detected sources.
    - `EUC_MER_FINAL-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Morphology catalog](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_finalcatalog.html#morphology-catalog-fits-file) has 104 columns, including morphology measurements such as concentration, asymmetry, smoothness, Gini, moment, Sersic indices, bulge sizes, clump counts, orientation, Hubble type, and more.
    - `EUC_MER_FINAL-MORPH_CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Cutouts catalog](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/dpcards/mer_finalcatalog.html#cutouts-catalog-fits-file) has 25 columns, including the coordinates of the corners of the source cutouts for each object detected in the MER Final Catalog.
    - `EUC_MER_FINAL-CUTOUTS-CAT_TILE[tile]-*_[timestamp]_*.fits`

NIR_CAL_CATALOG
: The `NIR_CAL_CATALOG` product ([DpdNirCalibratedFrameCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/dpcards/nir_calibratedframecatalog.html)) directory is organized by observation ID.
  - The NIR Calibrated catalog is extracted from the NIR Calibrated Frames.
    The main header contains metadata that applies to all 16 NIR detectors.
    An additional 16 extensions represent catalogs extracted from each detector.
    The catalogs have 43 columns including position, photometry, and morphology measurements.
    - `EUC_NIR_W-CALIB-CAT_[obs]-[band]-[dithobs]*_[timestamp].fits`

PHZ_PF_OUTPUT_CATALOG
: The `PHZ_PF_OUTPUT_CATALOG` product([DpdPhzPfOutputCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputcatalog.html)) directory is organized by TILE ID.
  - [Photo Z catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputcatalog.html#photo-z-catalog) files contain two tables.
    The first is the PHOTOZ CATALOG, which contains 61 columns describing the photometric redshift probability distribution, fluxes, and classification.
    The second is the ZERO_POINT table, which contains the correction for each filter.
    [FIXME] are there really two tables in here?
    - `EUC_PHZ_PHZCAT_[timestamp]*.fits`
  - [Galaxy SED](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputcatalog.html#galaxy-sed-catalog) catalog contains 120 columns describing the spectral energy distributions for MER objects classified as galaxies.
    - `EUC_PHZ_GALAXYSED_[timestamp]*.fits`
  - [Star SED catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputcatalog.html#star-sed-catalog) contains 120 columns describing the spectral energy distributions for MER objects classified as stars.
    - `EUC_PHZ_STARSED_[timestamp]*.fits`

PHZ_PF_OUTPUT_FOR_L3
: The `PHZ_PF_OUTPUT_FOR_L3` product ([DpdPhzPfOutputForL3](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html)) directory is organized by TILE ID.
  - [Classification catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html#classification-catalog) contains 13 columns describing the object classification (star, galaxy, QSO, globular cluster).
    - `EUC_PHZ_CLASSCAT_[timestamp]_*.fits`
  - [Physical Parameters catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html#physical-parameters-catalog) contains 93 columns describing physical parameters such as redshift, luminosity, extinction, dust law parameters, absolute magnitudes, stellar mass, metallicity.
    - `EUC_PHZ_PHYSPARAM_[timestamp]_*fits`
  - [QSO Physical Parameters catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html#qso-physical-parameters-catalog) contains 56 columns describing physical parameters for objects classified as QSOs.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_PHYSPARAMQSO_[timestamp]_*.fits`
  - [NIR Physical Parameters catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html#nir-physical-parameters-catalog) contains 57 columns.
    - `EUC_PHZ_PHYSPARAMNIR_[timestamp]_*.fits`
  - [Star Template catalog](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/dpcards/phz_phzpfoutputforl3.html#star-template) contains 55 columns describing physical parameters for objects classified as stars.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_STARCLASS_[timestamp]_*.fits`

SPE_PF_OUTPUT_CATALOG
: The `SPE_PF_OUTPUT_CATALOG` product ([DpdSpePfOutputCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/dpcards/spe_spepfoutputcatalog.html)) directory is organized by TILE ID.
  - [Redshift catalog](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/dpcards/spe_spepfoutputcatalog.html#redshift-catalog) files have 5 table extensions: `SP_QUALITY` (25 columns, including data quality flags), `SPE_CLASSIFICATION` (5 columns, including the probabilities of an object being classified as a star, galaxy, or QSO), `SPE_GALAXY_CANDIDATES` (12 columns, including the spectroscopic redshift estimate, uncertainty, and reliability), `SPE_STAR_CANDIDATES` (8 columns, including the radial velocity estimate, uncertainty, and reliability), `SPE_QSO_CANDIDATES` (12 columns, including the spectroscopic redshift estimate, uncertainty, and reliability).
    - `EUC_SPE_WIDE-CAT-Z_[tile]_N_[timestamp]_*.fits`
  - [Lines catalog](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/dpcards/spe_spepfoutputcatalog.html#lines-catalog) files have 4 table extensions: `SPE_LINE_FEATURES_CAT` (34 columns, including the detected spectral line), `SPE_ATOMIC_INDICES` (6 columns, including the atomic Lick index), `SPE_MOLECULAR_INDICES` (6 columns, including the molecular Lick index), `SPE_CONTINUUM_FEATURES` (6 columns, including the molecular Lick index).
    - `EUC_SPE_WIDE-CAT-LIN_[tile]_N_[timestamp]_*.fits`
  - [Models catalog](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/dpcards/spe_spepfoutputcatalog.html#models-catalog) files have 4 table extensions: `SPE_LINES_CATALOG` (4 columns, including the type of spectral line), `SPE_GALAXY_MODELS` (21 columns, including the spectroscopic redshift estimate), `SPE_STAR_MODELS` (8 columns, including the spectroscopic redshift estimate), SPE_QSO_MODELS (21 columns, including the spectroscopic redshift estimate).
    - `EUC_SPE_WIDE-CAT-MOD_[tile]_N_[timestamp]_*.fits`

VIS_CAL_CATALOG
: The `VIS_CAL_CATALOG` product ([DpdVisCalibratedFrameCatalog](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/dpcards/vis_calibratedframecatalog.html)) directory is organized by observation ID.
  - `EUC_VIS_SWL-CAT-[obs]-*_[timestamp]*.fits`

(enhanced-catalogs)=
### Enhanced Contributed Catalogs

[FIXME] add HATS
