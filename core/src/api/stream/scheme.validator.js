const Joi = require('joi');
const { validate } = require('express-validation');

exports.generateAccessToken = validate({
    params: Joi.object({
        chatId: Joi
            .string()
            .required()
    }),
});
