import TelegramBot from 'node-telegram-bot-api';
import requsteForecast from './weather'
import dotenv from 'dotenv'
import 'dotenv/config'
dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN
const OPEN_WEATHER_API_TOKEN = process.env.OPEN_WEATHER_API_TOKEN

if ((BOT_TOKEN !== undefined) && (OPEN_WEATHER_API_TOKEN !== undefined)) {
  try {

    const bot: TelegramBot = new TelegramBot(BOT_TOKEN , {polling: true})

    
    
    const start = new RegExp('start')
    bot.onText(start, async (msg) => {
      bot.sendMessage(msg.chat.id, 'Добро пожаловать', {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          keyboard: [
            [{text:'Прогноз погоды Кривой Рог'}],
            [{text:'Курс Валют'}],        
          ]
        }})
    
      });
      const menu = new RegExp('Предыдущее меню')
      bot.onText(menu, async (msg) => {
        bot.sendMessage(msg.chat.id, '', {
          reply_to_message_id: msg.message_id,
          reply_markup: {
            keyboard: [
              [{text:'Прогноз погоды Кривой Рог'}],
              [{text:'Курс Валют'}],        
            ]
          }})
      
        });
    
      const forecast = new RegExp('Прогноз погоды')
      bot.onText(forecast, async (msg) => {
        return await bot.sendMessage(msg.chat.id, 'Прогноз погоды', {
          reply_to_message_id: msg.message_id,
          reply_markup: {
            keyboard: [
              [{text:'C интервалом 3 часа'}],
              [{text:'C интервалом 6 часа'}],
              [{text:'Предыдущее меню'}]
            ]
              
          }})
      
        });

        const forecastInterval3 = new RegExp('C интервалом 3 часа')
        bot.onText(forecastInterval3, async (msg) => {
          const resp:string = await requsteForecast(3, OPEN_WEATHER_API_TOKEN)


          return await bot.sendMessage(msg.chat.id, resp, {
            reply_to_message_id: msg.message_id,
            reply_markup: {
              keyboard: [
                [{text:'Прогноз погоды Кривой Рог'}],
                [{text:'Курс Валют'}]                
              ]
            }})
        
          });

          const forecastInterval6 = new RegExp('C интервалом 6 часа')
          bot.onText(forecastInterval6, async (msg) => {
            const resp:string = await requsteForecast(6, OPEN_WEATHER_API_TOKEN)
  
  
            return await bot.sendMessage(msg.chat.id, resp, {
              reply_to_message_id: msg.message_id,
              reply_markup: {
                keyboard: [
                  [{text:'Прогноз погоды Кривой Рог'}],
                  [{text:'Курс Валют'}]                
                ]
              }})
          
            });
    
    
    





      }

  catch(e){
    console.log(e)
  }
}