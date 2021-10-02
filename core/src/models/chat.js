const mongoose = require('mongoose');
const { toNestedDto } = require('../utils/toNestedDto');
const { User } = require('./user');

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
    }
}

exports.Chat = mongoose.model('Chat', schema);
