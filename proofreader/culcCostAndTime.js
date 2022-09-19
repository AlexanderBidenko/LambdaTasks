let culcCostAndTime = function culcCostAndTime(language, symbolCount, mimetype) {
    let cost;
    let symbolPerHour;
    let symbolCost;
    let minCost;
    const minTimeOfWork = 1;

    if (language === ("ukr") || language === ("ru")) {
        symbolPerHour = 1333;
        symbolCost = 0.05;
        minCost = 50;
     } else if (language === ("en")) {
        symbolPerHour = 333;
        symbolCost = 0.12;
        minCost = 120;
     }
     
    let timeOfWork = Math.ceil(symbolCount / symbolPerHour) + 0.5;

    cost = Math.ceil(symbolCount * symbolCost);

    if (cost < minCost)  {
        cost = minCost;        
    }

    if (timeOfWork < minTimeOfWork) {
        timeOfWork = minTimeOfWork;
    }

    if (mimetype === "other") {
        cost = Math.ceil(cost * 1.2);
        timeOfWork = timeOfWork * 1.2;
    }

    return new Array(cost, timeOfWork);
}

module.exports = culcCostAndTime;