import axios from "axios";
import os from 'node:os';



export async function hypeCurrencys(): Promise<any[]> {
    let hypeCurrencies: any[] = [];
    let re = '';
    let commandsAboutCurrencies: any[] = []
    let sortListHypeCurrencies = "";
    await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency`).then((res) => {
        for (let elem of (res.data)) {
        commandsAboutCurrencies.push(JSON.parse(`{ "command": "\/${elem.symbol}", "description": "Подробнее о ${elem.symbol}" }`))
        sortListHypeCurrencies
+= 
`\/${elem.symbol} ${elem.totalAverage}
`   
        re += `(\/${elem.symbol})|`
        hypeCurrencies.push(elem)
        }

    })
    // console.log([commandsAboutCurrencies, re.slice(0, -1), sortListHypeCurrencys]);

    return [commandsAboutCurrencies, re.slice(0, -1), sortListHypeCurrencies, hypeCurrencies]
}
export async function hypeCurrency(currency: string): Promise<string> {
    let hypeCurrencysAverage: string = `${currency} ${os.EOL}период    средняя цена ${os.EOL}`;


    await Promise.all([
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=30&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `${(res.data[0]).period} мин    ${(res.data[0]).totalAverage} ${os.EOL}`)),
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=60&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `1 час    ${(res.data[0]).totalAverage} ${os.EOL}`)),
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=180&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `3 часа    ${(res.data[0]).totalAverage} ${os.EOL}`)),
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=360&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `6 часов    ${(res.data[0]).totalAverage} ${os.EOL}`)),
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=720&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `12 часов    ${(res.data[0]).totalAverage} ${os.EOL}`)),
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=1440&symbol=${currency}`).then((res) => (hypeCurrencysAverage += `24 часа    ${(res.data[0]).totalAverage} ${os.EOL}`))
    ]);

    return hypeCurrencysAverage
}

export async function favouriteCurrencys(currencys: string[]): Promise<string> {
    let hypeCurrenciesAverages: string = `Крипта    Средняя цена за последние пол часа${os.EOL}`;

    for await (const currency of currencys) {
        await axios.get(`https://crypto-rest-api-easy-heroku.herokuapp.com/average_currency?period=30&symbol=${currency}`).then((res) => (hypeCurrenciesAverages += `/${currency}         ${(res.data[0]).totalAverage} ${os.EOL}`))
    }


    return hypeCurrenciesAverages
}
