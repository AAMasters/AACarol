# I'm Carol, an AA e-Bot!

### My Specialty
I take a snapshot of order books of each market every minute, and store the info in separate files per market --every minute.

### Ideal for
My dataset is instrumental for identifying support and resistance levels, analyzing capital flows across markets, building indicators that require fresh and dynamic info about the positions traders taking, etc.

### Details

| **Name** | **Type** | **Version** | **Release Date** | **Current dataSet** |
|----------|----------|----------|----------|----------|
| Carol |Extraction | 1.0 | Feb 2018 | dataSet.V1 |

# My Product

### Current Dataset Scope
* **Exchanges**: Poloniex
* **Markets**: All available pairs.
* **Range**: 28 FEB 2018 – Current Time (-0 to 59 secs)

### Current Dataset
* **Version:** dataSet.V1
* **Update Frequency**: 1 minute
* **Cloud Output Location:** Carol > dataSet.V1
* **Folder Structure Tree**: ExchangeName > Year > Month > Day > Hour > Minute
* **Files Structure**: One .json file per pair (e.g.: BTC_BCH.json, BTC_BCN.json, ... , ETH_BCH, ETH_BCN, etc.) stored at the MINUTE level of the Folder Tree Structure
* **In-File Record Structure**:
  * All asks:
    * Order Rate, decimal;
    * Order Amount, decimal;
  * ... followed by all bids:
    * Order Rate, decimal;
    * Order Amount, decimal;
* **In-File Record Example**: 
  * [[[0.11590310,1.45427416],[0.11590313,0.01649073],...,[0.11593099,0.386487]],[[0.29624053,3.50351002],[0.29628236,0.0266],...,[0.01500000,1.2933]]]

### Plotter Output
No plotter.

### Dependencies
None.

### Data as a Service (DaaS) Fees
No fees.
