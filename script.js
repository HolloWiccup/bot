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
    const chatIdUsers = msg.chat.id;
    const chatId = msg.chat.id.toString().slice(4);
    const threadId = msg.message_thread_id;
    const theme = msg.reply_to_message.forum_topic_created.name;
    const user = msg.from.username
    const messageId = msg.message_id
    
    const messageLink = `https://t.me/c/${chatId}/${threadId}/${messageId}`
    const message = `${user} нуждается в помощи, в теме ${theme} ${messageLink}`;
    const second_message = `Поставленный вопрос: ${messageText.toLocaleLowerCase().split('вопрос знатокам')[1].trim()}`
    

    bot.sendMessage(chatIdUsers,MESSAGE_FOR_USER, { message_thread_id: threadId });
    bot.sendMessage(MY_ID, `${message}\n${second_message}`);
    bot.sendMessage(ARTEM_ID, `${message}\n${second_message}`);


  }
});

// {message_thread_id: groupId}
