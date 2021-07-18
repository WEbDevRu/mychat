const Joi = require('joi');
const { validate } = require('express-validation');

exports.postMe = validate({
    body: Joi.object({
        username: Joi
            .string()
            .required()
    }),
});
