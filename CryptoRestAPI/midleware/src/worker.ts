
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dotenv = require("dotenv");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dotenvconf = require("dotenv/config");

// dotenv.config({path: ".."});
// dotenvconf;

const date = Date.now();


const connection = mysql.createConnection({
	host: process.env.connectionHost,
	user: process.env.connectionUser,
	database: process.env.connectionDB,
	password: process.env.connectionPassword,
	connectTimeout: 100000000
});

async function someCurrencyBack(currency, Market, period) {
	let res;
	await new Promise((resolve) => {
		// SELECT * FROM kucoin WHERE time > 1660062120631 AND symbol = "BTC"
		connection.query(`SELECT * FROM ${Market} WHERE time > ${(Number(date) - (period*60000))} AND symbol = '${currency}'`,
			function(err, results) {
				if (err) {
					console.log(err);
				}
				// res = results;
				resolve(res = results);
			});
	});
	try {

		let sumOfPricesAtSomeMarket = 0;

		res.forEach(element => {
			if ((element.price)  && (!isNaN(element.price))) {
				sumOfPricesAtSomeMarket += Number(element.price);
			}

		});
		// res = {period: period, symbol: currency, averagePrice: (sumOfPricesAtSomeMarket/res.length)}
		res = {"averagePrice": (sumOfPricesAtSomeMarket/res.length)};
	} catch (e) {

		console.log(e);
	}
	// console.log(res);
	return res;  
}

async function someCurrencyAverage(currency, period) {
	const markets = ["coinbase", "coinpaprika", "coinstats", "kucoin"];
	// const markets = ["coinbase", "coinmarketcap", "coinpaprika", "coinstats", "kucoin"];

	// let coinmarketcapData;
	let coinpaprikaData;
	let coinstatsData;
	let coinbaseData;
	let kucoinData;

	// eslint-disable-next-line prefer-const
	let marketsAveragePrices = [];

	await Promise.all([
		// someCurrencyBack(currency, markets[1], period).then(res => {
		// 	coinmarketcapData = res;
		// 	if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
		// 		marketsAveragePrices.push(Number(res.averagePrice));
		// 	}
		// }),
		someCurrencyBack(currency, markets[1], period).then(res => {
			coinpaprikaData = res;
			if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
				marketsAveragePrices.push(Number(res.averagePrice));
			}
		}),
		someCurrencyBack(currency, markets[2], period).then(res => {
			coinstatsData = res;
			if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
				marketsAveragePrices.push(Number(res.averagePrice));
			}
		}),
		someCurrencyBack(currency, markets[0], period).then(res => {
			coinbaseData = res;
			if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
				marketsAveragePrices.push(Number(res.averagePrice));
			}
		}),
		someCurrencyBack(currency, markets[3], period).then(res => {
			kucoinData = res;
			if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
				marketsAveragePrices.push(Number(res.averagePrice));
			}
		})]);


  
	let average = 0;
	try {

		marketsAveragePrices.forEach(element => {
			average += element;
		});
		average = average/marketsAveragePrices.length;

	}  catch(e) {
		console.log(e);
	}

	// coinmarketcap: coinmarketcapData.averagePrice,0
    
	const res = { symbol: currency, 
		marketsAverage: {

			coinpaprika: coinpaprikaData.averagePrice,
			coinstats: coinstatsData.averagePrice,
			coinbase: coinbaseData.averagePrice,
			kucoin: kucoinData.averagePrice
		},
		totalAverage: average
	};
	return res;

}




async function foo() {
  
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { workerData, parentPort } = require("worker_threads");

	let res;
	new Promise((resolve) => resolve(someCurrencyAverage(workerData[0], workerData[1]))).then(result => {
		res = (result);
		parentPort.postMessage(res);
		connection.end();
	});
}

foo();

