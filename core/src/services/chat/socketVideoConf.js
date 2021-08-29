const jwt = require("jsonwebtoken");
const { User } = require('../../models/user');

module.exports = (socket, io) => {
    socket.on('videoConf/ENTER', async (data)=>{
        const userId = jwt.verify(data.token, process.env.TOKEN_SECRET).userId
        socket.name = userId
        await socket.join(data.chatId)
        let sockets = await io.in(data.chatId).fetchSockets()
        sockets = sockets.map(item=>  item.name)

        const participantsList = await User.find({
            _id: sockets
        })

        socket.emit('videoConf/ENTER_SUCCESS', {
            participants: participantsList.map((i)=>(i.toDto()))
        })
    })

    socket.on('videoConf/LEAVE',  async (data)=>{
        socket.name = data.token
        await socket.leave(data.chatId)
    })

    socket.on('videoConf/NEW_SDP', (data) => {
        if (data.token) {
            const userId = jwt.verify(data.token, process.env.TOKEN_SECRET).userId
            io.sockets.to(data.chatId).emit('videoConf/NEW_SDP', {
                userId,
                sdp: data.sdp,
            })
        }
    })

    socket.on('videoConf/NEW_ICE_CANDIDATE', (data) => {
        if (data.token) {
            const userId = jwt.verify(data.token, process.env.TOKEN_SECRET).userId
            io.sockets.to(data.chatId)
                .emit('videoConf/NEW_ICE_CANDIDATE', {
                    userId,
                    candidate: data.candidate,
                })
        }
    })
}
