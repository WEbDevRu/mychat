const { withTransaction } = require('../../utils/withTransaction');
const redis = require('../../utils/redis/redisConnector');
const { toRedisObject } = require('../../utils/redis/toRedisObject');
const socket  = require('../../utils/socket/socketEngine');
const { VIDEO_CONF__V1_SUCCESS_JOIN } = require('../../const/socket/EVENTS');

async function joinConf({ roomId, user }, { session } = {}) {
    const memberId = `videoConfMember:${roomId}:${user._id}`;
    const videoConfId = `videoConf:${roomId}`;

    await redis.client
        .multi()
        .hSet(memberId, toRedisObject({
            username: user.username
        }))
        .expire(memberId, 10)
        .sAdd(videoConfId, user._id.toString())
        .expire(videoConfId, 10)
        .exec();

    const videoConfData = await redis.client.hGetAll(`videoConfMember`);

    socket.sendToRoom(roomId, VIDEO_CONF__V1_SUCCESS_JOIN, {
        message: 'you join to room'
    });
}

exports.joinConf = joinConf;
exports.joinConf = withTransaction(joinConf);
