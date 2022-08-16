import mysql = require("mysql2");
import dotenv = require("dotenv")
import "dotenv/config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("worker_threads").threadId;
dotenv.config({path: ".."});


export class currenciesAverage {
	date = Date.now();


	connection = mysql.createConnection({
		uri: process.env.connectionURI,
		user: process.env.connectionUser,
		database: process.env.connectionDB,
		password: process.env.connectionPassword,
		connectTimeout: 1000000
	});
    
	// обращение к базе данных для получения средних значений
	public async someCurrencyAverage(currency: string, period:number) {
		let res;
		if (currency === "AllValues") {
			await new Promise((resolve) => {
				this.connection.query(`SELECT * FROM averageValues${period} WHERE time > ${(Number(this.date) - (5*60000))}`,
					function(err, results) {
						if (err) {
							console.log(err);
						}
						resolve(results);
					});
			}).then((results) =>  {
				res = results;
			});
      
		} else {
			await new Promise((resolve) => {
  
				this.connection.query(`SELECT * FROM averageValues${period} WHERE time > ${(Number(this.date) - (5*60000))} AND symbol = '${currency}'`,
					function(err, results) {
						if (err) {
							console.log(err);
						}
						resolve(results);
					});
			}).then((results) =>  {
				res = results;
			}
			);
		}


		return res;
	}

}