const { enterChat } = require('../../services/chat/enterChat');

exports.enterChat = async (req) => {
    await enterChat({});
}
