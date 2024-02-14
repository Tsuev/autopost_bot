const cron = require('node-cron')
const Telegram = require('node-telegram-bot-api')
const generationPost = require('./plugins/postGeneration');

const { API_KEY, ADMINID, CHANNELID } = require('./constants/constants')

const bot = new Telegram(API_KEY, { polling: true });

let post;
const avatar = './assets/avatar.png'
const keybord = {
  inline_keyboard: [
    [
      {text: "✅", callback_data: "✅"},
      {text: "🔁",callback_data: "🔁"},
      {text: "⛔",callback_data: "⛔"},
    ]
  ]
}

cron.schedule(
  '0 0 16 * * *', 
  () => {
    Promise.resolve()
    .then(() => generationPost().then(res => post = res))
    .then(() => {
      bot.sendPhoto(ADMINID, avatar, {
        caption: post,
        reply_markup: keybord,
        parse_mode: "HTML"
      })  
    })
  }, 
  {
    timezone: "Europe/Moscow"
  }
)

bot.on("polling_error", err => console.log(err.data.error.message));

bot.on('callback_query', async query => {
  try {
    if(query.data === '✅') await bot.sendPhoto(CHANNELID, avatar, { caption: post, parse_mode: "HTML" })
    if(query.data === '🔁') await bot.sendPhoto(ADMINID, avatar, { caption: await generationPost(), reply_markup: keybord, parse_mode: "HTML" })
  
    await bot.deleteMessage(query.message.chat.id ,query.message.message_id)
      
  } catch (error) {
    console.log('callback_query', error);  
  }
  console.log(query.data, post);
  
})

bot.on('text', async msg => {
  msg.from.id !== ADMIN && await bot.sendMessage(msg.from.id, `⚠️ У вас нет прав доступа, обратитесь админу канала\n\nhttps://t.me/aboutfrontend`);
})

