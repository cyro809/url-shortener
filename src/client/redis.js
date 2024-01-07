const redis = require("redis")

class RedisClient {
    constructor() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        this.client.on("connect", () =>{
            console.log("Connected to Redis")
        })
        this.client.on("error", (err) => {
            console.error(`Error connecting to Redis: ${err}`)
        })
    }
    async connect() {
        if(!this.client.isReady)
            await this.client.connect()
    }

    async get(shortUrl) {
        await this.connect()
        this.client.get(shortUrl, (err, response) => {
            if (err) {
                console.error(err)
            } else {
                console.log("Get: ", response)
            }
        });
    }

    async set(shortUrl, originalUrl) {
        await this.connect()
        const expirationInSeconds = 60;
        this.client.set(shortUrl, originalUrl, (err, response) => {
            if (err)
                console.error(err)
            else
                console.log("Set: ", response)
        });
        this.client.expire(shortUrl, expirationInSeconds, (expireError, expireReply) => {
            if(expireError)
                console.error(err)
            else
                console.log("Expire: ", expireReply)
        })

    }

    close() {
        this.client.quit((err, response) => {
            console.log("Redis connection closed", response)
        });
    }
}

module.exports = RedisClient;