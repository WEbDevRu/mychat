const liveListsClient = require('../../utils/livelists/LivelistsClient');
async function getChat({ userId, chatId }) {
    return liveListsClient.participant.getAccessToken({
        identifier: userId,
        channelId: chatId,
    })
}

exports.getChat = getChat;
