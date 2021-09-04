const { Chat } = require('../../models/chat');
const { withTransaction } = require('../../utils/withTransaction');

async function getChatsList({ searchString },{ session } = {}) {

    const escapeRegex = (text) =>{
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const nameRegex = new RegExp(escapeRegex(searchString), 'gi');

    const result = await Chat
        .find({
            name: nameRegex,
        })
        .populate('messages.author')
        .session(session)
    return {
        items: result.map((r) => r.toShortDto()),
    }
}

exports.getChatsList = getChatsList;
exports.getChatsListWT = withTransaction(getChatsList);
