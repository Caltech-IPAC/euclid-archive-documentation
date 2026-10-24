(data-products)=
# Data Products

[](#table-data-products) gives an overview of the Euclid data products, including the Euclid pipeline level and PF (see [Processing Function (PF)](#processing-functions)), product name, root directory, and a brief description.
[](#table-filename-fields) describes the fields that are used to construct filenames.
The subsections that follow provide more information about the data products and how they are organized at IRSA.
There is one subsection per directory listed in [](#table-data-products).
Information about how to browse the directories and other ways to access the data is given in [](#data-access).
The directory layout described here is that of DR1; where the Q1 layout differs, this is noted in the relevant subsection.

:::{table} Data products overview
:label: table-data-products

| Level | PF | Data Product Name | Directory | Data Product Description |
| --- | --- | --- | --- | --- |
| 1 | LE1 | DpdVisRawFrame | [RAW](#raw) | Raw VIS images |
| 1 | LE1 | DpdNispRawFrame | [RAW](#raw) | Raw NISP images |
| 2 | VIS | DpdVisCalibratedQuadFrame | [VIS_QUAD](#vis-quad) | Calibrated VIS exposures, background maps, weight maps, and PSF files |
| 2 | VIS | DpdVisCalibratedFrameCatalog | [Catalogs](#catalogs) | Catalog measured on calibrated VIS images |
| 2 | VIS | DpdVisStackedFrame | [VIS](#vis) | Stacked VIS images, weight maps, and PSF files |
| 2 | VIS | DpdVisStackedFrameCatalog | [Catalogs](#catalogs) | Catalog measured on stacked VIS images |
| 2 | NIR | DpdNirCalibratedFrame | [NIR](#nir) | Calibrated NISP images, background models, and PSF files. |
| 2 | NIR | DpdNirCalibratedFrameCatalog | [Catalogs](#catalogs) | Catalog extracted from NIR Calibrated Frame containing information on pointings and detectors. |
| 2 | NIR | DpdNirStackedFrame | [NIR](#nir) | Stacked NISP images and PSF files |
| 2 | NIR | DpdNirStackedFrameCatalog | [Catalogs](#catalogs) | Catalog extracted from NIR Stacked Frames |
| 2 | SIR | DpdSirScienceFrame | [SIR_SCIENCE_FRAME](#sir) | 2D SIR spectra |
| 2 | SIR | DpdSirCombinedSpectra | [SIR_COMBINED_SPECTRA](#sir) | For each object in the MER final catalog single, this product includes spectra extracted from individual dithers as well as the combined spectra. |
| 2 | MER | DpdMerBksMosaic | [MER](#mer) | MER mosaics, including EXT ground-based UGRIZ images |
| 2 | MER | DpdMerSegmentationMap | [MER_SEG](#mer-seg) | Maps of MER image pixels assigned to detected objects |
| 2 | MER | DpdMerFinalCatalog | [Catalogs](#catalogs) | Main MER catalog containing photometric and morphological information for detected sources |
| 2 | PHZ | DpdPhzPfOutputForL3 | [Catalogs](#catalogs) | Photometric redshift catalogs |
| 2 | PHZ | DpdPhzPfOutputCatalog | [Catalogs](#catalogs) | Photometric redshift catalogs |
| 2 | PHZ | DpdPhzDeepOutputCatalog | [Catalogs](#catalogs) | Photometric redshift catalogs for Deep tiles |
| 2 | SPE | DpdSpePfOutputCatalog | [Catalogs](#catalogs) | Spectroscopy catalogs |
| 3 | VMPZ-ID | DpdHealpixBitMaskVMPZ | [VMPZ](#vmpz) | Bitmask maps |
| 3 | VMPZ-ID | DpdHealpixFootprintMaskVMPZ | [VMPZ](#vmpz) | Survey footprint masks for each band |
| 3 | VMPZ-ID | DpdHealpixCoverageVMPZ | [VMPZ](#vmpz) | Coverage masks for each band |
| 3 | VMPZ-ID | DpdHealpixDepthMapVMPZ | [VMPZ](#vmpz) | MER depth maps |
| 3 | VMPZ-ID | DpdHealpixInfoMapVMPZ | [VMPZ](#vmpz) | Environment and instrument information for each band |
| 3 | VMPZ-ID | DpdHealpixEffectiveCoverageVMPZ | [VMPZ](#vmpz) | Effective coverage masks |
| | | MOC | [MOC](#moc) | Multi-Order Coverage maps of the DR1 Wide and Deep surveys |
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
  - [FIXME] need a description
* - `timestamp`
  - Year, month, day, and time of the observation (UTC) using the syntax `[YYYYMMDD]T[HHMMSS.SSSSSS]Z`
:::

(mer)=
## MER

The `MER` directory contains the [DpdMerBksMosaic](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html) data products.
All mosaics share the same pixel scale (0.1 arcsec) for all bands.

This directory is organized by {term}`TILE ID` and then [instrument](#instruments).
All tiles have `VIS` and `NISP` subdirectories, corresponding to the two instruments on board the Euclid spacecraft.
Some tiles have additional subdirectories representing external (EXT) ground-based observations.

The path syntax is `MER/[tile]/[instrument]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Background-subtracted mosaic image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#image-fits-file)
  - `EUC_MER_BGSUB-MOSAIC-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Root Mean Square](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#rms-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-RMS_TILE[tile]-*_[timestamp]_*.fits`
- [Bit flags](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#flag-fits-file) associated with the background-subtracted mosaic
  - `EUC_MER_MOSAIC-[instrument]-FLAG_TILE[tile]-*_[timestamp]_*.fits`
- [Background model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#background-fits-file). Backgrounds are subtracted from the input images prior to coaddition. Once the mosaics are produced, any remaining background is subtracted.  The model used for this secondary background subtraction is provided here.
  - `EUC_MER_BGMOD-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Catalog point spread function](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file)
  - `EUC_MER_CATALOG-PSF-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Grid of point spread functions](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#psf-fits-file) (PSFs) for sources in the MER Final Catalog
  - `EUC_MER_GRID-PSF-[VIS or NIR]_TILE[tile]-*_[timestamp]_*.fits`
  - [FIXME] there's two PSF files on disk (ie, in this list) but only one PSF file in the euclid docs, so I currently have both files linked to the same euclid url.
    is this wrong or are the euclid docs wrong?
- [Filter transmission](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#filter-transmission-fits-file), EXT instruments only
  - `EUC_MER_FILTER-TRANSMISSION-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Detector layering](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#layers-fits-file), `VIS` and `NISP` only
  - `EUC_MER_DETECTOR-LAYERING-[instrument]_TILE[tile]-*_[timestamp]_*.fits`
- [Bright star masks](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_bksmosaic.html#bright-star-masks-json-file), `VIS` and `NISP` only
  - `EUC_MER_STAR-MASKS-[instrument]_TILE[tile]-*_[timestamp]_*.json`

In Q1, the filter transmission, detector layering, and bright star mask files are not provided.

(mer-seg)=
## MER_SEG

The `MER_SEG` directory contains the [DpdMerSegmentationMap](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_segmentationmap.html) data products.
Each MER segmentation map shows the connected pixels of the detected objects in a {term}`tile`, and is a combination of the associated VIS and NIR segmentation maps.
The Object IDs in the MER segmentation maps correspond to the `SEGMENTATION_MAP_ID` column values in the [MER Final Catalog](#catalogs).

This directory is organized by {term}`TILE ID`.
The path syntax is `MER_SEG/[tile]/EUC_MER_FINAL-SEGMAP_TILE[tile]-*_[timestamp]_*.fits`, where `[tile]` is described in [](#table-filename-fields).

The individual segmentation maps are about 2.7 GB.

(moc)=
## MOC

The `MOC` directory contains Multi-Order Coverage maps (MOCs) of the DR1 Wide and Deep surveys, each in FITS and binary format.

The path syntax is `MOC/euclid_dr1_[deep or wide].moc.moc.[fits or bin]`.

In Q1, the `MOC` directory contains `euclid_q1.moc.[fits or bin]` and `euclid_planned_coverage.moc.[fits or bin]`.

(nir)=
## NIR

The `NIR` directory contains the near-infrared imaging data taken by the Euclid NISP instrument, specifically the [DpdNirCalibratedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframe.html) and [DpdNirStackedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_stackedframe.html) data products.

This directory is organized by {term}`Observation ID`.
The path syntax is `NIR/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Scientific image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframe.html#scientific-image-fits-file) is a multi-extension FITS (MEF) file with three extensions for each of 16 detectors: calibrated science image (SCI), RMS, and Data Quality flags (DQ).
  - `EUC_NIR_W-CAL-IMAGE_[band]-[obs]-*_[timestamp].fits`
- [Estimated background](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframe.html#background-fits-file) MEF file with the same structure as the scientific image.
  - `EUC_NIR_W-CAL-IMAGE-BKG_[band]-[obs]-*_[timestamp].fits`
- [PSF image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) associated with the science image.
  - `EUC_NIR_W-CAL-PSF-I_[band]-[obs]-*_[timestamp].fits`
- [PSF model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframe.html#psf-model-and-image-files) created by combining all the pipeline input images, as provided by PSFEx software.
  - `EUC_NIR_W-CAL-PSF-M_[band]-[obs]-*_[timestamp].psf`
- [Stacked image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_stackedframe.html#scientific-image-fits-file)
  - `EUC_NIR_W-STK-IMAGE_[band]-[obs]_[timestamp].fits`
- [PSF image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_stackedframe.html#psf-image-file) associated with the stacked image.
  - `EUC_NIR_W-STK-PSF-I_[band]-[obs]_[timestamp].fits`
- [PSF model](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_stackedframe.html#psf-model-file) associated with the stacked image.
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

- [DpdVisRawFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le1dpd/dpcards/le1_visrawframe.html)
  - `EUC_LE1_VIS-*-1-[C, D, or W]_[timestamp]*.fits`
- [DpdNispRawFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le1dpd/dpcards/le1_nisprawframe.html)
  - `EUC_LE1_NISP-*-1-[C, D, or W]_[timestamp]*.fits`

(sir)=
## SIR

The `SIR_SCIENCE_FRAME` and `SIR_COMBINED_SPECTRA` directories contain the spectroscopy data taken with the NISP instrument.
The science frames are organized by {term}`observation ID` while the combined spectra are organized by {term}`TILE ID`.

Fields in the paths below are described in [](#table-filename-fields).

- [DpdSirScienceFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/sirdpd/dpcards/sir_scienceframe.html), organized by {term}`observation ID`
  - Path syntax: `SIR_SCIENCE_FRAME/[obs]/EUC_SIR_W-SCIFRM_BKGSUB_[obs]_[sca_id]_[dithobs]_[gwa_pos]_*_[timestamp].fits`
- [DpdSirCombinedSpectra](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/sirdpd/dpcards/sir_combinedspectra.html), organized by {term}`TILE ID`
  - Path syntax: `SIR_COMBINED_SPECTRA/[tile]/EUC_SIR_W-COMBSPEC_[tile]_[timestamp].fits`

In Q1, both products are in a single `SIR` directory: `SIR/[obs]/` and `SIR/[tile]/`.

(vis)=
## VIS

The `VIS` directory contains stacked imaging data ([DpdVisStackedFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_stackedframe.html)) taken with the VIS instrument.

This directory is organized by {term}`observation ID`.
The path syntax is `VIS/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Calibrated VIS stacked image](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_stackedframe.html#calibrated-vis-stacked-image)
  - `EUC_VIS_SWL-STK-*_[timestamp].fits`
- [Weight map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_stackedframe.html#weight-map) for calibrated VIS stacked image
  - `EUC_VIS_SWL-WGT-*_[timestamp].fits`
- [Stack PSF](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_stackedframe.html#stack-psf) for calibrated VIS stacked image
  - `EUC_VIS_SWL-PSF-*_[timestamp].fits`

In Q1, stacked VIS images are not provided, and the `VIS` directory contains the calibrated exposures described in [](#vis-quad).

(vis-quad)=
## VIS_QUAD

The `VIS_QUAD` directory contains imaging data ([DpdVisCalibratedQuadFrame](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_calibratedquadframe.html)) taken with the VIS instrument.

This directory is organized by {term}`observation ID`.
The path syntax is `VIS_QUAD/[obs]/[filename]`, where `[filename]` for individual products is given below and the other fields are described in [](#table-filename-fields).

- [Calibrated VIS individual exposure](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_calibratedquadframe.html#calibrated-vis-individual-exposure)
  - `EUC_VIS_SWL-DET-[obs]-[dither]_[timestamp]*.fits`
- [Background map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_calibratedquadframe.html#background-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL-BKG-[obs]-[dither]_[timestamp]*.fits`
- [Weight map](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_calibratedquadframe.html#weight-map) for calibrated VIS individual exposure
  - `EUC_VIS_SWL-WGT-[obs]-[dither]_[timestamp]*.fits`
- [Quality control files](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_analysisresults.html) for calibrated VIS individual exposure
  - `EUC_VIS_QC-SCI-PERI-[obs]-[dither]-*__[timestamp].json`
- Point spread function, a single file in the `VIS_QUAD/shared_files/` directory
  - `EUC_VIS_GRD-PSF*[timestamp].fits`

In Q1, these files are in the `VIS` directory, with point spread function files in some of the observation directories, and the quality control files are not provided.

(vmpz)=
## VMPZ

The `VMPZ_*` directories contain a number of “Visibility Mask Photo-Z” products.

Each data product has its own directory, which is organized by {term}`TILE ID` unless noted below.
Fields in the paths below are described in [](#table-filename-fields).

- [DpdHealpixBitMaskVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_bitmask.html)
  - Path syntax: `VMPZ_HEALPIX_BIT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPBITMASK-[tile]_[timestamp]_*.fits`
- [DpdHealpixFootprintMaskVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_footprint.html)
  - Path syntax: `VMPZ_HEALPIX_FOOTPRINT_MASK/[tile]/EUC_LE3_VMPZ-ID_HPFOOTPRINTMASK-[tile]_[timestamp]_*.fits`
- [DpdHealpixCoverageVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_coverage.html)
  - Path syntax: `VMPZ_HEALPIX_COVERAGE_MASK/[tile]/EUC_LE3_VMPZ-ID_HPCOVERAGE-[tile]_[timestamp]_*.fits`
- [DpdHealpixDepthMapVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_depthmap.html)
  - Path syntax: `VMPZ_HEALPIX_DEPTH_MAP/[tile]/EUC_LE3_VMPZ-ID_HPDEPTHMAP-[tile]_[timestamp]_*.fits`
- [DpdHealpixInfoMapVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_infomap.html)
  - Path syntax: `VMPZ_HEALPIX_INFO_MAP/[tile]/EUC_LE3_VMPZ-ID_HP[map]-[tile]_[timestamp]_*.fits`, where `[map]` is one of `AA`, `BA`, `EXPOSURES`, `GALACTICEXTINCTION`, `NIRPRMS`, `NOISE`, `PERSISTENCE`, `PSART`, `PSF`, `SAA`, `STARBRIGHTNESSMEAN`, `STARBRIGHTNESSRMS`, `STARBRIGHTNESSSTD`, `STARNUMBERDENSITY`, `TILE`, or `ZODIACALLIGHT`. Some `PSART` files write `[timestamp]` as `[YYYY-MM-DD]T[HH:MM:SS.SSS]Z`.
- [DpdHealpixEffectiveCoverageVMPZ](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/le3dpd/id/vmpz-id/dpcards/vmpzid_healpix_effectivecoverage.html), organized by processing run rather than {term}`TILE ID`
  - Path syntax: `VMPZ_EFFECTIVE_COVERAGE/DpdHealpixEffectiveCoverageVMPZ/*/EUC_LE3_VMPZ-ID_HPEFFECTIVECOVERAGE-[CL or WL]_[timestamp]_*.fits`

In Q1, these directories are subdirectories of a single `VMPZ` directory (for example, `VMPZ/VMPZ_HEALPIX_BIT_MASK/[tile]/`), and the effective coverage masks are not provided.

(catalogs)=
## Catalogs

The `catalogs` directory contains Euclid catalogs from the MER, PHZ, SPE, NIR, and VIS [PFs](#processing-functions).
The data are packaged as FITS tables.

This directory is organized by data product and then either {term}`TILE ID` or {term}`observation ID`.
The path syntax is `catalogs/[product]/[tile or obs]/[filename]`, where `[product]` and `[filename]` are given below and the other fields are described in [](#table-filename-fields).

MER_FINAL_CATALOG
: The `MER_FINAL_CATALOG` product ([DpdMerFinalCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_finalcatalog.html)) directory is organized by TILE ID.
  - [Main MER catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_finalcatalog.html#main-catalog-fits-file) contains 470 columns (469 in Q1), including position, flux, and morphology measurements of detected sources.
    - `EUC_MER_FINAL-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Morphology catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_finalcatalog.html#morphology-catalog-fits-file) has 106 columns (104 in Q1), including morphology measurements such as concentration, asymmetry, smoothness, Gini, moment, Sersic indices, bulge sizes, clump counts, orientation, Hubble type, and more.
    - `EUC_MER_FINAL-MORPH-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Cutouts catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_finalcatalog.html#cutouts-catalog-fits-file) has 25 columns, including the coordinates of the corners of the source cutouts for each object detected in the MER Final Catalog.
    - `EUC_MER_FINAL-CUTOUTS-CAT_TILE[tile]-*_[timestamp]_*.fits`
  - [Deep field photometry catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/merdpd/dpcards/mer_finalcatalog.html#deep-field-photometry-catalog-fits-file) has 713 columns and is provided for some tiles only. It is not provided in Q1.
    - `EUC_MER_FINAL-DEEP-PHOTO-CAT_TILE[tile]-*_[timestamp]_*.fits`

NIR_CAL_CATALOG
: The `NIR_CAL_CATALOG` product ([DpdNirCalibratedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_calibratedframecatalog.html)) directory is organized by observation ID.
  - The NIR Calibrated catalog is extracted from the NIR Calibrated Frames.
    The main header contains metadata that applies to all 16 NIR detectors.
    An additional 16 extensions represent catalogs extracted from each detector.
    The catalogs have 43 columns including position, photometry, and morphology measurements.
    - `EUC_NIR_W-CALIB-CAT_[obs]-[band]-[dithobs]*_[timestamp].fits`

NIR_STA_CATALOG
: The `NIR_STA_CATALOG` product ([DpdNirStackedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/nirdpd/dpcards/nir_stackedframecatalog.html)) directory is organized by observation ID. It is not provided in Q1.
  - The NIR Stacked catalog is extracted from the NIR Stacked Frames and has 43 columns.
    - `EUC_NIR_W-STACK-CAT_[obs]-[band]_[timestamp].fits`

PHZ_DEEP_OUTPUT_CATALOG
: The `PHZ_DEEP_OUTPUT_CATALOG` product ([DpdPhzDeepOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzdeepoutputcatalog.html)) directory is organized by TILE ID. It is not provided in Q1.
  - [Photo Z catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzdeepoutputcatalog.html#photo-z-catalog) files contain two tables: the PHOTOZ CATALOG (41 columns) and the ZERO_POINT table.
    - `EUC_PHZ_PHZCAT_TILE[tile]_[timestamp]_*.fits`
  - Classification catalog (13 columns)
    - `EUC_PHZ_CLASSCAT_TILE[tile]_[timestamp]_*.fits`
  - NIR Physical Parameters catalog (65 columns)
    - `EUC_PHZ_PHYSPARAMNIR_*_[timestamp]_*.fits`
  - QSO Physical Parameters catalog (64 columns)
    - `EUC_PHZ_PHYSPARAMQSO_*_[timestamp]_*.fits`
  - Star Template catalog (63 columns)
    - `EUC_PHZ_STARCLASS_*_[timestamp]_*.fits`
  - [Sampled physical parameters](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzdeepoutputcatalog.html#sampled-physical-parameters), as a sampling file (21 columns) and an index file (5 columns)
    - `EUC_PHZ_PPSAMPLINGFILE_TILE[tile]_[timestamp]_*.fits`
    - `EUC_PHZ_PPSAMPLINGINDEX_TILE[tile]_[timestamp]_*.fits`

PHZ_PF_OUTPUT_CATALOG
: The `PHZ_PF_OUTPUT_CATALOG` product([DpdPhzPfOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputcatalog.html)) directory is organized by TILE ID.
  - [Photo Z catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputcatalog.html#photo-z-catalog) files contain two tables.
    The first is the PHOTOZ CATALOG, which contains 61 columns describing the photometric redshift probability distribution, fluxes, and classification.
    The second is the ZERO_POINT table, which contains the correction for each filter.
    - `EUC_PHZ_PHZCAT_[timestamp]*.fits`
  - [Galaxy SED](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputcatalog.html#galaxy-sed-catalog) catalog contains 120 columns describing the spectral energy distributions for MER objects classified as galaxies.
    - `EUC_PHZ_GALAXYSED_[timestamp]*.fits`
  - [Star SED catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputcatalog.html#star-sed-catalog) contains 120 columns describing the spectral energy distributions for MER objects classified as stars.
    - `EUC_PHZ_STARSED_[timestamp]*.fits`

PHZ_PF_OUTPUT_FOR_L3
: The `PHZ_PF_OUTPUT_FOR_L3` product ([DpdPhzPfOutputForL3](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html)) directory is organized by TILE ID.
  - [Classification catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html#classification-catalog) contains 13 columns describing the object classification (star, galaxy, QSO, globular cluster).
    - `EUC_PHZ_CLASSCAT_*_[timestamp]_*.fits`
  - [Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html#physical-parameters-catalog) contains 74 columns (93 in Q1) describing physical parameters such as redshift, luminosity, extinction, dust law parameters, absolute magnitudes, stellar mass, metallicity.
    - `EUC_PHZ_PHYSPARAM_*_[timestamp]_*.fits`
  - [QSO Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html#qso-physical-parameters-catalog) contains 56 columns describing physical parameters for objects classified as QSOs.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_PHYSPARAMQSO_[timestamp]_*.fits`
  - [NIR Physical Parameters catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html#nir-physical-parameters-catalog) contains 57 columns.
    - `EUC_PHZ_PHYSPARAMNIR_[timestamp]_*.fits`
  - [Star Template catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/phzdpd/dpcards/phz_phzpfoutputforl3.html#star-template) contains 55 columns describing physical parameters for objects classified as stars.
    Parameters include the best-fit SED, reddening, redshift, and corrected fluxes.
    - `EUC_PHZ_STARCLASS_[timestamp]_*.fits`

SPE_PF_OUTPUT_CATALOG
: The `SPE_PF_OUTPUT_CATALOG` product ([DpdSpePfOutputCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/spedpd/dpcards/spe_spepfoutputcatalog.html)) directory is organized by TILE ID.
  - [Redshift catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/spedpd/dpcards/spe_spepfoutputcatalog.html#redshift-catalog) files have 5 table extensions: `SPE_QUALITY` (31 columns, 25 in Q1, including data quality flags), `SPE_CLASSIFICATION` (5 columns, including the probabilities of an object being classified as a star, galaxy, or QSO), `SPE_GALAXY_CANDIDATES` (18 columns, 12 in Q1, including the spectroscopic redshift estimate, uncertainty, and reliability), `SPE_STAR_CANDIDATES` (11 columns, 8 in Q1, including the radial velocity estimate, uncertainty, and reliability), `SPE_QSO_CANDIDATES` (15 columns, 12 in Q1, including the spectroscopic redshift estimate, uncertainty, and reliability).
    - `EUC_SPE_[WIDE or DEEP]-CAT-Z-[tile]_N_[timestamp]_*.fits`
  - [Lines catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/spedpd/dpcards/spe_spepfoutputcatalog.html#lines-catalog) files have 4 table extensions: `SPE_LINE_FEATURES_CAT` (35 columns, 34 in Q1, including the detected spectral line), `SPE_ATOMIC_INDICES` (6 columns, including the atomic Lick index), `SPE_MOLECULAR_INDICES` (6 columns, including the molecular Lick index), `SPE_CONTINUUM_FEATURES` (6 columns, including the molecular Lick index).
    - `EUC_SPE_[WIDE or DEEP]-CAT-LIN-[tile]_N_[timestamp]_*.fits`
  - [Models catalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/spedpd/dpcards/spe_spepfoutputcatalog.html#models-catalog) files have 4 table extensions: `SPE_LINES_CATALOG` (4 columns, including the type of spectral line), `SPE_GALAXY_MODELS` (21 columns, including the spectroscopic redshift estimate), `SPE_STAR_MODELS` (8 columns, including the spectroscopic redshift estimate), SPE_QSO_MODELS (21 columns, including the spectroscopic redshift estimate).
    - `EUC_SPE_[WIDE or DEEP]-CAT-MOD-[tile]_N_[timestamp]_*.fits`

  In Q1, only `WIDE` files are provided.

VIS_CAL_CATALOG
: The `VIS_CAL_CATALOG` product ([DpdVisCalibratedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_calibratedframecatalog.html)) directory is organized by observation ID.
  - `EUC_VIS_SWL-CAT-[obs]-*_[timestamp]*.fits`

VIS_STA_CATALOG
: The `VIS_STA_CATALOG` product ([DpdVisStackedFrameCatalog](http://st-dm.pages.euclid-sgs.uk/data-product-doc/dm10/visdpd/dpcards/vis_stackedframecatalog.html)) directory is organized by observation ID. It is not provided in Q1.
  - `EUC_VIS_SWL-CAT-000-*_[timestamp]*.fits`

(enhanced-catalogs)=
### Enhanced Contributed Catalogs

[FIXME] add HATS
