
const jwt = require("jsonwebtoken");


module.exports = (socket, io) => {



    socket.on('chat/ENTER', async (data)=>{
        socket.name = data.token
        await socket.join(data.chatId)
        console.log('join', data.token, data.chatId);
    })

    socket.on('chat/LEAVE',  async (data)=>{
        socket.name = data.token
        await socket.leave(data.chatId)
        console.log('leave', data.token, data.chatId);
    })

    //event calls when client send new message
    socket.on('chat/NEW_MESSAGE', async (data) =>{
        /*let userId = jwt.verify(data.token, 'jerjg').userId
        let chatId = data.chatId
        let message = data.text
        //get information about user, which sent message
        let user = await ChatUser
            .findOne({_id: userId})
            .then(doc => (doc))

        //form the object of new message
        message = { creator: userId,
            creatorName: user.name,
            creatorColor: user.avatarColor,
            chat: chatId,
            type: "normal",
            text: message,
            date: new Date()
        }

        //send message to all users in chat
        io.sockets.to(data.chatId).emit('chat/NEW_MESSAGE_POSTED', {message: message}) */

        console.log(data)
    })




}
