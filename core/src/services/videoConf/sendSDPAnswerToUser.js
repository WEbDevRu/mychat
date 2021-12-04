const { withTransaction } = require('../../utils/withTransaction');
const socket = require('../../utils/socket/socketEngine');
const { VIDEO_CONF__V1_SDP_ANSWER } = require('../../const/socket/EVENTS');

async function sendSDPAnswerToUser({
    answer,
    userId,
    receiverSocketId,
    senderSocketId,
}, { session } = {}) {
    socket.sendToSocketBySocketId(
        VIDEO_CONF__V1_SDP_ANSWER,
        receiverSocketId, {
        answer,
        userId,
        senderSocketId,
    })
}

exports.sendSDPAnswerToUser = sendSDPAnswerToUser;
exports.sendSDPAnswerToUser = withTransaction(sendSDPAnswerToUser);
