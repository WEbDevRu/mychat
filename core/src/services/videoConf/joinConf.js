const { withTransaction } = require('../../utils/withTransaction');
const redis = require('../../utils/redis/redisConnector');

async function joinConf({ roomId, user }, { session } = {}) {
    const now = new Date();
    const memberId = `videoConfMember_+${roomId}_${user._id}`

    console.log('redis', redis);
    await redis.client.set(memberId, 'adcdrf');


}

exports.joinConf = joinConf;
exports.joinConf = withTransaction(joinConf);
