import axios from "axios";
import TelegramBot from 'node-telegram-bot-api';

// replace the value below with the Telegram token you receive from @BotFather
const token = 'your_telegram_bot_token';

// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, {polling: true});


const regExpPhoto = new RegExp('photo');
bot.onText(regExpPhoto, async (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;

  axios({
    method: 'get',
    url: 'https://picsum.photos/200/300',
    responseType: 'stream'
  })
    .then(function (response) {
      bot.sendPhoto(chatId, response.data)
    })
  });


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("Пользователь", msg.from?.first_name, msg.from?.last_name, 'отправил сообщение:', msg.text)

    bot.sendMessage(chatId, `Эхо: ${msg.text} ${(msg.text)?.at(0)}...`);
  });

