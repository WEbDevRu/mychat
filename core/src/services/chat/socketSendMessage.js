const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');
const { Chat, MESSAGE_TYPES } = require('../../models/chat')

module.exports = (socket, io) => {
    socket.on('chat/ENTER', async (data)=>{
        socket.name = data.token
        await socket.join(data.chatId)
    })

    socket.on('chat/LEAVE',  async (data)=>{
        socket.name = data.token
        await socket.leave(data.chatId)
    })

    socket.on('chat/NEW_MESSAGE', async (data) =>{
        const userId = jwt.verify(data.token, process.env.TOKEN_SECRET).userId
        const chatId = data.chatId
        const message = data.message
        const now = new Date()

        const user = await User
            .findOne({_id: userId})

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
        })
        io.sockets.to(chatId).emit('chat/NEW_MESSAGE_POSTED', { newMessage })
    })
}
