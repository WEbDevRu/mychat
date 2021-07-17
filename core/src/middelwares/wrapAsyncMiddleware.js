exports.wrapAsyncMiddleware = (middleware) => (req, res, next) => {
    middleware(req, res, next)
        .catch(next);
};
