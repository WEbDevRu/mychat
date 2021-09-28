exports.wrapAsyncMiddleware = (middleware) => (req, res, next) => {
    return middleware(req, res, next)
        .catch(next);
};
