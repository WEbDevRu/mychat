const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        }
    }
);
exports.Message = mongoose.model('Message', schema);
