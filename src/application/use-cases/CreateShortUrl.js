const randomString = require('randomstring');
const Url = require("../../domain/entities/ShortUrl")

class CreateShortUrl {
    constructor(shortUrlRepository) {
        this.shortUrlRepository = shortUrlRepository;
    }

    async execute(originalUrl) {
        const urlHash = randomString.generate(8);
        const shortUrl = new Url(originalUrl, urlHash)
        await this.shortUrlRepository.create(shortUrl)
        return shortUrl
    }
}

module.exports = CreateShortUrl