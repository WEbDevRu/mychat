const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
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
            expiresIn: '1h'
        }
    )
    user.token = token;
    await user.save();
    return {
        username: username,
        accessToken: token,
    }
}

exports.createUser = createUser;
exports.createUserWT = withTransaction(createUser);
