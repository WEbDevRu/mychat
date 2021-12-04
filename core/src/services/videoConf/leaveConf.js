const { withTransaction } = require('../../utils/withTransaction');
const redis = require('../../utils/redis/redisConnector');
const { toRedisObject } = require('../../utils/redis/toRedisObject');
const socket  = require('../../utils/socket/socketEngine');
const {
    VIDEO_CONF__V1_PARTICIPANT_LEAVE
} = require('../../const/socket/EVENTS');

async function leaveConf({ roomId, userId }, { session } = {}) {
    const memberId = `videoConfMember:${roomId}:${userId}`;
    const videoConfId = `videoConf:${roomId}`;

    socket.leaveRoom(videoConfId);
    await redis.client
        .multi()
        .del(memberId)
        .sRem(videoConfId.toString(), userId.toString())
        .exec();

    socket.broadcastToRoom(videoConfId, VIDEO_CONF__V1_PARTICIPANT_LEAVE, {
        userId: userId,
    });
}

exports.leaveConf = leaveConf;
exports.leaveConf = withTransaction(leaveConf);
