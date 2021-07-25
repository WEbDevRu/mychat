const mongoose = require('mongoose');
const { toNestedDto } = require('../utils/toNestedDto');
const { User } = require('./user');

const MESSAGE_TYPES = {
    'DEFAULT': 'default',
    'JOIN_CHAT': 'join_chat',
}

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }],
        messages: [{
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
        }]
    }, {
        versionKey: false,
        timestamps: true,
        autoCreate: true,
    }
);

schema.methods.toDto = function toDto() {
    return {
        id: this._id,
        name: this.name,
        participants: this.participants.map((p)=> ({
            participant: toNestedDto(p),
        }))
    };
};

schema.methods.toShortDto = function toShortDto() {
    return {
        id: this._id,
        name: this.name,
        lastMessage: {
            author: toNestedDto(this.messages[this.messages.length - 1].author),
            createdAt: this.messages[this.messages.length - 1].createdAt,
            text: this.messages[this.messages.length - 1].text,
            type: this.messages[this.messages.length - 1].type,
        },
    }
}

schema.methods.toMessagesDto = function toMessagesDto() {
    return {
        items: this.messages.map((m) => ({
            author: toNestedDto(m.author),
            createdAt: m.createdAt,
            text: m.text,
            type: m.type,
        }))
    }
}
exports.Chat = mongoose.model('Chat', schema);
exports.MESSAGE_TYPES = MESSAGE_TYPES;
