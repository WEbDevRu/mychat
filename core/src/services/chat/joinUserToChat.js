const { ParticipantClient } = require('livelists-node-js');
const { ChatParticipant, PARTICIPANT_TYPES } = require('../../models/chatParticipant');
const { Message, MESSAGE_TYPES } = require('../../models/message');
const { withTransaction } = require('../../utils/withTransaction');
async function joinUserToChat({ userId, chatId }, { session } = {}) {
    const client = new ParticipantClient({
        apiHost: "http://localhost:8080",
        apiKey: "apiKey",
        secretKey:  "secretKey"
    });

    await client.addParticipantToChannel({
        identifier: userId,
        channelId: chatId,
        grants: {
            sendMessage: true,
            readMessages: true,
        }
    })

    const chatParticipant = new ChatParticipant({
        chat: chatId,
        user: userId,
        type: PARTICIPANT_TYPES.DEFAULT
    });
    await chatParticipant.save(session);

    const joinMessage = new Message({
        chat: chatId,
        author: userId,
        createdAt: Date.now(),
        type: MESSAGE_TYPES.JOIN_CHAT,
    });
    await joinMessage.save(session);

    return {
        chatId
    }
}

exports.joinUserToChat = joinUserToChat;
exports.joinUserToChatWT = withTransaction(joinUserToChat);
