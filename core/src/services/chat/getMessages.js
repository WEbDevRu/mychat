const { Message } = require('../../models/message');

async function getMessages({ user, senderId }, { session } = {}) {
    await Message.create({
        user: senderId,
    }, {
        $pull: {
            requests: {
                recipient: user._id,
            },
        },
        $addToSet: {
            friends: {
                _id: user._id,
            },
        },
    }, { session });
}

exports.getMessages = getMessages;
exports.acceptFriendshipProposalWT = withTransaction(acceptFriendshipProposal);
