import mysql = require("mysql2");
import axios from "axios";
import dotenv = require("dotenv")
import "dotenv/config";
import { Worker } from "worker_threads";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("worker_threads").threadId;
dotenv.config({path: ".."});


export class CryptocurrencyApi { 
	date = Date.now();


	connection = mysql.createConnection({
		uri: process.env.connectionURI,
		// host: process.env.connectionHost,
		// port: process.env.connectionPort,
		user: process.env.connectionUser,
		database: process.env.connectionDB,
		password: process.env.connectionPassword,
		connectTimeout: 1000000
	});


	private async refreshKucoinData(): Promise<void> {
		const valuesKucoinNow = await axios.get("https://api.kucoin.com/api/v1/prices");

		new Promise(() => {
			let coins: string = JSON.stringify(valuesKucoinNow.data.data);
			coins = coins.slice(1,-1);
			// eslint-disable-next-line quotes
			coins = coins.replaceAll('"', "");
			// eslint-disable-next-line prefer-const
			let coinsArray = coins.split(",");
      
			for (let i = 0; i < coinsArray.length; i++) {
				// eslint-disable-next-line prefer-const
				let element = coinsArray[i].split(":");
				const someCoinData = [this.date, element[0], element[1]];
				const sql = "INSERT INTO kucoin(time, symbol, price) VALUES(?, ?, ?)";

				this.connection.query(sql, someCoinData, function(err) {
					if(err) console.log(err);
				}); 
			}
		});
	}


	private async refreshCoinStatsData() {  
		const valuesCoinstastNow = await axios.get("https://api.coinstats.app/public/v1/coins?currency=USD%0A");

		new Promise(() => {
			const coins = valuesCoinstastNow.data.coins;
			for (let i = 0; i < coins.length; i++) {  
				const someCoinData = [this.date, coins[i].symbol, coins[i].price];
				const sql = "INSERT INTO coinstats(time, symbol, price) VALUES(?, ?, ?)";

				this.connection.query(sql, someCoinData, function(err) {
					if(err) console.log(err);
				}
				);
			}
		});
	}


	private async refreshCoinPaprikaData() {  
		const valuesCoinPaprikaNow = await axios.get("https://api.coinpaprika.com/v1/tickers");

		new Promise(() => { 
			const coins = valuesCoinPaprikaNow.data;
			coins.forEach(element => {
				const someCoinData = [this.date, element.symbol, element.quotes.USD.price];
				const sql = "INSERT INTO coinPaprika(time, symbol, price) VALUES(?, ?, ?)";

				this.connection.query(sql, someCoinData, function(err) {
					if(err) console.log(err);
				}
				);
			});
		});
	}


	private async refreshCoinMarketCapData() {  
		let valuesCoinMarketCapNow;
		try {
			valuesCoinMarketCapNow = await axios.get("https://coinmarketcap-cc.p.rapidapi.com/listings/latest/150?api_key=f49db9a9-94bf-46f0-89bf-10c07fe288d2", {
				headers: {
					"X-RapidAPI-Key": "6f3cd52fe6msh60debab6a1e522dp111039jsn8bc4b01de87f",
					"X-RapidAPI-Host": "coinmarketcap-cc.p.rapidapi.com",
					"useQueryString": true
				}
			});
  
		} catch(e) {
			console.log(e);
		}

		new Promise(() => { 
			const coins = valuesCoinMarketCapNow.data.data;
			coins.forEach(element => {
				const someCoinData = [this.date, element.symbol, element.quote.USD.price];
				const sql = "INSERT INTO coinmarketcap(time, symbol, price) VALUES(?, ?, ?)";

				this.connection.query(sql, someCoinData, function(err) {
					if(err) console.log(err);
				});
			});
		});
	}


	public async refreshCoinBaseData() {
		const res = await axios.get("https://api.coinbase.com/v2/prices/USD/spot" ,{
			headers: { "User-Agent": "Foo/1.0"}
		});
		const currencies = res.data.data;
		new Promise(() => { 
			currencies.forEach(element => {
				const someCoinData = [this.date, element.base, element.amount];
				const sql = "INSERT INTO coinbase(time, symbol, price) VALUES(?, ?, ?)";

				this.connection.query(sql, someCoinData, function(err) {
					if(err) console.log(err);
				});
			});
		});
	}


	private async workerAverage(symbol: string, period: number) {
		const worker = new Worker("./src/worker.ts", {
			workerData: [symbol, period]
		});
		worker;

		let res;

		await new Promise((resolve)=>{

			worker.on("message", msg => {     
				resolve(msg);
			});
        
		}).then(result => {
			res = result;
		});
		
		return res;
	}


	public async hypeCurrencysAverage(period=30, dateApiStart: number) {  
		// проверка что за данный период данные добавлялись
		if ((((this.date - dateApiStart) / 1000) / 60) > period) {

			try {
				let res = [];
				// получение хайэст крипт
				const valuesCoinstastNow = await axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=USD");
				const coins = (valuesCoinstastNow.data.coins);

				// обработка
				await Promise.all(coins.map(coin => this.workerAverage(coin.symbol, period).then(result => res.push({position: coins.indexOf(coin) + 1, symbol: result.symbol, marketsAverage:  result.marketsAverage, totalAverage: result.totalAverage}))));
		
				// сортировка по популярности
				res = res.sort((a, b) => { 
					if (a.position > b.position) {
						return 1;
					} else return -1;
				});

				// добавление в дб
				new Promise(() => { 
					res.forEach(element => {
						const AverageCoinmarketcap = isNaN(element.marketsAverage.coinmarketcap) ? "NaN" : element.marketsAverage.coinmarketcap;
						const AverageCoinbase = isNaN(element.marketsAverage.coinbase) ? "NaN" : element.marketsAverage.coinbase;
						const AverageCoinstats = isNaN(element.marketsAverage.coinstats) ? "NaN" : element.marketsAverage.coinstats;
						const AverageKucoin = isNaN(element.marketsAverage.kucoin) ? "NaN" : element.marketsAverage.kucoin;
						const AverageCoinpaprika = isNaN(element.marketsAverage.coinpaprika) ? "NaN" : element.marketsAverage.coinpaprika;
		
						const someCoinData = [this.date, period, element.position, element.symbol, AverageCoinmarketcap , AverageCoinbase , AverageCoinstats , AverageKucoin , AverageCoinpaprika, element.totalAverage];
						// let someCoinData = [this.date, period, element.position, element.symbol, element.marketsAverage.coinmarketcap , element.marketsAverage.coinbase , element.marketsAverage.coinstats , element.marketsAverage.kucoin , element.marketsAverage.coinpaprika, element.totalAverage]
						const sql = `INSERT INTO  averageValues${period} (time, period, position, symbol, CoinMarketCap, CoinBase, CoinStats, Kucoin, CoinPaprika, totalAverage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		
						this.connection.query(sql, someCoinData, function(err) {
							if(err) console.log(err);
						});
					});
				}).then(() => {
					this.connection.end();
					console.log(`Averages for the last ${period} minutes updated.`);
				});

			} catch (e) {
				console.log(e);
			}
		}

	}
          

	public  async updateAll(dateApiStart){

		console.log("Updating cryptocurrency prices");
		await Promise.all([
			this.refreshKucoinData().then(() => console.log("Kucoin had refresh")),
			this.refreshCoinBaseData().then(() => console.log("CoinBase had refresh")),
			this.refreshCoinMarketCapData().then(() => console.log("Market had refresh")),
			this.refreshCoinPaprikaData().then(() => console.log("Paprika had refresh")),
			this.refreshCoinStatsData().then(() => console.log("Stats had refresh"))
		]);
		console.log("Start updating cryptocurrency average prices");
		await Promise.all([
			this.hypeCurrencysAverage(30, dateApiStart), //.then(()=> console.log(30)),
			this.hypeCurrencysAverage(60, dateApiStart), //.then(()=> console.log(60)),
			this.hypeCurrencysAverage(180, dateApiStart), //.then(()=> console.log(180)),
			this.hypeCurrencysAverage(360, dateApiStart), //.then(()=> console.log(360)),
			this.hypeCurrencysAverage(720, dateApiStart), //.then(()=> console.log(720)),
			this.hypeCurrencysAverage(1440, dateApiStart) //.then(()=> console.log(1440))
		]).then(()=> {
			this.connection.end();
			console.log("Cryptocurrency average prices had updated");
		});
	}

	public async connectionEnd() {
		await this.connectionEnd();
	}
}
