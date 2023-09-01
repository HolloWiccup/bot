// const TelegramBot = require('node-telegram-bot-api');

// // Ваш токен бота
// const TOKEN = '6545611484:AAFZA1Rgp6SPSouzYBdgD8b54Zsm2kjHPs0';

// const MY_ID = 819208805;
// const ARTEM_ID = 992108033;

// const MESSAGE = 'Вашим вопросом уже занимаются'

// // Создайте экземпляр бота
// const bot = new TelegramBot(TOKEN, { polling: true });

// // Обработчик сообщений
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const groupId = msg.message_thread_id;
//   const user = msg.from.first_name;
//   const messageText = msg.text.toLowerCase();

//   // Фраза, на которую бот будет реагировать
//   if (messageText.toLocaleLowerCase().includes('вопрос знатокам')) {
//     const messageId = msg.message_id

//     const user = msg.from.username

//     const messageLink = `https://t.me/c/${chatId}/${messageId}`;
//     // bot.sendMessage(chatId,message , { message_thread_id: groupId });

//     // bot.forwardMessage(chatId, chatId, messageId);
//     // bot.forwardMessage(MY_ID, chatId, messageId);
//     // bot.copyMessage(chatId, chatId, messageId, { parse_mode: 'Markdown' });

//     // bot.sendMessage(chatId,originalMessageLink , { message_thread_id: groupId });
//     // bot.sendMessage(MY_ID, `Перейти к [оригинальному сообщению](${messageLink})`);
//     // bot.sendMessage(ARTEM_ID, message);

//     constbot.getMessageLink(chatId, messageId)

//     console.log(messageLink)
//   }
// });

// // {message_thread_id: groupId}

const TelegramBot = require('node-telegram-bot-api');

// Ваш токен бота
const TOKEN = '6545611484:AAFZA1Rgp6SPSouzYBdgD8b54Zsm2kjHPs0';
const MESSAGE_FOR_USER = 'Вашим вопросом уже занимаются';

const MY_ID = 819208805;
const ARTEM_ID = 992108033;

// Создайте экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Обработчик сообщений
bot.on('message', (msg) => {
  const messageText = msg.text.toLowerCase();

  // Фраза, на которую бот будет реагировать
  if (messageText.toLocaleLowerCase().includes('вопрос знатокам')) {
    // const chatId = msg.chat.id;
    const chatId = msg.chat.id.toString().slice(4);
    const threadId = msg.message_thread_id;
    const theme = msg.reply_to_message.forum_topic_created.name;
    const user = msg.from.username
    const messageId = msg.message_id
    
    const messageLink = `https://t.me/c/${chatId}/${threadId}/${messageId}`
    const message = `${user} нуждается в помощи, в теме ${theme} ${messageLink}`;
    const second_message = `Поставленный вопрос: ${messageText.toLocaleLowerCase().split('вопрос знатокам')[1].trim()}`
    

    bot.sendMessage(chatId,MESSAGE_FOR_USER, { message_thread_id: threadId });
    bot.sendMessage(MY_ID, `${message}\n${second_message}`);
    bot.sendMessage(ARTEM_ID, `${message}\n${second_message}`);


  }
});

// {message_thread_id: groupId}
