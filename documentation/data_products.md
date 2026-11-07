(data-products)=
# Euclid Data Products

This page describes the Euclid data products available at IRSA, including their contents, directory organization, and filename conventions.

[](#table-data-products) summarizes the available products by Processing Level and Processing Function (PF).
The Processing Level indicates the stage of data processing, from raw observations (Level 1) to calibrated and derived science products (Level 2) and higher-level science products (Level 3).
A Processing Function is a component of the Euclid data processing system responsible for producing specific data products.
[](#table-processing-functions) describes the Processing Functions used in the table.

Euclid DR1 and Q1 data products are stored on the cloud in {term}`AWS S3<S3>` buckets.
The directory paths and filename patterns on this page are relative to the following locations:

- **DR1:** `s3://nasa-irsa-euclid-dr1/dr1/`
- **Q1:** `s3://nasa-irsa-euclid-q1/q1/`

For the IRSA-contributed [](#hats), replace `dr1/` with `contributed/dr1/`, and similar for `q1`.
See [](#data-access) for additional ways to browse, discover, and access Euclid data.

[](#table-filename-fields) describes the fields used in filenames.
The following sections describe each product directory in detail.
The directory organization shown is for DR1; differences for Q1 are noted where applicable.

:::{table} Data products overview
:label: table-data-products

| Level | PF | Data Product Name | Directory | Data Product Description |
| --- | --- | --- | --- | --- |
| 1 | LE1 | DpdVisRawFrame | [RAW](#raw) | Raw VIS images |
| 1 | LE1 | DpdNispRawFrame | [RAW](#raw) | Raw NISP images |
| 2 | VIS | DpdVisCalibratedQuadFrame | [VIS_QUAD](#vis-quad) | Calibrated VIS exposures, background maps, weight maps, and PSF files |
| 2 | VIS | DpdVisCalibratedFrameCatalog | [Catalogs](#catalogs) | Source catalog extracted from calibrated VIS exposures |
| 2 | VIS | DpdVisStackedFrame | [VIS](#vis) | Stacked VIS images, weight maps, and PSF files |
| 2 | VIS | DpdVisStackedFrameCatalog | [Catalogs](#catalogs) | Source catalog extracted from stacked VIS images |
| 2 | NIR | DpdNirCalibratedFrame | [NIR](#nir) | Calibrated NISP images, background models, and PSF files |
| 2 | NIR | DpdNirCalibratedFrameCatalog | [Catalogs](#catalogs) | Source catalog extracted from calibrated NISP images |
| 2 | NIR | DpdNirStackedFrame | [NIR](#nir) | Stacked NISP images and PSF files |
| 2 | NIR | DpdNirStackedFrameCatalog | [Catalogs](#catalogs) | Source catalog extracted from stacked NISP images |
| 2 | SIR | DpdSirScienceFrame | [SIR_SCIENCE_FRAME](#sir) | 2D slitless spectroscopic images from NISP |
| 2 | SIR | DpdSirCombinedSpectra | [SIR_COMBINED_SPECTRA](#sir) | Extracted 1D spectra from individual dithers and combined spectra for selected sources in the MER final catalog |
| 2 | MER | DpdMerBksMosaic | [MER](#mer) | VIS, NISP, and external ground-based image mosaics |
| 2 | MER | DpdMerSegmentationMap | [MER_SEG](#mer-seg) | Maps of MER image pixels assigned to detected objects |
| 2 | MER | DpdMerFinalCatalog | [Catalogs](#catalogs) | Main MER catalog containing photometric and morphological information for detected sources |
| 2 | PHZ | DpdPhzPfOutputForL3 | [Catalogs](#catalogs) | Source classification and physical parameter catalogs |
| 2 | PHZ | DpdPhzPfOutputCatalog | [Catalogs](#catalogs) | Photometric redshift and spectral energy distribution catalogs |
| 2 | PHZ | DpdPhzDeepOutputCatalog | [Catalogs](#catalogs) | Photometric redshift, classification, and physical parameter catalogs for Deep Survey tiles |
| 2 | SPE | DpdSpePfOutputCatalog | [Catalogs](#catalogs) | Spectroscopic redshift, classification, spectral line, and model catalogs |
| 3 | VMPZ-ID | DpdHealpixBitMaskVMPZ | [VMPZ](#vmpz) | Bitmask maps |
| 3 | VMPZ-ID | DpdHealpixFootprintMaskVMPZ | [VMPZ](#vmpz) | Survey footprint masks for each band |
| 3 | VMPZ-ID | DpdHealpixCoverageVMPZ | [VMPZ](#vmpz) | Coverage masks for each band |
| 3 | VMPZ-ID | DpdHealpixDepthMapVMPZ | [VMPZ](#vmpz) | MER depth maps |
| 3 | VMPZ-ID | DpdHealpixInfoMapVMPZ | [VMPZ](#vmpz) | Environment and instrument information for each band |
| 3 | VMPZ-ID | DpdHealpixEffectiveCoverageVMPZ | [VMPZ](#vmpz) | Effective coverage masks |
:::

:::{table} Euclid Processing Functions
:label: table-processing-functions

| PF | Description |
| --- | --- |
| LE1 | Produces Level 1 raw VIS and NISP images from spacecraft telemetry |
| VIS | Produces calibrated VIS images and source catalogs |
| NIR | Produces calibrated NISP near-infrared images and source catalogs |
| SIR | Produces calibrated NISP spectroscopic images and extracts 1D spectra |
| MER | Combines imaging data from multiple bands to produce mosaics and source catalogs |
| PHZ | Computes photometric redshifts, source classifications, and physical parameters |
| SPE | Computes spectroscopic redshifts, source classifications, and spectral measurements |
| VMPZ-ID | Produces survey masks, coverage maps, and related information maps |

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
  - `Y`, `H`, `J` (NISP); `G`, `R`, `I`, `Z` (DECAM); `I` (GPC); `G`, `R`, `R2`, `I`, `I2`, `Z` (HSC); `R`, `U` (MEGACAM)
* - `gwa_pos`
  - Grism Wheel Assembly position
* - `sca_id`
  - Sensor Chip Assembly ID
* - `dithobs`
  - Dither number
* - `timestamp`
  - Year, month, day, and time of the observation (UTC) using the syntax `[YYYYMMDD]T[HHMMSS.SSSSSS]Z`
:::

(mer)=
## MER

The `MER` directory contains the [DpdMerBksMosaic](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html) data products.
All mosaics share the same pixel scale (0.1 arcsec) for all bands.

This directory is organized by {term}`TILE ID` and then [instrument](#instruments).
All tiles have `VIS` and `NISP` subdirectories, corresponding to the two instruments on board the Euclid spacecraft.
Some tiles have additional subdirectories representing external (EXT) ground-based observations.

The path syntax is `MER/[tile]/[instrument]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Background-subtracted mosaic image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#image-fits-file)
  - `EUC_MER_BGSUB-MOSAIC-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Root Mean Square](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#rms-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-RMS_TILE[tile]-*_[timestamp]_*.fits`
- [Bit flags](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#flag-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-FLAG_TILE[tile]-*_[timestamp]_*.fits`
- [Background model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#background-fits-file). Backgrounds are subtracted from the input images prior to coaddition. Once the mosaics are produced, any remaining background is subtracted.  The model used for this secondary background subtraction is provided here.
  - `EUC_MER_BGMOD-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Catalog PSFs](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file) evaluated at the positions of sources in the MER Final Catalog
  - `EUC_MER_CATALOG-PSF-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Grid of PSFs](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file) evaluated at fixed positions in the image on a regular grid with 12" spacing.
  Only produced for VIS and NISP bands.
  - `EUC_MER_GRID-PSF-[VIS or NIR]_TILE[tile]-*_[timestamp]_*.fits`
- [Filter transmission](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#filter-transmission-fits-file), EXT instruments only
  - `EUC_MER_FILTER-TRANSMISSION-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Detector layering](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#layers-fits-file), `VIS` and `NISP` only
  - `EUC_MER_DETECTOR-LAYERING-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Bright star masks](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_bksmosaic.html#bright-star-masks-json-file), `VIS` and `NISP` only
  - `EUC_MER_STAR-MASKS-[instrument]_TILE[tile]-*_[timestamp]_*.json`

In Q1, the filter transmission, detector layering, and bright star mask files are not provided.

(mer-seg)=
## MER_SEG

The `MER_SEG` directory contains the [DpdMerSegmentationMap](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_segmentationmap.html) data products.
Each MER segmentation map shows the connected pixels of the detected objects in a {term}`tile`, and is a combination of the associated VIS and NIR segmentation maps.
The Object IDs in the MER segmentation maps correspond to the `SEGMENTATION_MAP_ID` column values in the [MER Final Catalog](#catalogs).

This directory is organized by {term}`TILE ID`.
The path syntax is `MER_SEG/[tile]/EUC_MER_FINAL-SEGMAP_TILE[tile]-*_[timestamp]_*.fits`, where `[tile]` is described in [](#table-filename-fields).

The individual segmentation maps are about 2.7 GB.

(nir)=
## NIR

The `NIR` directory contains the near-infrared imaging data taken by the Euclid NISP instrument, specifically the [DpdNirCalibratedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframe.html) and [DpdNirStackedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_stackedframe.html) data products.

This directory is organized by {term}`Observation ID`.
The path syntax is `NIR/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Scientific image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframe.html#scientific-image-fits-file) is a multi-extension FITS (MEF) file with three extensions for each of 16 detectors: calibrated science image (SCI), RMS, and Data Quality flags (DQ).
  - `EUC_NIR_W-CAL-IMAGE_[band]-[obs]-*_[timestamp].fits`
- [Estimated background](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframe.html#background-fits-file) MEF file with the same structure as the scientific image.
  - `EUC_NIR_W-CAL-IMAGE-BKG_[band]-[obs]-*_[timestamp].fits`
- [PSF image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) associated with the science image.
  - `EUC_NIR_W-CAL-PSF-I_[band]-[obs]-*_[timestamp].fits`
- [PSF model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) created by combining all the pipeline input images, as provided by PSFEx software.
  - `EUC_NIR_W-CAL-PSF-M_[band]-[obs]-*_[timestamp].psf`
- [Stacked image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_stackedframe.html#scientific-image-fits-file)
  - `EUC_NIR_W-STK-IMAGE_[band]-[obs]_[timestamp].fits`
- [PSF image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_stackedframe.html#psf-image-file) associated with the stacked image.
  - `EUC_NIR_W-STK-PSF-I_[band]-[obs]_[timestamp].fits`
- [PSF model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_stackedframe.html#psf-model-file) associated with the stacked image.
  - `EUC_NIR_W-STK-PSF-M_[band]-[obs]_[timestamp].psf`

The `NIR/shared_files/` directory contains one PSF image and one PSF model for each band:

- `EUC_NIR_GLOBAL-PSF-I_NIR-[band]_[timestamp].fits`
- `EUC_NIR_GLOBAL-PSF-M_NIR-[band]_[timestamp].psf`

In Q1, the stacked images and the `NIR/shared_files/` directory are not provided.

(raw)=
## RAW

The `RAW` directory contains the raw VIS and NISP data products.

This directory is organized by {term}`observation ID`.
The path syntax is `RAW/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [DpdVisRawFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le1dpd/dpcards/le1_visrawframe.html)
  - `EUC_LE1_VIS-*-1-[C, D, or W]_[timestamp]*.fits`
- [DpdNispRawFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le1dpd/dpcards/le1_nisprawframe.html)
  - `EUC_LE1_NISP-*-1-[C, D, or W]_[timestamp]*.fits`

(sir)=
## SIR

The `SIR_SCIENCE_FRAME` and `SIR_COMBINED_SPECTRA` directories contain the spectroscopy data taken with the NISP instrument.
The science frames are organized by {term}`observation ID` while the combined spectra are organized by {term}`TILE ID`.

Fields in the paths below are described in [](#table-filename-fields).

- [DpdSirScienceFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/sirdpd/dpcards/sir_scienceframe.html), organized by {term}`observation ID`
  - Path syntax: `SIR_SCIENCE_FRAME/[obs]/EUC_SIR_W-SCIFRM_BKGSUB_[obs]_[sca_id]_[dithobs]_[gwa_pos]_*_[timestamp].fits`
- [DpdSirCombinedSpectra](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/sirdpd/dpcards/sir_combinedspectra.html), organized by {term}`TILE ID`
  - Path syntax: `SIR_COMBINED_SPECTRA/[tile]/EUC_SIR_W-COMBSPEC_[tile]_[timestamp].fits`

In Q1, both products are in a single `SIR` directory: `SIR/[obs]/` and `SIR/[tile]/`.

(vis)=
## VIS

The `VIS` directory contains stacked imaging data ([DpdVisStackedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_stackedframe.html)) taken with the VIS instrument.

This directory is organized by {term}`observation ID`.
The path syntax is `VIS/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Calibrated VIS stacked image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_stackedframe.html#calibrated-vis-stacked-image)
  - `EUC_VIS_SWL-STK-*_[timestamp].fits`
- [Weight map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_stackedframe.html#weight-map) for calibrated VIS stacked image
  - `EUC_VIS_SWL-WGT-*_[timestamp].fits`
- [Stack PSF](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_stackedframe.html#stack-psf) for calibrated VIS stacked image
  - `EUC_VIS_SWL-PSF-*_[timestamp].fits`

In Q1, stacked VIS images are not provided, and the `VIS` directory contains the calibrated exposures described in [](#vis-quad).

(vis-quad)=
## VIS_QUAD

The `VIS_QUAD` directory contains imaging data ([DpdVisCalibratedQuadFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_calibratedquadframe.html)) taken with the VIS instrument.

This directory is organized by {term}`observation ID`.
The path syntax is `VIS_QUAD/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Calibrated VIS individual exposure](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_calibratedquadframe.html#calibrated-vis-individual-exposure)
  - `EUC_VIS_SWL-DET-[obs]-[dither]_[timestamp]*.fits`
- [Background map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_calibratedquadframe.html#background-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL-BKG-[obs]-[dither]_[timestamp]*.fits`
- [Weight map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_calibratedquadframe.html#weight-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL-WGT-[obs]-[dither]_[timestamp]*.fits`
- [Quality control files](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_analysisresults.html) for calibrated VIS individual exposure
  - `EUC_VIS_QC-SCI-PERI-[obs]-[dither]-*__[timestamp].json`
- Point spread function, a single file in the `VIS_QUAD/shared_files/` directory
  - `EUC_VIS_GRD-PSF*[timestamp].fits`

In Q1, these files are in the `VIS` directory, with point spread function files in some of the observation directories, and the quality control files are not provided.

(vmpz)=
## VMPZ

The `VMPZ_*` directories contain a number of “Visibility Mask Photo-Z” products.

Each data product has its own directory, which is organized by {term}`TILE ID` unless noted below.
Fields in the paths below are described in [](#table-filename-fields).

- [DpdHealpixBitMaskVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_bitmask.html)
  - Path syntax: `VMPZ_HEALPIX_BIT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPBITMASK-[tile]_[timestamp]_*.fits`
- [DpdHealpixFootprintMaskVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_footprint.html)
  - Path syntax: `VMPZ_HEALPIX_FOOTPRINT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPFOOTPRINTMASK-[tile]_[timestamp]_*.fits`
- [DpdHealpixCoverageVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_coverage.html)
  - Path syntax: `VMPZ_HEALPIX_COVERAGE_MASK/[tile]/EUC_LE3_VMPZ-ID_HPCOVERAGE-[tile]_[timestamp]_*.fits`
- [DpdHealpixDepthMapVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_depthmap.html)
  - Path syntax: `VMPZ_HEALPIX_DEPTH_MAP/[tile]/EUC_LE3_VMPZ-ID_HPDEPTHMAP-[tile]_[timestamp]_*.fits`
- [DpdHealpixInfoMapVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_infomap.html)
  - Path syntax: `VMPZ_HEALPIX_INFO_MAP/[tile]/EUC_LE3_VMPZ-ID_HP[map]-[tile]_[timestamp]_*.fits`, where `[map]` is one of `AA`, `BA`, `EXPOSURES`, `GALACTICEXTINCTION`, `NIRPRMS`, `NOISE`, `PERSISTENCE`, `PSART`, `PSF`, `SAA`, `STARBRIGHTNESSMEAN`, `STARBRIGHTNESSRMS`, `STARBRIGHTNESSSTD`, `STARNUMBERDENSITY`, `TILE`, or `ZODIACALLIGHT`. Some `PSART` files write `[timestamp]` as `[YYYY-MM-DD]T[HH:MM:SS.SSS]Z`.
- [DpdHealpixEffectiveCoverageVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_effectivecoverage.html), organized by processing run rather than {term}`TILE ID`
  - Path syntax: `VMPZ_EFFECTIVE_COVERAGE/DpdHealpixEffectiveCoverageVMPZ/*/EUC_LE3_VMPZ-ID_HPEFFECTIVECOVERAGE-[CL or WL]_[timestamp]_*.fits`

In Q1, these directories are subdirectories of a single `VMPZ` directory (for example, `VMPZ/VMPZ_HEALPIX_BIT_MASK/[tile]/`), and the effective coverage masks are not provided.

(catalogs)=
## Catalogs

The `catalogs` directory contains Euclid catalogs from the MER, PHZ, SPE, NIR, and VIS [PFs](#table-processing-functions).

This directory is organized by data product and then either {term}`TILE ID` or {term}`observation ID`.
The path syntax is `catalogs/[product]/[tile or obs]/[filename]`, where `[product]` and `[filename]` are given below and the other fields are described in [](#table-filename-fields).

MER_FINAL_CATALOG
: The `MER_FINAL_CATALOG` product ([DpdMerFinalCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_finalcatalog.html)) directory is organized by TILE ID.
  - [Main MER catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_finalcatalog.html#main-catalog-fits-file) contains 470 columns (469 in Q1), including position, flux, and morphology measurements of detected sources.
    - `EUC_MER_FINAL-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Morphology catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_finalcatalog.html#morphology-catalog-fits-file) has 106 columns (104 in Q1), including morphology measurements such as concentration, asymmetry, smoothness, Gini, moment, Sersic indices, bulge sizes, clump counts, orientation, Hubble type, and more.
    - `EUC_MER_FINAL-MORPH-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Cutouts catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_finalcatalog.html#cutouts-catalog-fits-file) has 25 columns, including the coordinates of the corners of the source cutouts for each object detected in the MER Final Catalog.
    - `EUC_MER_FINAL-CUTOUTS-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Deep field photometry catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/merdpd/dpcards/mer_finalcatalog.html#deep-field-photometry-catalog-fits-file) has 713 columns and is provided for some tiles only. It is not provided in Q1.
    - `EUC_MER_FINAL-DEEP-PHOTO-CAT_TILE[tile]-*_[timestamp]_*.fits`

NIR_CAL_CATALOG
: The `NIR_CAL_CATALOG` product ([DpdNirCalibratedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_calibratedframecatalog.html)) directory is organized by observation ID.
  - The NIR Calibrated catalog is extracted from the NIR Calibrated Frames.
    The main header contains metadata that applies to all 16 NIR detectors.
    An additional 16 extensions represent catalogs extracted from each detector.
    The catalogs have 43 columns including position, photometry, and morphology measurements.
    - `EUC_NIR_W-CALIB-CAT_[obs]-[band]-[dithobs]*_[timestamp].fits`

NIR_STA_CATALOG
: The `NIR_STA_CATALOG` product ([DpdNirStackedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/nirdpd/dpcards/nir_stackedframecatalog.html)) directory is organized by observation ID. It is not provided in Q1.
  - The NIR Stacked catalog is extracted from the NIR Stacked Frames and has 43 columns.
    - `EUC_NIR_W-STACK-CAT_[obs]-[band]_[timestamp].fits`

PHZ_DEEP_OUTPUT_CATALOG
: The `PHZ_DEEP_OUTPUT_CATALOG` product ([DpdPhzDeepOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzdeepoutputcatalog.html)) directory is organized by TILE ID. It is not provided in Q1.
  - [Photo Z catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzdeepoutputcatalog.html#photo-z-catalog) files contain two tables: the PHOTOZ CATALOG (41 columns) and the ZERO_POINT table.
    - `EUC_PHZ_PHZCAT_TILE[tile]_[timestamp]_*.fits`
  - Classification catalog (13 columns)
    - `EUC_PHZ_CLASSCAT_TILE[tile]_[timestamp]_*.fits`
  - NIR Physical Parameters catalog (65 columns)
    - `EUC_PHZ_PHYSPARAMNIR_*_[timestamp]_*.fits`
  - QSO Physical Parameters catalog (64 columns)
    - `EUC_PHZ_PHYSPARAMQSO_*_[timestamp]_*.fits`
  - Star Template catalog (63 columns)
    - `EUC_PHZ_STARCLASS_*_[timestamp]_*.fits`
  - [Sampled physical parameters](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzdeepoutputcatalog.html#sampled-physical-parameters), as a sampling file (21 columns) and an index file (5 columns)
    - `EUC_PHZ_PPSAMPLINGFILE_TILE[tile]_[timestamp]_*.fits`
    - `EUC_PHZ_PPSAMPLINGINDEX_TILE[tile]_[timestamp]_*.fits`

PHZ_PF_OUTPUT_CATALOG
: The `PHZ_PF_OUTPUT_CATALOG` product ([DpdPhzPfOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputcatalog.html)) directory is organized by TILE ID.
  - [Photo Z catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputcatalog.html#photo-z-catalog) files contain two tables.
    The first is the PHOTOZ CATALOG, which contains 61 columns describing the photometric redshift probability distribution, fluxes, and classification.
    The second is the ZERO_POINT table, which contains the correction for each filter.
    - `EUC_PHZ_PHZCAT_[timestamp]*.fits`
  - [Galaxy SED](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputcatalog.html#galaxy-sed-catalog) catalog contains 120 columns describing the spectral energy distributions for MER objects classified as galaxies.
    - `EUC_PHZ_GALAXYSED_[timestamp]*.fits`
  - [Star SED catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputcatalog.html#star-sed-catalog) contains 120 columns describing the spectral energy distributions for MER objects classified as stars.
    - `EUC_PHZ_STARSED_[timestamp]*.fits`

PHZ_PF_OUTPUT_FOR_L3
: The `PHZ_PF_OUTPUT_FOR_L3` product ([DpdPhzPfOutputForL3](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html)) directory is organized by TILE ID.
  - [Classification catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html#classification-catalog) contains 13 columns describing the object classification (star, galaxy, QSO, globular cluster).
    - `EUC_PHZ_CLASSCAT_*_[timestamp]_*.fits`
  - [Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html#physical-parameters-catalog) contains 74 columns (93 in Q1) describing physical parameters such as redshift, luminosity, extinction, dust law parameters, absolute magnitudes, stellar mass, metallicity.
    - `EUC_PHZ_PHYSPARAM_*_[timestamp]_*.fits`
  - [QSO Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html#qso-physical-parameters-catalog) contains 56 columns describing physical parameters for objects classified as QSOs.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_PHYSPARAMQSO_[timestamp]_*.fits`
  - [NIR Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html#nir-physical-parameters-catalog) contains 57 columns.
    - `EUC_PHZ_PHYSPARAMNIR_[timestamp]_*.fits`
  - [Star Template catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/phzdpd/dpcards/phz_phzpfoutputforl3.html#star-template) contains 55 columns describing physical parameters for objects classified as stars.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_STARCLASS_[timestamp]_*.fits`

SPE_PF_OUTPUT_CATALOG
: The `SPE_PF_OUTPUT_CATALOG` product ([DpdSpePfOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/spedpd/dpcards/spe_spepfoutputcatalog.html)) directory is organized by TILE ID.
  - [Redshift catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/spedpd/dpcards/spe_spepfoutputcatalog.html#redshift-catalog) files have 5 table extensions: `SPE_QUALITY` (31 columns, 25 in Q1, including data quality flags), `SPE_CLASSIFICATION` (5 columns, including the probabilities of an object being classified as a star, galaxy, or QSO), `SPE_GALAXY_CANDIDATES` (18 columns, 12 in Q1, including the spectroscopic redshift estimate, uncertainty, and reliability), `SPE_STAR_CANDIDATES` (11 columns, 8 in Q1, including the radial velocity estimate, uncertainty, and reliability), `SPE_QSO_CANDIDATES` (15 columns, 12 in Q1, including the spectroscopic redshift estimate, uncertainty, and reliability).
    - `EUC_SPE_[WIDE or DEEP]-CAT-Z-[tile]_N_[timestamp]_*.fits`
  - [Lines catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/spedpd/dpcards/spe_spepfoutputcatalog.html#lines-catalog) files have 4 table extensions: `SPE_LINE_FEATURES_CAT` (35 columns, 34 in Q1, including the detected spectral line), `SPE_ATOMIC_INDICES` (6 columns, including the atomic Lick index), `SPE_MOLECULAR_INDICES` (6 columns, including the molecular Lick index), `SPE_CONTINUUM_FEATURES` (6 columns).
    - `EUC_SPE_[WIDE or DEEP]-CAT-LIN-[tile]_N_[timestamp]_*.fits`
  - [Models catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/spedpd/dpcards/spe_spepfoutputcatalog.html#models-catalog) files have 4 table extensions: `SPE_LINES_CATALOG` (4 columns, including the type of spectral line), `SPE_GALAXY_MODELS` (21 columns, including the spectroscopic redshift estimate), `SPE_STAR_MODELS` (8 columns, including the spectroscopic redshift estimate), SPE_QSO_MODELS (21 columns, including the spectroscopic redshift estimate).
    - `EUC_SPE_[WIDE or DEEP]-CAT-MOD-[tile]_N_[timestamp]_*.fits`

  In Q1, only `WIDE` files are provided.

VIS_CAL_CATALOG
: The `VIS_CAL_CATALOG` product ([DpdVisCalibratedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_calibratedframecatalog.html)) directory is organized by observation ID.
  - `EUC_VIS_SWL-CAT-[obs]-*_[timestamp]*.fits`

VIS_STA_CATALOG
: The `VIS_STA_CATALOG` product ([DpdVisStackedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dmdr1/visdpd/dpcards/vis_stackedframecatalog.html)) directory is organized by observation ID. It is not provided in Q1.
  - `EUC_VIS_SWL-CAT-000-*_[timestamp]*.fits`

(irsa-data-products)=
## IRSA-Generated Data Products

In addition to distributing official Euclid data products, IRSA creates additional products to facilitate data discovery and analysis.

These include Multi-Order Coverage maps (MOCs), which describe the spatial coverage of Euclid data releases, and HATS catalogs, which provide partitioned, analysis-ready representations of Euclid catalogs.

(moc)=
### MOC

Multi-Order Coverage maps (MOCs) describe the spatial coverage of astronomical datasets using a hierarchical representation of the sky.
They can be used to visualize survey footprints, determine whether a sky position falls within a survey, and identify overlapping coverage between datasets.

The `MOC` directory contains MOCs describing the spatial coverage of the DR1 Wide and Deep tiles, the four MER catalog subsets (`wide_survey`, `wide_mode`, `deep_survey`, and `deep_mode`), and the planned Euclid survey coverage.
Each MOC is available in FITS and binary format.
For DR1, the path syntax is `MOC/[name].moc.moc.[fits or bin]`, where `[name]` is the MOC name without the `.moc` suffix.
In Q1, the `MOC` directory contains `euclid_q1.moc.[fits or bin]` and `euclid_planned_coverage.moc.[fits or bin]`.

#### Visualizing MOCs in Firefly

The [Euclid Data Explorer](https://irsacloud.ipac.caltech.edu/applications/euclid/) has the Euclid MOCs pre-loaded for visualization.

You can also load MOCs into the [cloud version of Firefly](https://irsacloud.ipac.caltech.edu/firefly/) or the [downloadable version of Firefly](https://github.com/Caltech-IPAC/firefly/blob/dev/README.md).
Select the **Upload** tab and enter the URL of the desired MOC in FITS format.
Firefly automatically recognizes the MOC and displays its spatial coverage.

MOCs can also be loaded into Firefly from Python using the `firefly_client` package.
The `FireflyClient.show_data()` method accepts a URL (e.g., `https://nasa-irsa-euclid-dr1.s3.amazonaws.com/dr1/MOC/euclid_dr1_deep.moc.moc.fits`) or local path to a MOC FITS file.
See the [Firefly Python API documentation](https://caltech-ipac.github.io/firefly_client/api/firefly_client.FireflyClient.html) for examples and instructions.

The `.bin` files provide a compact binary representation of the same coverage but are not needed for Firefly visualization.

(hats)=
### HATS Catalogs

IRSA provides Euclid catalogs in the Hierarchical Adaptive Tiling Scheme (HATS) format in the cloud.
HATS catalogs use spatially partitioned Parquet files to support efficient analysis of large datasets.

For DR1, IRSA is making HATS catalogs available incrementally.
The table below lists the DR1 HATS catalogs currently available.
For Q1, IRSA created a merged objects catalog by joining information from the MER, PHZ, and SPE catalogs using the MER Object ID.
See the HATS tutorials found in [IRSA's Euclid notebooks](https://caltech-ipac.github.io/irsa-tutorials/euclid) for details about these products.

:::{table} Euclid DR1 HATS catalogs
:label: table-dr1-hats-catalogs

| Catalog | Rows |
| --- | ---: |
| `euclid_dr1_sir_combined_spectra` | 309,078,775 |
| `euclid_dr1_mer_catalogue_deep_survey` | 51,820,952 |
| `euclid_dr1_mer_catalogue_deep_survey_photometry` | 26,008,743 |
| `euclid_dr1_mer_catalogue_wide_survey` | 888,152,165 |
| `euclid_dr1_mer_cutouts_deep_survey` | 51,820,952 |
| `euclid_dr1_mer_cutouts_wide_survey` | 888,152,165 |
| `euclid_dr1_mer_morphology_deep_survey` | 51,820,952 |
| `euclid_dr1_mer_morphology_wide_survey` | 888,152,165 |
| `euclid_dr1_phz_classification_deep_survey` | 51,550,740 |
| `euclid_dr1_phz_classification_wide` | 847,313,811 |
| `euclid_dr1_phz_galaxy_sed_wide` | 846,826,349 |
| `euclid_dr1_phz_nir_physical_parameters_deep_survey` | 6,415,078 |
| `euclid_dr1_phz_nir_physical_parameters_wide` | 187,662,926 |
| `euclid_dr1_phz_photo_z_deep_survey` | 51,550,740 |
| `euclid_dr1_phz_physical_parameters_deep_survey` | 51,550,740 |
| `euclid_dr1_phz_physical_parameters_wide` | 847,313,811 |
| `euclid_dr1_phz_qso_physical_parameters_deep_survey` | 6,154,637 |
| `euclid_dr1_phz_qso_physical_parameters_wide` | 116,564,738 |
| `euclid_dr1_phz_star_sed_wide` | 12,275,216 |
| `euclid_dr1_phz_star_template_deep_survey` | 7,275,888 |
| `euclid_dr1_phz_star_template_wide` | 189,466,498 |
| `euclid_dr1_spectro_line_features_spe_atomic_indices_deep` | 402,756,480 |
| `euclid_dr1_spectro_line_features_spe_atomic_indices_wide` | 3,329,048,376 |
| `euclid_dr1_spectro_line_features_spe_atomic_indices_wide_survey` | 3,033,760,428 |
| `euclid_dr1_spectro_line_features_spe_continuum_features_deep` | 22,375,360 |
| `euclid_dr1_spectro_line_features_spe_continuum_features_wide` | 184,947,132 |
| `euclid_dr1_spectro_line_features_spe_continuum_features_wide_survey` | 168,542,246 |
| `euclid_dr1_spectro_line_features_spe_line_features_deep` | 943,908,942 |
| `euclid_dr1_spectro_line_features_spe_line_features_wide` | 10,275,874,115 |
| `euclid_dr1_spectro_line_features_spe_line_features_wide_survey` | 9,524,030,381 |
| `euclid_dr1_spectro_line_features_spe_molecular_indices_deep` | 67,126,080 |
| `euclid_dr1_spectro_line_features_spe_molecular_indices_wide` | 554,841,396 |
| `euclid_dr1_spectro_line_features_spe_molecular_indices_wide_survey` | 505,626,738 |
| `euclid_dr1_spectro_model_spe_galaxy_models_deep` | 36,936,097 |
| `euclid_dr1_spectro_model_spe_galaxy_models_wide` | 848,103,802 |
| `euclid_dr1_spectro_model_spe_galaxy_models_wide_survey` | 800,701,396 |
| `euclid_dr1_spectro_model_spe_qso_models_deep` | 36,082,862 |
| `euclid_dr1_spectro_model_spe_qso_models_wide` | 778,784,939 |
| `euclid_dr1_spectro_model_spe_qso_models_wide_survey` | 735,094,834 |
| `euclid_dr1_spectro_model_spe_star_models_deep` | 13,629,798 |
| `euclid_dr1_spectro_model_spe_star_models_wide` | 293,768,741 |
| `euclid_dr1_spectro_model_spe_star_models_wide_survey` | 277,559,167 |
| `euclid_dr1_spectro_z_spe_classification_deep` | 7,456,278 |
| `euclid_dr1_spectro_z_spe_classification_wide` | 171,046,741 |
| `euclid_dr1_spectro_z_spe_classification_wide_survey` | 161,471,115 |
| `euclid_dr1_spectro_z_spe_galaxy_candidates_deep` | 36,910,593 |
| `euclid_dr1_spectro_z_spe_galaxy_candidates_wide` | 848,016,459 |
| `euclid_dr1_spectro_z_spe_galaxy_candidates_wide_survey` | 800,614,053 |
| `euclid_dr1_spectro_z_spe_qso_candidates_deep` | 36,063,712 |
| `euclid_dr1_spectro_z_spe_qso_candidates_wide` | 778,703,735 |
| `euclid_dr1_spectro_z_spe_qso_candidates_wide_survey` | 735,013,630 |
| `euclid_dr1_spectro_z_spe_quality_deep` | 51,930,919 |
| `euclid_dr1_spectro_z_spe_quality_wide` | 933,172,778 |
| `euclid_dr1_spectro_z_spe_quality_wide_survey` | 875,837,267 |
| `euclid_dr1_spectro_z_spe_star_candidates_deep` | 13,622,726 |
| `euclid_dr1_spectro_z_spe_star_candidates_wide` | 293,737,969 |
| `euclid_dr1_spectro_z_spe_star_candidates_wide_survey` | 277,528,395 |
:::
