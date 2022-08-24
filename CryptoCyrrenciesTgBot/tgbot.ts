import TelegramBot = require('node-telegram-bot-api');
import os from 'node:os'
import { hypeCurrency, hypeCurrencys, favouriteCurrencys } from './src/actionsWithCryptoRestAPI';
import { actionsWithDb } from "./src/actionsWithDb";

import dotenv from 'dotenv'
import 'dotenv/config'

dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN


async function cryptobot() {

  if (BOT_TOKEN) {

      const bot = new TelegramBot(BOT_TOKEN , {polling: true})
      let answer: any[] = await hypeCurrencys();
      let hypeCurrenciesList = answer[2];
      bot.setMyCommands(answer[0])

      
      const start = /start/
      bot.onText(start, async (msg) => {


        return await bot.sendMessage(msg.chat.id, `Добро пожаловать, тут можно узнать средние цены самых хайповых криптовалют.`, {
          reply_to_message_id: msg.message_id,
          reply_markup: {
            keyboard: [
              [{text:'Хайповые криптовалюты'}],
              [{text:'Избранные'}]
              ]
            }})
      
        });
        
        const help = /help/
        bot.onText(help, async (msg) => {
        return await bot.sendMessage(msg.chat.id, `
/start 
/listRecent - получить небольшой (20-50 айтемов) список "хайповой" крипты. (валюта/ среднее скользящее за последние пол часа)
/(currency_symbol) - получить подробную информацию о криптовалюте (валюта/ период)
/addToFavourite (currency_symbol) - добавляет крипту в раздел "избранное"
/listFavourite - получить список избранной крипты. (валюта/ среднее скользящее за последние пол часа)
/deleteFavourite (currency_symbol) - удаляет крипту из избранного`, {
            reply_to_message_id: msg.message_id,
            reply_markup: {
              keyboard: [
                [{text:'Хайповые криптовалюты'}],
                [{text:'Избранные'}]
              ]
            }})
        
          });


          const followingCommand = new RegExp('(Избранные|/listFavourite)')
          bot.onText(followingCommand, async (msg: { chat: { id: any; }; message_id: any; }) => {
          let followingCurrencys = await (new actionsWithDb().selectCurrencys(msg.chat.id))
          if(followingCurrencys.length != 0) {
            let followingCurrencysArray: string[] = [];
            try {
              followingCurrencys.forEach((elem) => {
                followingCurrencysArray.push(elem?.currency);
              })
  
            } catch(e) {
              console.log(e)
            }
            const answer:string = await favouriteCurrencys(followingCurrencysArray)

            return await bot.sendMessage(msg.chat.id, answer, {
            reply_to_message_id: msg.message_id,
            reply_markup: {
              keyboard: [
                [{text:'Хайповые криптовалюты'}],
                [{text:'Избранные'}]
              ]
            }})
  
            
          } else {
            return await bot.sendMessage(msg.chat.id, "У Вас ещё нет избранных криптовалют", {
              reply_to_message_id: msg.message_id,
              reply_markup: {
                keyboard: [
                  [{text:'Хайповые криптовалюты'}],
                  [{text:'Избранные'}]
                ]
              }})
          }

          });

        const forecast = new RegExp('(Хайповые криптовалюты|/listRecent)')
        bot.onText(forecast, async (msg: { chat: { id: any; }; message_id: any; }) => {

          return await bot.sendMessage(msg.chat.id, (`Средние цены самой хайповой крипты за последние пол часа ${os.EOL}` + hypeCurrenciesList), {
            reply_to_message_id: msg.message_id,
            reply_markup: {
              keyboard: [
                [{text:'Хайповые криптовалюты'}],
                [{text:'Избранные'}]
              ],
            }})        
          });


      const currency = new RegExp(answer[1])
      bot.onText(currency, async (msg) => {

        if (msg.text) {
          const selectedCurrancy = await hypeCurrency((msg.text).slice(1,))
          await bot.sendMessage(msg.chat.id, selectedCurrancy, {
            reply_to_message_id: msg.message_id,
            reply_markup: {inline_keyboard: 
              [
                [
                  {text: 'Add to following', callback_data: `Add ${(msg.text).slice(1,)}`},
                  {text: 'Remove from following', callback_data: `Remove ${(msg.text).slice(1,)}`}
                ]
              ]
            }

          })
        }

        });
      


        const addToFavourite = /addToFavourite/
        bot.onText(addToFavourite, async (msg) => {
          console.log(msg)
          if (msg.text && msg.from) {
          let append = await (new actionsWithDb().insertCurrency(msg.from.id, (((msg.text).split(" "))[1])));

          if (!append) {
              await bot.sendMessage(msg.chat.id, "Валюта уже находится в избраном");
            } else {
              await bot.sendMessage(msg.chat.id, "Валюта добавленна в избранное");
            }        
          }
        });
// /deleteFavourite 

        const deleteFavourite = /deleteFavourite/
        bot.onText(deleteFavourite, async (msg) => {
          console.log(msg)
          if (msg.text && msg.from) {

          let remove = await (new actionsWithDb().removeCurrency(msg.from.id, (((msg.text).split(" "))[1])));

          if (remove) {
              await bot.sendMessage(msg.chat.id, "Валюта удалена из избранного");
            } else {
              return undefined;
            }
          }
        });

        bot.on('callback_query', async (msg) => {
          
          if (((msg.data)?.slice(0,3) === "Add") && (msg.message?.chat.id)) {


            let append = await (new actionsWithDb().insertCurrency(msg.from.id, (((msg.data).split(" "))[1])));

            if (!append) {
                await bot.sendMessage(msg.message?.chat.id, "Валюта уже находится в избраном");
              } else {
                await bot.sendMessage(msg.message?.chat.id, "Валюта добавленна в избранное");
              }
            } else if (((msg.data)?.slice(0,6) === "Remove") && (msg.message?.chat.id)) {


              let remove = await (new actionsWithDb().removeCurrency(msg.from.id, (((msg.data).split(" "))[1])));

              if (remove) {
                  await bot.sendMessage(msg.message?.chat.id, "Валюта удалена из избранного");
                } else {
                  return undefined;
                }
              }

          })

        }
          

  

  }
      
cryptobot();

