const BootBot = require('bootbot');
const config = require('config');

var port = process.env.PORT || config.get('PORT');

const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('ahoj123'),
  appSecret: config.get('APP_SECRET')
});

bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	console.log(`The user said: ${text}`);
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
  chat.say('Hi I am chatbot which shows you some stats of NHL teams or players.');
  
});

bot.hear(['stat', 'stats', "info"], (payload, chat) => {
  chat.say({
    text: 'What stats do you want to show?',
    buttons: [
      { type: 'postback', title: 'Show teams stats', payload: 'TEAMS_STATS' },
      { type: 'postback', title: 'Show players stats', payload: 'PLAYER_STAT' }
    ]
  });
});

//THIS should remember what was chosen and show some table with teams or players... and then user can click on player (for example) and chatbot shows a stats of him


bot.start(port);