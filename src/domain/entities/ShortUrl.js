class ShortUrl {
    constructor(originalUrl, urlHash) {
        if(!originalUrl || !urlHash) {
            throw new Error("Invalid Url data")
        }
        this.originalUrl = originalUrl;
        this.urlHash = urlHash
        this.viewCount = 0
        this.createdDate = new Date()
        this.lastViewedDate = new Date()
    }
}

module.exports = ShortUrl;