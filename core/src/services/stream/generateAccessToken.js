const { AccessToken,  RoomServiceClient } = require('livekit-server-sdk');

async function generateAccessToken({ chatId, userId },{ session } = {}) {

    const svc = new RoomServiceClient('wss://mychat-livekit.whats-better.fun', 'APIhGpMrs73Fu9W', 'ad1Omw31DWd1F8b8oFkMbAdt9Jc5yKxe7zj5nPwtU6ey');

    const opts = {
        name: chatId,
        // timeout in seconds
        emptyTimeout: 10 * 60,
        maxParticipants: 20,
    };
    svc.createRoom(opts).then((room) => {
        console.log('room created', room);
    });

    const at = new AccessToken('APIhGpMrs73Fu9W', 'ad1Omw31DWd1F8b8oFkMbAdt9Jc5yKxe7zj5nPwtU6ey', {
        identity: userId.toString(),
    });


    at.addGrant({
        roomJoin: true,
        room: chatId.toString(),
        canPublish: false,
        canSubscribe: true
    });

    const token = at.toJwt();

    return {
        token
    }
}

exports.generateAccessToken = generateAccessToken;
