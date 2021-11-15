const { wrapAsyncMiddleware } = require('../../middelwares/wrapAsyncMiddleware');
const { joinConf } = require('../../services/videoConf/joinConf');
const { updateOnlineStatus } = require('../../services/videoConf/updateOnlineStatus');
const { leaveConf } = require('../../services/videoConf/leaveConf');
const { sendSDPOfferToRoom } = require('../../services/videoConf/sendSDPOfferToRoom');
const { sendSDPAnswerToUser } = require('../../services/videoConf/sendSDPAnswerToUser');
const { sendICECandidateToUser } = require('../../services/videoConf/sendICECandidateToUser');

exports.joinConf = wrapAsyncMiddleware( async (req) => {
    await joinConf({
        user: req.data.user,
        roomId: req.data.roomId,
        socketId: req.headers.socket.socketId,
    });
});

exports.updateOnlineStatus = wrapAsyncMiddleware( async (req) => {
    await updateOnlineStatus({
        user: req.data.user,
        roomId: req.data.roomId
    });
});

exports.leaveConf = wrapAsyncMiddleware(async (req) => {
    await leaveConf({
        userId: req.data.user._id,
        roomId: req.data.roomId
    });
});

exports.sendSDPOfferToRoom = wrapAsyncMiddleware(async(req) => {
    await sendSDPOfferToRoom({
        roomId: req.data.roomId,
        offer: req.data.offer,
        senderSocketId: req.headers.socket.socketId,
        userId: req.data.user._id,
    })
});

exports.sendSDPAnswerToUser = wrapAsyncMiddleware(async (req) => {
    await sendSDPAnswerToUser({
        answer: req.data.answer,
        userId: req.data.user._id,
        receiverSocketId: req.data.receiverSocketId,
        senderSocketId: req.headers.socket.socketId,
    });
});

exports.sendICECandidateToUser = wrapAsyncMiddleware(async (req) => {
    await sendICECandidateToUser({
        candidate: req.data.candidate,
        userId: req.data.user._id,
        receiverSocketId: req.data.receiverSocketId,
        senderSocketId: req.headers.socket.socketId,
    });
});
