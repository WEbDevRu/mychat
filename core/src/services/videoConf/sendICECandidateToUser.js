const { withTransaction } = require('../../utils/withTransaction');
const socket = require('../../utils/socket/socketEngine');
const { VIDEO_CONF_V1_ICE_CANDIDATE } = require('../../const/socket/EVENTS');

async function sendICECandidateToUser({
    candidate,
    userId,
    receiverSocketId,
    senderSocketId
}, { session } = {}) {

    socket.sendToSocketBySocketId(
        VIDEO_CONF_V1_ICE_CANDIDATE,
        receiverSocketId, {
            candidate,
            senderSocketId,
            userId,
        });
}

exports.sendICECandidateToUser = sendICECandidateToUser;
exports.sendICECandidateToUser = withTransaction(sendICECandidateToUser);
