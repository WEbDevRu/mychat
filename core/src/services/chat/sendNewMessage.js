const socket = require('../../utils/socket/socketEngine');
const { User } = require('../../models/user');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const SOCKET_ACTIONS = require('../../const/routes/socketActions');

async function sendNewMessage({ senderId, data }, { session } = {}) {
    const chatId = data.chatId
    const message = data.message
    const now = new Date()

    const user = await User
        .findOne({ _id: senderId })

    const newMessage = {
        id: now,
        author: {
            id: senderId,
            username: user.toDto().username,
        },
        text: message,
        createdAt: now,
        type: MESSAGE_TYPES.DEFAULT,
    }

    await Message.create({
       chat: chatId,
       author: senderId,
       createdAt: now,
       text: message,
       type: MESSAGE_TYPES.DEFAULT,
    });

    socket.sendToRoom( data.chatId, SOCKET_ACTIONS.NEW_MESSAGE, { message: newMessage })
}

exports.sendNewMessage = sendNewMessage;
