const mongoose = require('mongoose');

function toNestedDto(model, options, { nullIfNoDTO, methodName = 'toDto' } = {}) {
    if (!model || mongoose.Types.ObjectId.isValid(model)) {
        return model;
    }

    if (Array.isArray(model)) {
        return model.map((o) => toNestedDto(o, options, { nullIfNoDTO, methodName })).filter((v) => v);
    }

    if (model[methodName]) {
        return model[methodName](options);
    }

    return nullIfNoDTO || undefined;
}

exports.toNestedDto = toNestedDto;
