const mongoose = require('mongoose');

exports.withTransaction = (func) => async (...args) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const res = await func(...args, { session });
        await session.commitTransaction();
        return res;
    } catch (e) {
        await session.abortTransaction();
        throw e;
    } finally {
        session.endSession();
    }
};
