function toRedisObject(object) {
    let redisObject = [];
    for (let key in object) {
        if (object.hasOwnProperty( key )) {
            redisObject.push(key, object[key].toString());
        }
    }
    return redisObject
}

exports.toRedisObject = toRedisObject;
