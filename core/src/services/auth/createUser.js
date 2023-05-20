const jwt = require('jsonwebtoken');
const { ChannelClient, ParticipantClient } = require('livelists-node-js');
const { User } = require('../../models/user');
const { Chat } =  require('../../models/chat');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { ChatParticipant, PARTICIPANT_TYPES } = require('../../models/chatParticipant');
const { withTransaction } = require('../../utils/withTransaction');
const { getRandomInt } = require('../../utils/numbers/getRandomInt');
const { USER_COLORS_COUNT } = require('../../const/USERS');
const liveListsClient = require('../../utils/livelists/LivelistsClient');

require('dotenv').config();

async function createUser({ username }, { session } = {}) {
    const now = Date.now();

    const user = new User({
        username: username,
        color: getRandomInt(0 , USER_COLORS_COUNT),
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
    await user.save({ session });

    const chat = new Chat({
        name: username,
        participants: [{ _id: user._id }]
    });

    await chat.save({ session });

    await liveListsClient.channel.createChannel({
        identifier: chat._id,
        maxParticipants: 100,
    });

    try {
        await liveListsClient.participant.addParticipantToChannel({
            identifier: user._id,
            channelId: chat._id,
            grants: {
                sendMessage: true,
                readMessages: true,
            },
            customData: {
                username,
            }
        })
    } catch (e) {
        console.log(e)
    }

    await ChatParticipant.create([{
        chat: chat._id,
        user: user._id,
        createdAt: now,
        type: PARTICIPANT_TYPES.ADMIN,
    }], { session });

    await Message.create([{
        chat: chat._id,
        author: user._id,
        createdAt: now,
        type: MESSAGE_TYPES.JOIN_CHAT,
    }], { session });

    return {
        username: username,
        accessToken: token,
    }
}

exports.createUser = createUser;
exports.createUserWT = withTransaction(createUser);
