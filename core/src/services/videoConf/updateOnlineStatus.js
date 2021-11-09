const { withTransaction } = require('../../utils/withTransaction');
const redis = require('../../utils/redis/redisConnector');

async function updateOnlineStatus({ roomId, user }, { session } = {}) {
    const memberId = `videoConfMember:${roomId}:${user._id}`;
    const videoConfId = `videoConf:${roomId}`;
    
    await redis.client
        .multi()
        .expire(memberId, 20)
        .expire(videoConfId, 20)
        .exec();
}

exports.updateOnlineStatus = updateOnlineStatus;
exports.updateOnlineStatus = withTransaction(updateOnlineStatus);
