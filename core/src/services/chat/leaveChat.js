const socket = require('../../utils/socket/socketEngine');

async function leaveChat({ chatId }, { session } = {}) {
    socket.leaveRoom(chatId)
}

exports.leaveChat = leaveChat;
