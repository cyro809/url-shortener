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

    async get(key) {
        try {
            const value = await this.client.get(key)
            if (value) {
                console.log(`Key ${key} has value ${value}`);
                return value
            } else {
                console.log(`Key ${key} does not exist or has expired`);
                
            }
        } catch (err) {
            console.error(err)
        }
        
    }

    async set(key, value) {
        const expirationInSeconds = 60;
        try {
            await this.client.set(key, value, "EX", expirationInSeconds)
            console.log(`Key ${key} set with value ${value} and expiry time of ${expirationInSeconds} seconds`);
        } catch (err) {
            console.error(err)
        }
    }

    close() {
        this.client.quit((err, response) => {
            console.log("Redis connection closed", response)
        });
    }
}

module.exports = RedisClient;