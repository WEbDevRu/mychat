const Joi = require('joi');
const { validate } = require('express-validation');

exports.getChatInfo= validate({
    params: Joi.object({
        chatId: Joi
            .string()
            .required()
    }),
});

exports.getChatHistory= validate({
    params: Joi.object({
        chatId: Joi
            .string()
            .required()
    }),
});

exports.putChatJoin = validate({
    params: Joi.object({
        chatId: Joi
            .string()
            .required()
    })
})
