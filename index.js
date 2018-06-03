'use strict'

const logger = require('winston')
const mtg = require('mtgsdk')

// creates a bot server with a single bot
const botFramework = require('watsonworkspace-bot')
botFramework.level('verbose')

botFramework.startServer()

const bot = botFramework.create() // bot settings defined by process.env


const UI = require('watsonworkspace-sdk').UI

// slash commands or action fulfillment
bot.on(`actionSelected`, (message, annotation, params) => {
  // get the original message that created this actionSelected annotation
  const referralMessageId = annotation.referralMessageId
  const userId = message.userId
  const actionId = annotation.actionId

  logger.info(`${actionId} selected from message ${referralMessageId} by user ${userId}`)
  logger.debug(message)
  logger.debug(annotation)
})
bot.authenticate()


// handle the message-created webhook
bot.on('message-created', (message, annotation) => {
  if (message.content.match(/\[.*?\]/g)) {
    let cardNames = message.content.match(/\[.*?\]/g).map(str => str.substring(1, str.length-1));
    console.log(`yo ${cardNames}`);
    cardNames.forEach(cardName => {
      mtg.card.where({ name: cardName })
        .then(cards => {
            console.log(cards[0]);
            const card = cards[0];
            let result = (`${card.name}\n${card.manaCost}\n${card.type}\n${card.text}\n`);
            if(card.power && card.toughness) {
              result = result.concat(`${card.power}/${card.toughness}`);
            } else if (card.loyalty) {
              result = result.concat(card.loyalty);
            }
            bot.sendMessage(message.spaceId, result)
          }
        ).catch(err => console.log(err));
      })
  }
})
