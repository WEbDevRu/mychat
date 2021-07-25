const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const{ wrapAsyncMiddleware } = require('./wrapAsyncMiddleware')


const AUTHORIZATION_TYPES = {
    COOKIE_TOKEN: 'cookie_token'
}

const MIDDLEWARE_KEYS = {
    'USER': 'user',
}

async function getByType ({req, type}) {
    if ( type === AUTHORIZATION_TYPES.COOKIE_TOKEN) {
        const accessToken = req.cookies.AUTHORIZATION;
        if (accessToken){
            const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET);
            if(decoded){
                return User.findOne({
                    _id: decoded.userId,
                });
            }
        }
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
