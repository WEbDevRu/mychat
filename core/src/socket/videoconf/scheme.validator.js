const Joi = require('joi');
const { validate } = require('express-validation');

exports.joinConf = validate({
    body: Joi.object({
        roomId: Joi
            .string()
            .required()
    }),
});
