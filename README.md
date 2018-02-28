# I'm Carol, an AA e-Bot!

### My Specialty
I take a snapshot of order books of each market every minute, and store the info in separate files per market --every minute.

### Ideal for
My dataset is instrumental for identifying support and resistance levels, analyzing capital flows across assets and markets and for building indicators that require fresh and dynamic info about what traders are doing all over the place.

### Details

| **Name** | **Type** | **Version** | **Release Date** |
|----------|----------|----------|----------|
| Carol |Extraction | 1.0 | Feb 2018 |

## My Product

### Current Dataset Scope
* **Exchanges**: Poloniex
* **Markets**: All available pairs.
* **Range**: 28 FEB 2018 – Current Time (-0 to 59 secs)

### Current Dataset
* **Version:** dataSet.V1
* **Update Frequency**: 1 minute
* **Cloud Output Location:** DATA SHARES > DATA > CAROL > DATASET.V1
* **Folder Structure Tree**: EXCHANGENAME > YEAR > MONTH > DAY > HOUR > MINUTE
* **Files Structure**: One .json file per pair (e.g.: BTC_BCH.json, BTC_BCN.json, ... , ETH_BCH, ETH_BCN, etc.) stored at the MINUTE level of the Folder Tree Structure
* **In-File Record Structure**: 
  * Order Rate, decimal;
  * Order Amount, decimal;
* **In-File Record Example**: 
  * [0.11590310,1.45427416]

### Plotter Output
No plotter.

### Dependencies
None.

### Data as a Service Fees
No fees.
