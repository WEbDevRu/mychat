const { ChatParticipant } = require('../../models/chatParticipant');
const { withTransaction } = require('../../utils/withTransaction');
async function getChats({ userId }, { session } = {}) {
    const aggregation = ChatParticipant.aggregate([
            {
                $lookup: {
                    from: 'chats',
                    localField: 'chat',
                    foreignField: '_id',
                    as: 'chatData'
                }
            }, {
            $project: {
                _id: 1,
                chat: 1,
                chatName: {
                    $arrayElemAt: [
                        '$chatData.name', 0
                    ]
                }
            }
        }, {
            $lookup: {
                from: 'messages',
                let: {
                    'chatId': '$chat'
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    '$chat', '$$chatId'
                                ]
                            }
                        }
                    }, {
                        $sort: {
                            createdAt: -1
                        }
                    }, {
                        $limit: 1
                    }
                ],
                as: 'lastMessage'
            }
        }, {
            $project: {
                _id: 0,
                id: '$chat',
                name: '$chatName',
                lastMessage: {
                    $arrayElemAt: [
                        '$lastMessage', 0
                    ]
                }
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'lastMessage.author',
                foreignField: '_id',
                as: 'lastMessage.userInfo'
            }
        }, {
            $project: {
                id: 1,
                name: 1,
                lastMessage: {
                    id: '$lastMessage._id',
                    createdAt: '$lastMessage.createdAt',
                    text: '$lastMessage.text',
                    type: '$lastMessage.type',
                    author: {
                        $arrayElemAt: [
                            '$lastMessage.userInfo', 0
                        ]
                    }
                }
            }
        }, {
            $project: {
                id: 1,
                name: 1,
                lastMessage: {
                    id: '$lastMessage._id',
                    createdAt: '$lastMessage.createdAt',
                    text: '$lastMessage.text',
                    type: '$lastMessage.type',
                    author: {
                        id: '$lastMessage.author._id',
                        username: '$lastMessage.author.username',
                        color: '$lastMessage.author.color'
                    }
                }
            }
        }
        ]).session(session);

    const result = await ChatParticipant.aggregatePaginate(aggregation);

    return {
        items: result.docs,
        page: result.page,
        total: result.totalPages,
    }
}

exports.getChats = getChats;
exports.getChatsWT = withTransaction(getChats);
