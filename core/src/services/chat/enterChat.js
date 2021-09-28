const socket = require('../../utils/socket/socketEngine');

async function enterChat({ user, chatId }, { session } = {}) {
    socket.addName(user.token);
    socket.joinRoom(chatId)
}

exports.enterChat = enterChat;

