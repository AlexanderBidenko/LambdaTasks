// Мидлвэйр CryptoCurrencyApi для обновления и обработки цен криптовалюты.
import {CryptocurrencyApi} from "./src/cryptoCurrencysApis";

// eslint-disable-next-line quotes
import cron = require('node-cron');


import dotenv = require("dotenv");
import "dotenv/config";
dotenv.config();

const dateStart = Date.now();
cron.schedule(" 0-59/10 * * * *", async () => {
	console.log("Starting a database update", Date.now());
	await new CryptocurrencyApi().updateAll(dateStart);
});
