import fs from 'fs';
import axios from "axios";


export const privateBank = async function privateBank(): Promise<string[]> {
    let valuesNow = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    const PriceToBuyUSD = ((valuesNow.data)[0]).buy
    const PriceToSaleUSD = ((valuesNow.data)[0]).sale
    const PriceToBuyEUR = ((valuesNow.data)[1]).buy
    const PriceToSaleEUR = ((valuesNow.data)[1]).sale


    let privatBankUSDExchangeRate = `USD покупка: ${PriceToBuyUSD}, продажа: ${PriceToSaleUSD}.`
    let privatBankEURExchangeRate = `EUR покупка: ${PriceToBuyEUR}, продажа: ${PriceToSaleEUR}`
    return [privatBankUSDExchangeRate, privatBankEURExchangeRate]

}



export const monoBank = async function monoBank(): Promise<string[]> {
    const timeNow = Date.now()
    let checkTime = fs.readFileSync("monoBankRates.txt", "utf8");
    if (Number((checkTime.split(" "))[0]) < (timeNow - 360000)) {

    let valuesNow = await axios.get('https://api.monobank.ua/bank/currency')

    const PriceToBuyUSD = ((valuesNow.data)[0]).rateBuy
    const PriceToSaleUSD = ((valuesNow.data)[0]).rateSell
    const PriceToBuyEUR = ((valuesNow.data)[1]).rateBuy
    const PriceToSaleEUR = ((valuesNow.data)[1]).rateSell
    
    fs.writeFile("monoBankRates.txt", (String(timeNow) + ` USD покупка: ${PriceToBuyUSD}, продажа: ${PriceToSaleUSD}. EUR покупка: ${PriceToBuyEUR}, продажа: ${PriceToSaleEUR}`), function(error){})
        const res = [`USD покупка: ${PriceToBuyUSD}, продажа: ${PriceToSaleUSD}.`, `EUR покупка: ${PriceToBuyEUR}, продажа: ${PriceToSaleEUR}`]
        return res;
    }
    else {
        const USD = ((checkTime.split(" ")).slice(1,6)).join(' ')
        const EUR = ((checkTime.split(" ")).slice(6,11)).join(" ")
        const res = [USD, EUR]
        return res;
    }
    } 
