async function getUserInfo({ user } = {}) {
    console.log(user);
    const dto = user?.toDto();
    return { user: dto };
}

exports.getUserInfo = getUserInfo;
