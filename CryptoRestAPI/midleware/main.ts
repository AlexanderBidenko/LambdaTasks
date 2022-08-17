import {CryptocurrencyApi} from "./src/cryptoCurrencysApis";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const express = require("express");
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

