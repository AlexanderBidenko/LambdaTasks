import axios from "axios";

export class marketsEndpoints {

	public async redirecting(marketName: string) {
		marketName = marketName.toUpperCase();
		console.log(marketName);
		switch (marketName) {
		case "COINMARKETCAP": {
			let valuesCoinMarketCapNow;
			try {
				valuesCoinMarketCapNow = await axios.get(`https://coinmarketcap-cc.p.rapidapi.com/listings/latest/25?api_key=${process.env.CoinMarketApiKey}`, {
					headers: {
						"X-RapidAPI-Key": "6f3cd52fe6msh60debab6a1e522dp111039jsn8bc4b01de87f",
						"X-RapidAPI-Host": "coinmarketcap-cc.p.rapidapi.com",
						"useQueryString": true
					}
				});

			} catch(e) {
				console.log(e);
			}

			return valuesCoinMarketCapNow.data;
		}
		case "COINBASE": {
			let valuesCoinBaseNow;
			try {
				valuesCoinBaseNow  = await axios.get("https://api.coinbase.com/v2/prices/USD/spot");
			} catch(e) {
				console.log(e);
			}
			return valuesCoinBaseNow.data;
		}
		case "COINSTATS": {
			const valuesCoinStatsNow = await axios.get("https://api.coinstats.app/public/v1/coins?currency=USD%0A");
			return valuesCoinStatsNow.data;
		}
		case "KUCOIN": {
			let valuesKuCoinNow;
			try {
				valuesKuCoinNow = await axios.get("https://api.kucoin.com/api/v1/prices");
			} catch(e) {
				console.log(e);
			}
			return valuesKuCoinNow.data;
		}
		case "COINPAPRIKA": {
			let valuesCoinPapricaNow;
			try {
				valuesCoinPapricaNow = await axios.get("https://api.coinpaprika.com/v1/tickers");

			} catch(e) {
				console.log(e);
			}

			return valuesCoinPapricaNow.data;
		}
		}
	}
}
