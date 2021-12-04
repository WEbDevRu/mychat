const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const { toNestedDto } = require('../utils/toNestedDto');
const { User } = require('./user');

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }
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
    };
};

schema.methods.toShortDto = function toShortDto() {
    return {
        id: this._id,
        name: this.name,
    }
};

schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

exports.Chat = mongoose.model('Chat', schema);
