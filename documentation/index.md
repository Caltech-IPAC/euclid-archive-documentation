(index)=
# Euclid Archive at IRSA User Guide
## Document Purpose and Scope

The purpose of this document is to facilitate science with Euclid data by providing users with an overview of the Euclid Quick Release 1 (Q1) data that are available at the NASA/IPAC Infrared Science Archive (IRSA) at Caltech, as well as instructions for accessing and downloading it.
We also provide tips for exploring the data and getting help with any questions you may have.
This User Guide is expected to evolve as IRSA adds functionality to its Euclid exploration tools.

## Euclid Overview

Euclid launched in July 2023 as a European Space Agency (ESA) mission with contributions by the National Aeronautics and Space Administration (NASA).
The primary science goals of Euclid are to better understand the composition and evolution of the dark Universe.
The Euclid mission will provide space-based imaging and spectroscopy as well as supporting ground-based imaging to achieve these goals.
These data will be archived in multiple global repositories, including IRSA, where they will support transformational work in many areas of astrophysics.

During its nominal 6-year mission, the Euclid space telescope will conduct (1) a Wide Survey resulting in imaging and spectroscopy over about 14,000 square degrees; and 2) a Deep Survey covering about 50 square degrees.
Euclid public data releases will occur approximately annually from 2025 through 2031.

The Euclid space telescope carries two instruments: the VISible instrument (VIS) and the Near-Infrared Spectrometer and Photometer (NISP).
The Euclid data set will include data collected with these space-based instruments as well as “external” (EXT) images collected by ground-based telescopes, processed with the same tiling scheme and pixel scale as the Euclid space-based images.

The first release of Euclid data occurred in March 2025 and is known as Euclid Quick Release 1 (Q1).
It consists of data in four fields, together covering about 60 square degrees.
Table 1 provides a summary of these fields.

Although the three Euclid Deep Fields are included, the Q1 data in these fields is at the depth planned for the Wide Field Survey.

The data products released as part of Euclid Q1 include images, catalogs, and spectroscopy, as listed in [Euclid Science Team Memo EUCL-EST-ME-8-018](https://www.cosmos.esa.int/documents/10647/12245842/EUCL-EST-ME-8-018_v1_Q1_fields_definition_2024-09-30.pdf).
Euclid data products are processed and produced by different pipeline Processing Functions (PF), which Table 2 summarizes.

Additional information about the data products (including their organization and names) are provided in {ref}`data-products`.

**Table 1. Euclid Q1 Release: Fields Overview**

| Field | Acronym | Field Center (RA Dec) | Q1 coverage (sq deg) | Q1 Data Products |
| --- | --- | --- | --- | --- |
| Euclid Deep Field North | EDF-N | 17:58:55.9 +66:01:03.7 | 22.9 | Space-based imaging, spectra, catalogs at single-visit depth; External images matching space-based single-visit depth|
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

IRSA serves the Q1 products both on premises at IPAC and on the cloud via Amazon Web Services (AWS).
The data is provided in layered access to support a variety of use cases and users, as summarized in Table 3.
Each data access layer is described in greater detail in the following sections.

**Table 3. Euclid Q1 Release: Data Access Overview**

| Data Access Mechanism | Images Available | Catalogs Available | Spectra Available|
| -------- | -------- | -------- | --- |
| [Euclid Data Explorer](https://irsa.ipac.caltech.edu/applications/euclid) | MER mosaics via direct image search, associated NIR and VIS calibrated frames upon download.   | All Q1 Catalogs   | All Q1 Spectra    |
| [Catalog Search Tool](https://irsa.ipac.caltech.edu/applications/Gator) | N/A | All Q1 Catalogs | N/A |
[Astroquery Python Library IRSA Module](https://astroquery.readthedocs.io/en/latest/ipac/irsa/irsa.html) | MER mosaics | All Q1 Catalogs | Coming Soon!|
|[PyVO Python Library](https://pyvo.readthedocs.io/en/latest/) | MER mosaics | All Q1 Catalogs | Coming Soon! |
[Virtual Observatory Protocols](https://irsa.ipac.caltech.edu/voapi.html) | MER mosaics via SIA | All Q1 Catalogs via TAP and SCS | Coming soon via SSA!|
[Browsable Directories](https://irsa.ipac.caltech.edu/ibe/data/euclid/q1/) | All Q1 image products | All Q1 catalog products | All Q1 spectral products |
|[Cloud Access](https://irsa.ipac.caltech.edu/cloud_access/#euclid)| All Q1 image products | All Q1 catalog products | All Q1 spectral products |

## Additional Resources

Below we provide a list of webpages that you may find useful as you access and analyze Euclid Q1 data.

| Description |
| -------- |
| Euclid Archive at the NASA/IPAC Infrared Science Archive (IRSA) <BR> https://irsa.ipac.caltech.edu/Missions/euclid.html |
| IRSA Helpdesk <BR> https://irsa.ipac.caltech.edu/docs/help_desk.html |
| Euclid NASA Science Center (ENSCI) <BR> https://euclid.caltech.edu |
| ESA's Euclid webpage <BR> https://www.cosmos.esa.int/web/euclid/home |
| Euclid Archive at ESA <BR> https://eas.esac.esa.int/sas |
| Euclid Science Team Memo EUCL-EST-ME-8-018 <BR> https://www.cosmos.esa.int/documents/10647/12245842/EUCL-EST-ME-8-018_v1_Q1_fields_definition_2024-09-30.pdf |
|ESA's Euclid Data Product Description Document <BR> https://euclid.esac.esa.int/dr/q1/dpdd/ |
