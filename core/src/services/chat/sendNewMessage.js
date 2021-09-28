const socket = require('../../utils/socket/socketEngine');
const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');
const { Chat, MESSAGE_TYPES } = require('../../models/chat');
const SOCKET_ACTIONS = require('../../const/routes/socketActions');

async function sendNewMessage({ data }, { session } = {}) {
    const userId = jwt.verify(data.token, process.env.TOKEN_SECRET).userId
    const chatId = data.chatId
    const message = data.message
    const now = new Date()

    const user = await User
        .findOne({ _id: userId })

    const newMessage = {
        id: now,
        author: {
            id: userId,
            username: user.toDto().username,
        },
        text: message,
        createdAt: now,
        type: MESSAGE_TYPES.DEFAULT,
    }

    await Chat.updateOne({
        _id: chatId
    }, {
        $push: {
            messages: {
                author: userId,
                createdAt: now,
                text: message,
                type: MESSAGE_TYPES.DEFAULT,
            }
        }
    });

    socket.sendToRoom( data.chatId, SOCKET_ACTIONS.NEW_MESSAGE, newMessage)
}

exports.sendNewMessage = sendNewMessage;
