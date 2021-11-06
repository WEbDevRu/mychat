const { createClient } = require('redis');

async function connectRedis() {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
    client.on('error', (err) => console.log('Redis Client connect Error', err));
    await client.connect();
    return client;
}

exports.connectRedis = connectRedis;
