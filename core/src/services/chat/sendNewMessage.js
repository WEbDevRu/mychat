const socket = require('../../utils/socket/socketEngine');
const { User } = require('../../models/user');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { CHAT__V1_NEW_MESSAGE_POSTED } = require('../../const/socket/EVENTS');

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
    console.log(data.chatId, newMessage)
    socket.sendToRoom( data.chatId, CHAT__V1_NEW_MESSAGE_POSTED, { message: newMessage })
}

exports.sendNewMessage = sendNewMessage;
