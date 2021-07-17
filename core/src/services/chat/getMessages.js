const { Message } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
async function getMeInfo({ message }, { session } = {}) {
    await Message.create([{
        message: "meage",
    }], { session });
}

exports.getMeInfo = getMeInfo;
exports.getMessagesWT = withTransaction(getMeInfo);
