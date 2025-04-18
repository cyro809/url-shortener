const ShortUrlRepository = require("../../domain/ports/ShortUrlRepository")
const mongoose = require("mongoose")


const shortUrlSchema = new mongoose.Schema(
  {
    shortUrlHash: String,
    url: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    lastViewedDate: {
      type: Date,
      default: '',
    },
  },
);

const ShortUrlModel = mongoose.model("ShortUrl", shortUrlSchema);

class MongoShortUrlRepository extends ShortUrlRepository {
    async create(shortUrl) {
        return await ShortUrlModel.create(shortUrl)
    }

    async getUrlByHash(urlHash) {
        return await ShortUrlModel.findOne({ shortUrlHash: urlHash })
        .then((urlInfo) => {
          urlInfo.viewCount++;
          urlInfo.save();
          return urlInfo.url;
        })
        .catch((err) => {
          throw err;
        });
    }
}

module.exports = MongoShortUrlRepository;