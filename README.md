# I'm Carol, an AA e-Bot!

### My Product
I take a snapshot of order books of each market every minute, and store the info in separate files per market --every minute.

### Ideal for
My dataset is instrumental for identifying support and resistance levels, analyzing capital flows across assets and markets and for building indicators that require fresh and dynamic info about what traders are doing all over the place.

### Details

| **Name** | **Type** | **Version** | **Release Date** |
|----------|----------|----------|----------|
| Carol |Extraction | 1.0 | Feb 2018 |

### Current Dataset Scope
* **Exchanges**: Poloniex
* **Markets**: All available pairs.
* **Range**: 28 FEB 2018 – Current Time (±1 minute)

### Current Dataset Structure
* **Frequency**: 1 minute
* **Folder Structure Tree**: YEAR > MONTH > DAY > HOUR > MINUTE
* **Record Structure**: One .json file per pair (e.g.: BTC_BCH.json, BTC_BCN.json, ... , ETH_BCH, ETH_BCN, etc.)
  * Order Rate, decimal;
  * Order Amount, decimal;
* **Record Example**: 
  * [0.11590310,1.45427416]

### Plotter Output
No plotter.

### Dependencies
AACarol.

### Current Fees
No fees.
