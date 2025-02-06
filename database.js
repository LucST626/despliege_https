const messages = [];

const getMessages = () => {
  return messages;
};

const addMessage = (message) => {
  messages.push(message);
};

module.exports = {
  getMessages,
  addMessage,
};