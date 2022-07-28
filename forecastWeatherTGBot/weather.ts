import axios from "axios";
import os from 'node:os'


async function requsteForecast(perHour:number, appid:string, lat=47.9, lon=33.38,  lang='ru'): Promise<string> {
    let valuesNow = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&lang=${lang}&units=metric`)
    let values = valuesNow.data.list
    let res: string[] = []
    if (perHour === 3) {
    for (let i = 0; i < values.length; i++){        
        let elem = values[i]


        let parsedDt = (elem.dt_txt).split(' ')
        parsedDt[0] = (parsedDt[0]).split('-')
        parsedDt[0] =  `${os.EOL} ${((new Date(parsedDt[0])).toLocaleString('ru-RU', {weekday: "long",  day: "2-digit", month: "long"}))} ${os.EOL}`
        parsedDt[1] = parsedDt[1].slice(0,5)
        let weather:string = `    ${parsedDt[1]}      ${(elem.weather[0]).description}, ${Math.round(elem.main.temp)} °С, ощущается: ${Math.round(elem.main.feels_like)} °С ${os.EOL}`;
        if (res.includes(parsedDt[0])) {
            res.push(weather)
        } else {
            res.push(parsedDt[0])
            res.push(weather)
        }
    }
    }


    if (perHour === 6) {
        for (let i = 0; i < values.length; i++){        
        let elem = values[i]

        
        let parsedDt = (elem.dt_txt).split(' ')
        if ((i % 2) === 0) {
            parsedDt[0] = (parsedDt[0]).split('-')
            parsedDt[0] =  `${os.EOL} ${((new Date(parsedDt[0])).toLocaleString('ru-RU', {weekday: "long",  day: "2-digit", month: "long"}))} ${os.EOL}`
            parsedDt[1] = parsedDt[1].slice(0,5)
            let weather:string = `    ${parsedDt[1]}      ${(elem.weather[0]).description}, ${Math.round(elem.main.temp)} °С, ощущается: ${Math.round(elem.main.feels_like)} °С ${os.EOL}`;
            if (res.includes(parsedDt[0])) {
                res.push(weather)
            } else {
                res.push(parsedDt[0])
                res.push(weather)
            }
        }
    }
    }
    // console.log(res.join(' '))
    return (res.join(' '))
}

export default requsteForecast