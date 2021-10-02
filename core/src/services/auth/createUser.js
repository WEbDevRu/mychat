const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { Chat } =  require('../../models/chat');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
require('dotenv').config();

async function createUser({ username }, { session } = {}) {
    const now = Date.now();

    const user = new User({
        username: username,
    });

    const token = jwt.sign(
        {
            userId: user._id,
            type: 'registration'
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '1y'
        }
    )
    user.token = token;
    await user.save();

    const chat = new Chat({
        name: username,
        participants: [{ _id: user._id }]
    });

    await chat.save();

    await Message.create({
        chat: chat._id,
        author: user._id,
        createdAt: now,
        type: MESSAGE_TYPES.JOIN_CHAT,
    });

    return {
        username: username,
        accessToken: token,
    }
}

exports.createUser = createUser;
exports.createUserWT = withTransaction(createUser);
