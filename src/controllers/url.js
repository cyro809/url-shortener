const randomString = require('randomstring');
const UrlRepository = require('../repositories/url');
const RedisClient = require('../client/redis')

const redisClient = RedisClient.getInstance()


class UrlController {
  static generateHash() {
    return randomString.generate(8);
  }

  static async getNormalUrl(shortUrlHash) {
    const originalUrl = await redisClient.get(shortUrlHash);
    if (originalUrl)
      return originalUrl
    return UrlRepository.getUrlByHash(shortUrlHash);
  }

  static async getAllUrls() {
    const data = await UrlRepository.getAllUrls();
    return data;
  }

  static async createShortUrl(data) {
    const newData = data;
    newData.shortUrlHash = this.generateHash();
    await redisClient.set(newData.shortUrlHash, newData.url);
    return UrlRepository.create(newData);
  }
}

module.exports = UrlController;
