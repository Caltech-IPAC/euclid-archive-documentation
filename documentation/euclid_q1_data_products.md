## Data Products in Euclid Quick Release 1

The first release of Euclid data occurred in March 2025 and is known as Euclid Quick Release 1 (Q1). It consists of data in four fields, together covering about 60 square degrees. Table 1 provides a summary of these fields.

Although the three Euclid Deep Fields are included, the Q1 data in these fields is at the depth planned for the Wide Field Survey.

The data products released as part of Euclid Q1 include images, catalogs, and spectroscopy, as listed in [Euclid Science Team Memo EUCL-EST-ME-8-018](https://www.cosmos.esa.int/documents/10647/12245842/EUCL-EST-ME-8-018_v1_Q1_fields_definition_2024-09-30.pdf). Euclid data products are processed and produced by different pipeline Processing Functions (PF). Table 2 summarizes these PFs, as they can be useful for understanding the organization and names of the data products, which are listed in Table 3.

Additional information about the data products are provided in {ref}`browsable-directories`.

**Table 1. Euclid Q1 Release: Fields Overview**
| Field | Acronym | Field Center (RA Dec) | Q1 coverage (sq deg) | Q1 Data Products |
| --- | --- | --- | --- | ---|
| Euclid Deep Field North | EDF-N | 17:58:55.9 +66:01:03.7 | 22.9 | Space-based imaging, spectra, catalogs at single-visit depth; and External images matching space-based single-visit depth|
| Euclid Deep Field Fornax | EDF-F | 04:04:57.84 -48:25:22.8 | 12.1 | see above |
| Euclid Deep Field South | EDF-S | 03:31:43.6 -28:05:18.6 | 28.1 | see above |
| Lynds Dark Nebula | LDN1641 | 85.74 -8.39 | | Space-based: 6 Reference Observation Sequences; No external data |


**Table 2. Euclid Pipeline Processing Functions**
| Euclid Processing Function (PF)| Brief Description|
| --- | --- |
| LE1 | Produces Level 1 (raw) images from the VIS and NISP instruments   |
| VIS | Produces calibrated Level 2 images from raw Level 1 VIS images   |
| NIR | Produces calibrated Level 2 images from raw Level 1 NISP images   |
| SIR | Produces calibrated Level 2 spectral images from the raw Level 1 NISP spectral data and extracts 1D spectra from the Level 2 spectral images   |
| MER | Merges all Level 2 information to provide mosaics, catalogs, and photometric redshifts based on photometric and spectroscopic data   |
| EXT | Provides external imaging and spectroscopic data   |
| SPE |  Measures spectroscopic redshifts from the Level 2 spectra  |
| PHZ | Computes photometric redshifts from the multiwavelength imaging data   |
| SHE | Measures shapes on the VIS imaging data (not included in Q1)   |
| LE3 | Produces Level 3 data products   |
| SIM | Produces simulated data (not included in Q1)   |


**Table 3. Euclid Q1 Release: Data Products Overview**
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
