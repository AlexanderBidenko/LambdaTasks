import TelegramBot from 'node-telegram-bot-api';
import requsteForecast from './weather'
import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN
const OPEN_WEATHER_API_TOKEN = process.env.OPEN_WEATHER_API_TOKEN

if ((BOT_TOKEN !== undefined) && (OPEN_WEATHER_API_TOKEN !== undefined)) {
  try {

    const bot: TelegramBot = new TelegramBot(BOT_TOKEN , {polling: true})


    bot.setMyCommands(
      [
      {command: '/start', description: "Погода в Кривом Роге"},
      {command: '/weather3', description: "Погода с интервалом 3 часа"},
      {command: '/weather6', description: "Погода с интервалом 6 часа"}
      ]
    )
    
    
    
    bot.onText(/start/, async(msg) => {
    
      // console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'отправил сообщение:', msg.text)
      const chatId = msg.chat.id;
    
      const resp = 'Прогноз погоды'
    
      return await bot.sendMessage(chatId, resp, {reply_markup: {inline_keyboard: 
        [
          [
            {text: 'weather3', callback_data: `weather3`},
            {text: 'weather6', callback_data: `weather6`},
          ]
        ]
      }})
    })

    bot.on('callback_query', async (msg) => {
      // console.log(msg)
      if (msg.data === 'weather3') {
        // console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'погоду с интервалом 3 часа')
        const resp:string = await requsteForecast(3, OPEN_WEATHER_API_TOKEN)
        return (await bot.sendMessage(msg.from.id, resp));
      }
  
    if (msg.data === 'weather6') {
      // console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'погоду с интервалом 6 часов')
    const resp:string = await requsteForecast(6, OPEN_WEATHER_API_TOKEN)
    return (await bot.sendMessage(msg.from.id, resp));
      }  
    
      })  

const weather3 = new RegExp('weather3')
bot.onText(weather3, async(msg) => {
  console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'отправил сообщение:', msg.text)
  const chatId = msg.chat.id;
  const resp:string = await requsteForecast(3, OPEN_WEATHER_API_TOKEN)


  return await bot.sendMessage(chatId, resp);
});


const weather6 = new RegExp('weather6')
bot.onText(weather6, async(msg) => {
  console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'отправил сообщение:', msg.text)
  const chatId = msg.chat.id;
  const resp:string = await requsteForecast(6, OPEN_WEATHER_API_TOKEN)


  return await bot.sendMessage(chatId, resp);
});


  }

  catch(e){
    console.log(e)
  }
}