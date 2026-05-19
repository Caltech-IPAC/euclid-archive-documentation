(bulk-downloads)=
# Bulk Downloads

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
