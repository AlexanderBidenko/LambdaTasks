import mysql = require("mysql2");
import dotenv = require("dotenv")
import "dotenv/config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("worker_threads").threadId;
dotenv.config({path: ".."});

// console.log(Date.now());
export class currenciesAverage {
	date = Date.now();


	connection = mysql.createConnection({
		uri: process.env.connectionURI,
		user: process.env.connectionUser,
		database: process.env.connectionDB,
		password: process.env.connectionPassword,
		connectTimeout: 100000000
	});
    
	// обращение к базе данных для получения средних значений
	public async someCurrencyAverage(currency: string, period:number) {
		let res;
		if (currency === "AllValues") {
			await new Promise((resolve) => {
				this.connection.query(`SELECT * FROM averageValues${period} ORDER BY time DESC LIMIT 25`,
					function(err, results) {
						if (err) {
							console.log(err);
						}
						resolve(results);
					});
			}).then((results) =>  {
				res = results;
			}).finally(() => this.connection.end());
      
		} else {
			await new Promise((resolve) => {
  
				this.connection.query(`SELECT * FROM averageValues${period} WHERE symbol = '${currency}' ORDER BY time DESC LIMIT 1`,
					function(err, results) {
						if (err) {
							console.log(err);
						}
						resolve(results);
					});
			}).then((results) =>  {
				res = results;
			}
			).finally(() => this.connection.end());
		}

		res = res.sort((a, b) => { 
			if (Number(a.position) > Number(b.position)) {
				return 1;
			} else return -1;
		});

		return res;
	}


}