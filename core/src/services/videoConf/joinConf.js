const { withTransaction } = require('../../utils/withTransaction');
const redis = require('../../utils/redis/redisConnector');
const { toRedisObject } = require('../../utils/redis/toRedisObject');
const socket  = require('../../utils/socket/socketEngine');
const {
    VIDEO_CONF__V1_SUCCESS_JOIN,
    VIDEO_CONF__V1_NEW_PARTICIPANT
} = require('../../const/socket/EVENTS');

async function joinConf({ roomId, user }, { session } = {}) {
    const memberId = `videoConfMember:${roomId}:${user._id}`;
    const videoConfId = `videoConf:${roomId}`;

    const participantsList = await redis.client.sMembers(videoConfId.toString());
    const participantsData = await Promise.all(participantsList.map((p) => redis.client.hGetAll(`videoConfMember:${roomId}:${p}`)));

    await redis.client
        .multi()
        .hSet(memberId, toRedisObject({
            username: user.username,
            userId: user._id
        }))
        .expire(memberId, 20)
        .sAdd(videoConfId.toString(), user._id.toString())
        .exec();

    socket.joinRoom(videoConfId);

    socket.sendResponseToUser(VIDEO_CONF__V1_SUCCESS_JOIN, {
        participants: participantsData
    });

    socket.broadcastToRoom(videoConfId, VIDEO_CONF__V1_NEW_PARTICIPANT, {
        message: 'newUser',
        userId: user._id,
    });
}

exports.joinConf = joinConf;
exports.joinConf = withTransaction(joinConf);
