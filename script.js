const TelegramBot = require('node-telegram-bot-api');

// Ваш токен бота
// const TOKEN = '6205695064:AAFj3u_lJdHsWC3cW7tl9z9JlzcxCcpS-b4';
const TOKEN = '6545611484:AAFZA1Rgp6SPSouzYBdgD8b54Zsm2kjHPs0';
const MESSAGE_FOR_USER = 'Вашим вопросом уже занимаются';

const INTRO_PHRASE = 'вопрос знатокам';

const SELECT = ' ✅';

const MY_ID = 819208805;
const ARTEM_ID = 992108033;
const CHANNEL_ID = -905881279;

const regex = /в[ао]*пр[о]*[сш]\s*м[е]*нт[о]*р[уам ]*/ig;

const button1 = {
  text: 'Взял',
  callback_data: 'button1',
};
const button2 = {
  text: 'Решил',
  callback_data: 'button2',
};

const buttons = [button1, button2];

const keyboard = {
  inline_keyboard: [buttons],
};
// Создайте экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Обработчик сообщений
bot.on('message', (msg) => {
  if (msg.chat.id === CHANNEL_ID) return;

  const messageText = msg.text;

  if (!regex.test(messageText)) return;

  const id = msg.chat.id.toString();
  const isForum = Boolean(msg.chat?.is_forum);

  const chatId = id.includes('-100') ? id.slice(4) : id;

  const user = msg.from.username;
  const messageId = msg.message_id;

  let message = `${user} нуждается в помощи`;
  let messageLink = `https://t.me/c/${chatId}/`;
  let threadId = null;

  if (isForum) {
    threadId = msg.message_thread_id;
    messageLink += `${threadId}/`;
  }

  messageLink += messageId

  message += ` ${messageLink}`;
  const second_message = `Поставленный вопрос: ${messageText.replace(regex, '')}`;

  sendToChannel(`${message}\n${second_message}`);
  bot.sendMessage(id, MESSAGE_FOR_USER, { message_thread_id: threadId })
});

async function sendToChannel(message) {
  const result = await bot.sendMessage(CHANNEL_ID, message, {
    reply_markup: keyboard,
  });
  return result;
}

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;

  const chatId = message.chat.id;
  const data = callbackQuery.data;
  const newKeyboard = createNewButtons(data);
  // const postscript = getAssistantName(message.text, callbackQuery);

  bot.editMessageText(message.text, {
    chat_id: chatId,
    message_id: message.message_id,
    reply_markup: newKeyboard,
  });
});

const createNewButtons = (callback_data) => {
  const newButtons = buttons.map((button) =>
    button.callback_data === callback_data
      ? { ...button, text: button.text + SELECT }
      : { ...button }
  );
  return {
    inline_keyboard: [newButtons],
  };
};

// const getAssistantName = (message, callback_data) => {

//   const data = callback_data.data;
//   const user = callback_data.from.username;

//   const action = buttons.find((btn) => btn.callback_data === data).text;
//   return `\n@${user} ${action}`;
// };
