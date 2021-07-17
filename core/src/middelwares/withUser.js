const{ wrapAsyncMiddleware } = require('./wrapAsyncMiddleware')


const AUTHORIZATION_TYPES = {
    COOKIE_TOKEN: 'cookie_token'
}

const MIDDLEWARE_KEYS = {
    'USER': 'user',
}

async function getByType ({req, type}) {
    if ( type === AUTHORIZATION_TYPES.COOKIE_TOKEN) {
        console.log(req);
    }
}
function withUser({type =AUTHORIZATION_TYPES.COOKIE_TOKEN, key = MIDDLEWARE_KEYS.USER} = {}) {
    return wrapAsyncMiddleware(async (req, res, next) => {
        req.data = req.data || {};
        if (key === MIDDLEWARE_KEYS.USER) {
            req.data.user = await getByType({req, type})
        }
        next()
    })
}

exports.withUser = withUser;
