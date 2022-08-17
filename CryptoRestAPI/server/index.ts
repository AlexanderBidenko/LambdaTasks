// Простое Rest Api которое обращается к различным площадкам получает ценны криптовалют 
// и вычисляет простое скользящее среднее (далее average)
// Доступные эндпоинты:
// /average_curraency
// Возвращает показатель простого скользящего среднего криптовалют
// Параметры данного эндпоинта 
import { marketsEndpoints } from "./src/marketsApi";
import { currenciesAverage } from "./src/currensysAverage";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");


import dotenv = require("dotenv");
import "dotenv/config";
dotenv.config();


try {

	const app = express();
	const port = process.env.PORT || 5000;


	app.get("/", (request, response) => {
		response.send("availyble endpoints: /average_curraency (params: period[30/60/180/360/720/1440], symbol), /market (params: name[CoinBase, Kucoin, CoinStats, CoinPaprika])");
	});

	app.get("/average_curraency", async (request, response) => {
		try {
			const period = request.query.period;
			const symbol = request.query.symbol;

			// можем посмотреть средние значения для каждого маркета и среднее в целом
			if ((!symbol) && (!period)) {
				return response.send(await new currenciesAverage().someCurrencyAverage("AllValues", 30));
			}

			if ((!symbol) && (period)) {
				return response.send(await new currenciesAverage().someCurrencyAverage("AllValues", period));
			}

			// можем выбрать конкретную крипту
			if ((symbol) && (!period)) {
				return response.send(await new currenciesAverage().someCurrencyAverage(symbol, 30));
			}

			// среднее значение валюты за некоторый промежуток
			if ((symbol) && (period)) {
				return response.send(await new currenciesAverage().someCurrencyAverage(symbol, period));
			}
	
		} catch (e) {
			console.log(e);
		}
	});

	// обращение к внешним апи и получение актуальных цен
	app.get("/market",async (request, response) => {
		try {
			const name = request.query.name;
			response.send(await new marketsEndpoints().redirecting(name));
		} catch (e) {
			console.log(e);
		}
	});

	app.listen(port, () => console.log(`Running on port ${port}`));
	
} catch (e) {

	console.log(e);
}
