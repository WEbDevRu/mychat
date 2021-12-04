export const getUserMedia = ({ constraints }) => {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            resolve(stream);
        })
            .catch((err) => reject(err));
    });
};
