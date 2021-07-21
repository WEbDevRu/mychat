async function getUserInfo({ user } = {}) {
    const dto = user;
    return { user: dto };
}

exports.getUserInfo = getUserInfo;
