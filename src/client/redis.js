const redis = require("redis")

class RedisClient {
    static instance;
    constructor() {
        this.client = redis.createClient({
            url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
        });
        this.client.on("connect", () =>{
            console.log("Connected to Redis")
        })
        this.client.on("error", (err) => {
            console.error(`Error connecting to Redis: ${err}`)
        })
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisClient();
        }
        return this.instance;
    }
    async connect() {
        await this.client.connect()
    }

    get(shortUrl) {
        this.client.get(shortUrl, (err, response) => {
            if (err) {
                console.error(err)
            } else {
                console.log("Get: ", response)
            }
        });
    }

    set(shortUrl, originalUrl) {
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