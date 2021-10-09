const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');

async function findChats({ searchString },{ session } = {}) {

    const escapeRegex = (text) =>{
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const nameRegex = new RegExp(escapeRegex(searchString), 'gi');

    const aggregation = Chat.aggregate([
        {
            $match: {
                name: nameRegex
            }
        }, {
            $lookup: {
                from: 'messages',
                let: {
                    'chatId': '$_id'
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
                id: '$_id',
                name: 1,
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

    const result = await Chat.aggregatePaginate(aggregation);

    return {
        items: result.docs,
        page: result.page,
        total: result.totalPages,
    }
}

exports.findChats = findChats;
exports.findChats = withTransaction(findChats);
