export const getMedia = async (constraints) => {
    try {
        return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
        return '';
    }
}
