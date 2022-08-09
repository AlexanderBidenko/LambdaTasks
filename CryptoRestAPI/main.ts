import {CryptocurrencyApi} from "./src/cryptoCurrencysApis";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line quotes
import cron = require('node-cron');


import dotenv = require("dotenv");
import "dotenv/config";
dotenv.config();


cron.schedule(" 0-59/5 * * * *", async () => {
	console.log("Starting a database update", Date.now());
	new CryptocurrencyApi().updateAll();
}
);


try {

	const app = express();
	const port = 5000;


	app.get("/average_curraency",async (request, response) => {
		try {
			const market = request.query.market;
			const period = request.query.period;
			const symbol = request.query.symbol;

			// можем посмотреть средние значения для каждого маркета и среднее в целом
			if ((!symbol) && (!period) && (!market)) {
				return response.send(await new CryptocurrencyApi().someCurrencyAverage("AllValues", 30));
			}

			// можем выбрать конкретную крипту
			if ((symbol) && (!period) && (!market)) {
				return response.send(await new CryptocurrencyApi().someCurrencyAverage(symbol, 30));
			}

			// среднее значение валюты за некоторый промежуток
			if ((symbol) && (period) && (!market)) {
				return response.send(await new CryptocurrencyApi().someCurrencyAverage(symbol, period));
			}

			// внешняя API
			if ((!symbol) && (!period) && (market)) {
				return response.send(await new CryptocurrencyApi().someMarket(market));
			}

		} catch (e) {
			console.log(e);
		}
	});


	app.listen(port, () => console.log(`Running on port ${port}`));
	
} catch (e) {
	console.log(e);
} 

