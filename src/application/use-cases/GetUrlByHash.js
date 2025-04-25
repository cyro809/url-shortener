class GetUrlByHash {
    constructor(shortUrlRepository) {
        this.shortUrlRepository = shortUrlRepository;
    }

    async execute(urlHash) {
        return await this.shortUrlRepository.getUrlByHash(urlHash)
    }
}

module.exports = GetUrlByHash