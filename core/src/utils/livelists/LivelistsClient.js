const { ChannelClient, ParticipantClient } = require('livelists-node-js');

class LiveListsClient {
    constructor() {
        this.channel = new ChannelClient({
            apiHost: "http://localhost:8080",
            apiKey: "apiKey",
            secretKey:  "secretKey"
        })
        this.participant = new ParticipantClient({
            apiHost: "http://localhost:8080",
            apiKey: "apiKey",
            secretKey:  "secretKey"
        })
    }

    channel
    participant
}

module.exports = new LiveListsClient()
