# Glossaries

## Euclid Terms

:::{glossary}
Observation ID
: A 4 or 5 digit integer that uniquely identifies an observation.

Tile
: A Euclid Tile represents a well-defined area of the sky and is uniquely identified by a {term}`TILE ID`.
  MER data from the wide-field survey (including all Q1 data) are organized into tiles with core area sizes of about 30 arcmin x 30 arcmin and extended area sizes of about 32 arcmin x 32 arcmin.

TILE ID
: A 9 digit integer that uniquely identifies a Euclid {term}`Tile`.
:::

(instruments)=

## Instruments

Instruments on board the Euclid spacecraft and "external" (EXT) ground-based instruments that also contribute to Euclid data sets.

:::{glossary}
Visible Instrument (VIS)
: [Visible instrument (VIS)](https://sci.esa.int/web/euclid/-/euclid-vis-instrument) instrument on board the Euclid spacecraft

Near-Infrared Spectrometer and Photometer (NISP)
: [Near-Infrared Spectrometer and Photometer](https://sci.esa.int/web/euclid/-/euclid-nisp-instrument) instrument on board the Euclid spacecraft

Dark Energy Camera (DECam)
: [Dark Energy Camera (DECam)](https://noirlab.edu/public/programs/ctio/victor-blanco-4m-telescope/decam/) on the Blanco 4-meter telescope at the Cerro Tololo Inter-American Observatory in Chile (EXT)

MegaCam
: [MegaCam](https://www.cfht.hawaii.edu/Instruments/Imaging/MegaPrime/) instrument on the 3.6 meter Canada France Hawaii Telescope (CFHT) in Hawaii (EXT)

Hyper Suprime-Cam (HSC)
: [Hyper Suprime-Cam](https://subarutelescope.org/Instruments/HSC/) instrument on the 8.2 meter Subaru Telescope in Hawaii (EXT)

GigaPixel Camera (GPC)
: [GigaPixel Camera (GPC)](https://outerspace.stsci.edu/spaces/PANSTARRS/pages/298812301/PS1+GPC1+camera) on the 1.8 meter PanSTARRS telescope in Hawaii (EXT)
:::

(processing-functions)=

## Euclid Processing Functions (PF)

Euclid pipeline Processing Functions (PF) that process and produce Euclid data products.
[System overview](https://euclid.esac.esa.int/dr/q1/dpdd/system.html) includes a diagram.

:::{glossary}
LE1
: [LE1](https://euclid.esac.esa.int/dr/q1/dpdd/le1dpd/le1intro.html) produces Level 1 (raw) images from the VIS and NISP instruments

SIM
: [SIM](https://euclid.esac.esa.int/dr/q1/dpdd/simdpd/simintro.html) produces simulated data

VIS
: [VIS](https://euclid.esac.esa.int/dr/q1/dpdd/visdpd/visintro.html) produces calibrated Level 2 images from raw Level 1 VIS images

NIR
: [NIR](https://euclid.esac.esa.int/dr/q1/dpdd/nirdpd/nirintro.html) produces calibrated Level 2 images from raw Level 1 NISP images

SIR
: [SIR](https://euclid.esac.esa.int/dr/q1/dpdd/sirdpd/sirintro.html) produces calibrated Level 2 spectral images from the raw Level 1 NISP spectral data and extracts 1D spectra from the Level 2 spectral images

MER
: [MER](https://euclid.esac.esa.int/dr/q1/dpdd/merdpd/merintro.html) merges all Level 2 information to provide mosaics, catalogs, and photometric redshifts based on photometric and spectroscopic data

EXT
: [EXT](https://euclid.esac.esa.int/dr/q1/dpdd/extdpd/extintro.html) produces data products from external imaging and spectroscopic data

PHZ
: [PHZ](https://euclid.esac.esa.int/dr/q1/dpdd/phzdpd/phzintro.html) computes photometric redshifts from the multiwavelength imaging data

SPE
: [SPE](https://euclid.esac.esa.int/dr/q1/dpdd/spedpd/speintro.html) measures spectroscopic redshifts from the Level 2 spectra

SHE
: [SHE](https://euclid.esac.esa.int/dr/q1/dpdd/shedpd/sheintro.html) measures shapes on the VIS imaging data

LE3
: [LE3](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/le3intro.html) produces Level 3 data products

VMPZ-ID
: [VMPZ-ID](https://euclid.esac.esa.int/dr/q1/dpdd/le3dpd/id/vmpz-id/vmpz-idintro.html) produces masks for the photometric data
:::

## Acronyms

:::{glossary}
ADQL
: Astronomical Data Query Language

API
: Application Program Interface

AWS
: Amazon Web Services

EDF
: Euclid Deep Field (see [](#table-fields-overview))

EDF-F
: Euclid Deep Field Fornax (see [](#table-fields-overview))

EDF-N
: Euclid Deep Field North (see [](#table-fields-overview))

EDF-S
: Euclid Deep Field South (see [](#table-fields-overview))

ENSCI
: Euclid NASA Science Center

ESA
: European Space Agency

EXT (disambiguate)
: The EXT [Processing Function](#processing-functions), an "external" [instrument](#instruments), or images collected by an external instrument

FITS
: Flexible Image Transport System

GUI
: Graphical User Interface

IRSA
: NASA/IPAC Infrared Science Archive

IVOA
: International Virtual Observatory Alliance

LDN
: Lynds Dark Nebula (see [](#table-fields-overview))

MEF
: Multi-Extension FITS

NASA
: National Aeronautics and Space Administration

ODR
: {term}`AWS` Open Data Registry

PF
: [Processing Function](#processing-functions)

PSF
: Point Spread Function

Q1
: [Quick Release 1](#q1)

S3
: {term}`AWS` S3 is an object storage service. S3 cloud storage buckets are roughly similar to file servers.

SED
: Spectral Energy Distribution

SIA2
: Simple Image Access version 2

TAP
: Table Access Protocol

VO
: Virtual Observatory
:::
