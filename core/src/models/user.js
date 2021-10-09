const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        color: {
            type: Number,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    }, {
        versionKey: false,
        timestamps: true,
        autoCreate: true,
    }
);

schema.methods.toDto = function toDto() {
    return {
        id: this._id,
        username: this.username,
        color: this.color,
    };
};
exports.User = mongoose.model('User', schema);
