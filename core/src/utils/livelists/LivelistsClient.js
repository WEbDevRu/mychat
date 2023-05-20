const { ChannelClient, ParticipantClient } = require('livelists-node-js');

class LiveListsClient {
    constructor() {
        this.channel = new ChannelClient({
            apiHost: "https://mychat.whats-better.fun//livelists-twirp",
            apiKey: "apiKey",
            secretKey:  "secretKey"
        })
        this.participant = new ParticipantClient({
            apiHost: "https://mychat.whats-better.fun//livelists-twirp",
            apiKey: "apiKey",
            secretKey:  "secretKey"
        })
    }

    channel
    participant
}

module.exports = new LiveListsClient()
