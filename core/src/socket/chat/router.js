module.exports = (socket) => {
    socket.addRoute({
        path: 'chat/ENTER',
        cb: () => {
            console.log('hello world')
        }
    })
}

