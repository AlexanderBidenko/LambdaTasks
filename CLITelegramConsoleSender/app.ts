#!/usr/bin/env bash

// For invoke help run "ts-node app -h"
process.env["NTBA_FIX_319"];

import { program } from "commander";
import { Argument } from "commander";
import TelegramBot from "node-telegram-bot-api";

const fs = require('node:fs');


// for first running you must to change values of token an chatId
const token: string = 'your_telegram_bot_token';
const chatId: number = 123456789
const bot: TelegramBot = new TelegramBot(token);


program
  .command('m <string>')
  .description(`After m flag write message. For exemple:
>>> ts-node app m "Hello world!"`)
  .addArgument(new Argument('[message]'))
  .action((message: string) => {
    bot.sendMessage(chatId, message)
  })

program
  .command('p <string>')
  .description(`Drag and drop the file to the console after the p flag. If the path contains spaces, remove the ampersand. For exemple:
>>> ts-node app p "user'sfiles/foldername/pickers.png"
`)
  .addArgument(new Argument('[path]'))
  .action((path: string) => {
    const stream = fs.createReadStream(`${path}`)
    bot.sendPhoto(chatId, stream)
  });



program.parse(process.argv)


