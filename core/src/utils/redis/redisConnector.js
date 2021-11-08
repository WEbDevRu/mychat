const { createClient } = require('redis');

class redisEngine {
    constructor() {
        this.client = {}
    }

    async connect() {
        const client = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });
        client.on('error', (err) => console.log('Redis Client connect Error', err));
        await client.connect();
        this.client = client;
    }
}

module.exports = new redisEngine();
