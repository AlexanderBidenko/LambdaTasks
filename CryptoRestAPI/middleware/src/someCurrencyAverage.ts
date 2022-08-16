// воркер вызывающий воркеров (не эффективно, больше время обработки)
// async function  workerSomeCurrencyBack(symbol, market, period) {
//   const { Worker } = require('worker_threads');
//   const worker = new Worker('./someCurrencyBack.ts', {
//       workerData: [symbol, market, period]
//     })
//     worker 
//     let res;
//     await  new Promise((resolve)=>{

//         worker.on('message', msg => {
             
//             resolve(msg)});
    
//     }).then(result => {
//       res = result;
//       // console.log(result)
//     })
//     return res;
//   }


// async function someCurrencyAverage(currency, period) {
//   let markets = ['coinbase', 'coinmarketcap', 'coinpaprika', 'coinstats', 'kucoin']

//   let coinmarketcapData;
//   let coinpaprikaData;
//   let coinstatsData;
//   let coinbaseData;
//   let kucoinData;

//   let marketsAveragePrices = []

//   await Promise.all([
//     workerSomeCurrencyBack(currency, markets[1], period).then(res => {
//         coinmarketcapData = res;
//         if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
//             marketsAveragePrices.push(Number(res.averagePrice))
//         }
//       }),
//       workerSomeCurrencyBack(currency, markets[2], period).then(res => {
//       coinpaprikaData = res
//       if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
//         marketsAveragePrices.push(Number(res.averagePrice))
//     }
//   }),
//   workerSomeCurrencyBack(currency, markets[3], period).then(res => {
//       coinstatsData = res
//       if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
//         marketsAveragePrices.push(Number(res.averagePrice))
//     }
//   }),
//   workerSomeCurrencyBack(currency, markets[0], period).then(res => {
//       coinbaseData = res
//       if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
//         marketsAveragePrices.push(Number(res.averagePrice))
//     }
//   }),
//   workerSomeCurrencyBack(currency, markets[4], period).then(res => {
//       kucoinData = res
//       if ((res.averagePrice)  && (!isNaN(res.averagePrice))) {
//         marketsAveragePrices.push(Number(res.averagePrice))
//     }
//   })])


  
//   let average = 0;
//   try {

//     marketsAveragePrices.forEach(element => {
//         average += element;
//     })
//     average = average/marketsAveragePrices.length

//     }  catch(e) {

//     }

//   let res =  {
//     symbol: currency, 
//     average: average
//   }
  

//   return res;

//     }



// async function ret() {
//   const { workerData, parentPort } = require('worker_threads')
//   require('worker_threads').threadId  
  
//   // console.log('workerData', workerData[0],workerData[1])
//   new Promise((resolve) => resolve(someCurrencyAverage(workerData[0], workerData[1]))).then(result => {
//   res = (result)
//   parentPort.postMessage(res)
//   })

// }
// ret()
