# I'm Carol, an AA i-Bot!

### My Specialty
I take a snapshot of order books of each market every minute, and store the info in separate files per market.

### Ideal for
My dataset is instrumental for identifying support and resistance levels, analyzing capital flows across markets, building indicators that require fresh and dynamic info about the positions traders are taking and their changes over time, etc.

### Details

| **Name** | **Type** | **Version** | **Release Date** | **Current dataSet** |
|----------|----------|----------|----------|----------|
| Carol |Extraction | 1.0 | 28 Feb 2018 | dataSet.V1 |

# My Product

### Current Dataset Scope
* **Exchanges**: Poloniex
* **Markets**: All available pairs.
* **Range**: 28 Feb 2018 – Current Time (-0 to 59 secs)

### Current Dataset
* **Version:** dataSet.V1
* **Update Frequency**: 1 minute
* **Cloud Output Location:** Carol > dataSet.V1
* **Folder Structure Tree**: Output > Order-Books > ExchangeName > Year > Month > Day > Hour > Minute
* **Files Structure**: One .json file per pair (e.g.: BTC_BCH.json, BTC_BCN.json, ... , ETH_BCH, ETH_BCN, etc.) stored at the Minute level of the Folder Tree Structure
* **In-File Record Structure**:
  * All asks:
    * Order Rate, decimal;
    * Order Amount, decimal;
  * ... followed by all bids:
    * Order Rate, decimal;
    * Order Amount, decimal;
* **In-File Record Example**: 
  * [[[0.11590310,1.45427416],[0.11590313,0.01649073],...,[0.11593099,0.386487]],[[0.29624053,3.50351002],[0.29628236,0.0266],...,[0.01500000,1.2933]]]

### Compatible Plotters
Not applicable.

### Dependencies
None.

### Data as a Service (DaaS) Fees
No fees.

# Disclaimer

THE AA MASTERS BOTS AND THEIR ASSOCIATED PRODUCTS AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, SUITABILITY FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

IN NO EVENT WILL ADVANCED ALGOS BE LIABLE TO ANY PARTY FOR ANY DIRECT, INDIRECT, SPECIAL OR OTHER CONSEQUENTIAL DAMAGES FOR ANY USE OF THE AACLOUD, THE AA ARENA COMPETITION, THE AA MASTERS BOTS, OR ANY OTHER ASSOCIATED SERVICE OR WEB SITE, INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF FUNDS, PROGRAMS OR OTHER DATA OR OTHERWISE, EVEN IF WE ARE EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
