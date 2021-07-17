async function getUserInfo({ user } = {}) {
    const dto = user.toDto();
    return { user: dto };
}

exports.getUserInfo = getUserInfo;
