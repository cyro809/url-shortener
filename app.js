const db = require('./config/db.config');
const RedisClient = require('./src/client/redis')
const MongoShortUrlRepository = require("./src/infrastructure/database/MongoShortUrlRepository");
const CreateShortUrl = require("./src/application/use-cases/CreateShortUrl");
const GetUrlByHash = require("./src/application/use-cases/GetUrlByHash");
const ExpressAdapter = require("./src/infrastructure/webserver/ExpressAdapter");

const mongoShortUrlRepository = new MongoShortUrlRepository()
const useCases = {
  createShortUrl: new CreateShortUrl(mongoShortUrlRepository),
  getUrlByHash: new GetUrlByHash(mongoShortUrlRepository)
}
const webServer = new ExpressAdapter(useCases)
db.connect();
const redisClient = RedisClient.getInstance();
(async () => {
  await redisClient.connect();
})();
webServer.listen()