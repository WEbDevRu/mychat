const mongoose = require('mongoose');
const { toNestedDto } = require('../utils/toNestedDto');
const { User } = require('./user');
const { Chat } = require('./chat');

const PARTICIPANT_TYPES = {
    'DEFAULT': 'default',
    'ADMIN': 'admin',
}

const schema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Chat,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
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
        user: toNestedDto(this.author),
        createdAt: this.createdAt,
        type: this.type,
    };
};

exports.ChatParticipant = mongoose.model('ChatParticipant', schema);
exports.PARTICIPANT_TYPES = PARTICIPANT_TYPES;
