const whenDeadline = require("./whenDeadline.js")
const culcCostAndTime = require('./culcCostAndTime.js')

function responseFormation(requestData) {
    const language = requestData.language;
    const mimetype = requestData.mimetype;
    let symbolCount = requestData.count;
    symbolCount = +symbolCount.replace("_", "")

    let costAndTimeOfWork = culcCostAndTime(language, symbolCount, mimetype)
    let cost = costAndTimeOfWork.at(0);
    let timeOfWork = costAndTimeOfWork.at(1);

    let deadline = whenDeadline(timeOfWork)
    let deadlineDate = new Date(deadline).toLocaleString("uk-Uk")
    deadlineDate = deadlineDate.replaceAll('.', '/')
    deadlineDate = deadlineDate.replace(',', '')
    deadline = Math.ceil(deadline / 1000)

    return `{price: "${cost}", time: "${timeOfWork}", deadline: "${deadline}", deadlineDate: "${deadlineDate}"}`;
}


module.exports = responseFormation
