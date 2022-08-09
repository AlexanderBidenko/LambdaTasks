// чайлд воркер от воркера
// const { workerData, parentPort } = require('worker_threads')


// const mysql = require("mysql2");
// const dotenv = require('dotenv')
// dotenv.config()
         
// const date = Date.now()


// const connection = mysql.createConnection({
//   host: process.env.connectionHost,
//   user: process.env.connectionUser,
//   database: process.env.connectionDB,
//   password: process.env.connectionPassword
// });

// async function someCurrencyBack(currency, Market, period) {
//   let res;
//   await new Promise((resolve) => {

//     connection.query(`SELECT * FROM ${Market} WHERE time > ${(Number(date) - (period*60000))} AND symbol = '${currency}'`,
//           function(err, results, fields) {
//             if (err) {
//               console.log(err);
//             }
//     res = results
//     resolve(res)
//     });
//   })
//   try {

//     let sumOfPricesAtSomeMarket = 0;

//     res.forEach(element => {
//       if ((element.price)  && (!isNaN(element.price))) {
//         sumOfPricesAtSomeMarket += Number(element.price)
//       }

//     });
//     res = {period: period, symbol: currency, averagePrice: (sumOfPricesAtSomeMarket/res.length)}
//   } catch (e) {

//     console.log(e);
//   }
//   // console.log(res)
//   return res;  
//   }




// let res;

// new Promise((resolve) => resolve(someCurrencyBack(workerData[0], workerData[1], workerData[2]))).then(result => {
//   res = (result)
//   parentPort.postMessage(res)
//   connection.end()
// })