class GetShortUrl {
    constructor(shortUrlRepository) {
        this.shortUrlRepository = shortUrlRepository;
    }

    async execute(urlHash) {
        return await this.getUrlByHash.getUrlByHash(urlHash)
    }
}