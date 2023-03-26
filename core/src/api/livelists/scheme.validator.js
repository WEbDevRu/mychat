const Joi = require('joi');
const { validate } = require('express-validation');

exports.getChat = validate({
    params: Joi.object({
        chatId: Joi
            .string()
            .required()
    }),
});
