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

    /*set(key, value) {
        console.log('test');
        return async () => {
            console.log('here', key, value);
            await this.client.set(key, value);
        }

        return new Promise((resolve, reject) => {
            if (typeof value === 'object') {
                let redisObject = [];
                for (let key in value) {
                    if (value.hasOwnProperty( key )) {
                        console.log(value, key, value.key);
                        redisObject.push(key.toString(), value[key].toString());
                    }
                }
                this.client.hSet(key, redisObject, (err, res) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(res)
                    })
            } else {
                this.client.set(key, value, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(res)
                });
            }
        }) */
}

module.exports = new redisEngine();
