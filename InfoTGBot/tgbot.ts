import TelegramBot from 'node-telegram-bot-api';
import requsteForecast from './weather'
import {privateBank}  from './exchangeRate'
import {monoBank} from './exchangeRate'
import dotenv from 'dotenv'
import 'dotenv/config'
dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN
const OPEN_WEATHER_API_TOKEN = process.env.OPEN_WEATHER_API_TOKEN

if ((BOT_TOKEN !== undefined) && (OPEN_WEATHER_API_TOKEN !== undefined)) {
  try {

    const bot: TelegramBot = new TelegramBot(BOT_TOKEN , {polling: true})

    
    const start = /start/
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


      const info = /info/
      bot.onText(info, async (msg) => {
        bot.sendMessage(msg.chat.id, 'Этот бот может рассказать вам прогноз погоды и курс обмена валют', {
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
        bot.sendMessage(msg.chat.id, 'Выберите, что вы хотиту узнать', {
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
        return await bot.sendMessage(msg.chat.id, 'Выберите интервал', {
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

            


          const currencies = new RegExp('Курс Валют')
          bot.onText(currencies, async (msg) => {
            bot.sendMessage(msg.chat.id, 'Выберите валюту', {
              reply_to_message_id: msg.message_id,
                reply_markup: {
                  keyboard: [
                    [{text:'USD'}, {text:'EUR'}],
                    [{text:'Предыдущее меню'}]
                  ]
                }
            })
            
          }
        );




        const exchangeRateUSD = new RegExp('USD')
        bot.onText(exchangeRateUSD, async (msg) => {
          const privateBankRateArray:string[] = await privateBank()
          const monoBankRatesArray:string[] = await monoBank()
          const answerText = ['Приват Банк: ', privateBankRateArray[0], 'МоноБанк:', monoBankRatesArray [0]].join(" ")



          return await bot.sendMessage(msg.chat.id, answerText, {
            reply_to_message_id: msg.message_id,
            reply_markup: {
              keyboard: [
                [{text:'Прогноз погоды Кривой Рог'}],
                [{text:'Курс Валют'}]                
              ]
            }})
        
          });


          const exchangeRateEUR = new RegExp('EUR')
          bot.onText(exchangeRateEUR, async (msg) => {
            const privateBankRateArray:string[] = await privateBank()
            const monoBankRatesArray:string[] = await monoBank()
            const answerText = ['Приват Банк: ', privateBankRateArray[1], 'МоноБанк:', monoBankRatesArray [1]].join(" ")


          return await bot.sendMessage(msg.chat.id, answerText, {
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