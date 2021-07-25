const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { Chat, MESSAGE_TYPES } =  require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');
require('dotenv').config();

async function createUser({ username }, { session } = {}) {
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

    await Chat.create([{
        name: username,
        participants: [{_id: user._id}],
        messages: [{
            author: user._id,
            createdAt: Date.now(),
            text: '',
            type: MESSAGE_TYPES.JOIN_CHAT,
        }]
    }], { session });

    return {
        username: username,
        accessToken: token,
    }
}

exports.createUser = createUser;
exports.createUserWT = withTransaction(createUser);
