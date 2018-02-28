exports.newInterval = function newInterval(BOT, UTILITIES, FILE_STORAGE, DEBUG_MODULE, MARKETS_MODULE, EXCHANGE_CLIENT_MODULE) {

    let bot = BOT;

    const MODULE_NAME = "Interval";
    const LOG_INFO = false;

    const EXCHANGE_NAME = "Poloniex";

    const ORDER_BOOK_DEPTH = 100000;    // This is the max amount of BIDs or ASKs we want the Exchange API to return us from each market. 

    const logger = DEBUG_MODULE.newDebugLog();
    logger.fileName = MODULE_NAME;
    logger.bot = bot;

    poloniexOrderBooks = {
        initialize: initialize,
        start: start
    };

    let markets;

    let fileStorage = FILE_STORAGE.newAzureFileStorage(bot);

    let utilities = UTILITIES.newUtilities(bot);

    return poloniexOrderBooks;

    function initialize(yearAssigend, monthAssigned, callBackFunction) {

        try {

            const logText = "[INFO] initialize - Entering function 'initialize' ";
            console.log(logText);
            logger.write(logText);

            exchangeApiClient = new EXCHANGE_CLIENT_MODULE();

            fileStorage.initialize("Carol");

            markets = MARKETS_MODULE.newMarkets(bot);
            markets.initialize(callBackFunction);


        } catch (err) {

            const logText = "[ERROR] initialize - ' ERROR : " + err.message;
            console.log(logText);
            logger.write(logText);

        }
    }

    function start() {

        let currentDate;

        try {

            requestNewData(); 

            function requestNewData() {

                try {

                    const logText = "[INFO] start - Entering function 'requestNewData'";
                    console.log(logText);
                    logger.write(logText);

                    currentDate = new Date();

                    exchangeApiClient.returnOrderBooks(ORDER_BOOK_DEPTH, onReturnOrderBooks);

                    function onReturnOrderBooks(err, apiResponse) {

                        try {

                            const logText = "[INFO] start - Entering function 'onReturnOrderBooks'";
                            console.log(logText);
                            logger.write(logText);

                            if (err || apiResponse.error !== undefined) {
                                try {

                                    if (err.message.indexOf("ETIMEDOUT") > 0) {

                                        const logText = "[WARN] requestNewData - onReturnOrderBooks - Timeout reached while trying to access the Exchange API.";
                                        console.log(logText);
                                        logger.write(logText);

                                        /* We try to reconnect to the exchange and fetch the data again. */

                                        getOrderBookFromExchangeApi();

                                    } else {
                                        const logText = "[ERROR] requestNewData - onReturnOrderBooks - err.message.indexOf(ETIMEDOUT) <= 0 ' ERROR : " + err.message;
                                        console.log(logText);
                                        logger.write(logText);
                                        return;
                                    }

                                } catch (err) {
                                    const logText = "[ERROR] requestNewData - onReturnOrderBooks ' RECEIVED ERROR : " + apiResponse.error;
                                    console.log(logText);
                                    logger.write(logText);
                                }
                                return;

                            } else {
                                processNextMessage(apiResponse);
                            }

                        } catch (err) {

                            const logText = "[ERROR] requestNewData - onReturnOrderBooks ' ERROR : " + err.message;
                            console.log(logText);
                            logger.write(logText);

                        }
                    }

                } catch (err) {

                    const logText = "[ERROR] requestNewData ' ERROR : " + err.message;
                    console.log(logText);
                    logger.write(logText);

                }
            }

            function processNextMessage(messageReceived) {

                try {

                    const logText = "[INFO] start - Entering function 'processNextMessage'";
                    console.log(logText);
                    logger.write(logText);

                    let orderBooksMessage = messageReceived;

                    let dateForPath = currentDate.getUTCFullYear() + '/' + utilities.pad(currentDate.getUTCMonth() + 1, 2) + '/' + utilities.pad(currentDate.getUTCDate(), 2) + '/' + utilities.pad(currentDate.getUTCHours(), 2) + '/' + utilities.pad(currentDate.getUTCMinutes(), 2);

                    let filePath = bot.name + '/' + bot.dataSetVersion + '/' + EXCHANGE_NAME + '/' + 'Output' + '/' + bot.process + '/' + dateForPath;

                    utilities.createFolderIfNeeded(filePath, fileStorage, processEachMarket);

                    function processEachMarket() {

                        for (let marketName in orderBooksMessage) {

                            let market = orderBooksMessage[marketName];

                            try {

                                let bidsCounter = 0;
                                let asksCounter = 0;

                                let newDate = new Date();

                                let asks = market.asks;
                                let bids = market.bids;

                                let fileName = marketName + '.json';

                                let needSeparator;
                                let separator;

                                needSeparator = false;

                                let maxRate = bids[0][0] * 1.1;
                                let presicion = utilities.calculatePresicion(maxRate);

                                let truncatedRate;
                                let asksMap = new Map();
                                let bidsMap = new Map();

                                let fileContent = "";

                                /* First we create the raw file and aggregate the date for the aggregated file */

                                fileContent = fileContent + '[';
                                fileContent = fileContent + '[';

                                for (let i = 0; i < asks.length; i++) {

                                    if (needSeparator === false) {

                                        needSeparator = true;
                                        separator = '';

                                    } else {
                                        separator = ',';
                                    }

                                    let rate = asks[i][0];
                                    let amount = asks[i][1];

                                    fileContent = fileContent + separator + '[' + rate + ',' + amount + ']';

                                    roundedRate = Math.round(rate / presicion) * presicion;

                                    let currentAmount = asksMap.get(roundedRate) || 0;
                                    currentAmount = currentAmount + amount;

                                    asksMap.set(roundedRate, currentAmount);

                                    asksCounter = i;
                                }

                                fileContent = fileContent + '],[';

                                needSeparator = false;

                                for (let i = 0; i < bids.length; i++) {

                                    if (needSeparator === false) {

                                        needSeparator = true;
                                        separator = '';

                                    } else {
                                        separator = ',';
                                    }

                                    let rate = bids[i][0];
                                    let amount = bids[i][1];

                                    fileContent = fileContent + separator + '[' + rate + ',' + amount + ']';

                                    truncatedRate = Math.trunc(rate / presicion) * presicion;

                                    let currentAmount = bidsMap.get(truncatedRate) || 0;
                                    currentAmount = currentAmount + amount;

                                    bidsMap.set(truncatedRate, currentAmount);

                                    bidsCounter = i;
                                }

                                fileContent = fileContent + ']';
                                fileContent = fileContent + ']';

                                fileStorage.createTextFile(filePath, fileName, fileContent + '\n', onFileCreated);

                                function onFileCreated() {

                                    const logText = "[INFO] File Created @ " + filePath + "/" + fileName;
                                    console.log(logText);
                                    logger.write(logText);

                                }

                            } catch (err) {

                                const logText = "[ERROR] processNextMessage - onMarketIdReady ' ERROR : " + err.message;
                                console.log(logText);
                                logger.write(logText);

                            }
                        }
                    }

                    messageReceived = null;

                } catch (err) {

                    const logText = "[ERROR] processNextMessage ' ERROR : " + err.message;
                    console.log(logText);
                    logger.write(logText);

                }
            }

        } catch (err) {

            const logText = "[ERROR] Start - ' ERROR : " + err.message;
            console.log(logText);
            logger.write(logText);

        }
    }
};



