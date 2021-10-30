const Joi = require('joi');
const { validate } = require('express-validation');

exports.getChatsList = validate({
    query: Joi.object({
        searchString: Joi
            .string()
            .required()
    })
});

exports.createGroup = validate({
    body: Joi.object({
        name: Joi
            .string()
            .required(),
        description: Joi
            .string()
    })
})
