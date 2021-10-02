const mongoose = require('mongoose');
const { toNestedDto } = require('../utils/toNestedDto');
const { User } = require('./user');
const { Chat } = require('./chat');

const MESSAGE_TYPES = {
    'DEFAULT': 'default',
    'JOIN_CHAT': 'join_chat',
}

const schema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chat,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
    autoCreate: true,
});

schema.methods.toDto = function toDto() {
    return {
        id: this._id,
        chat: this.chat,
        author: toNestedDto(this.author),
        createdAt: this.createdAt,
        text: this.text,
        type: this.type,
    };
};

exports.Message = mongoose.model('Message', schema);
exports.MESSAGE_TYPES = MESSAGE_TYPES;
