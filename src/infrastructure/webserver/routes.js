const express = require("express")

module.exports = function createRoutes({ createShortUrl, getUrlByHash }) {
    const router = express.Router()

    router.get('/:shortUrl', async (req, res) => {
        try {
          const data = await getUrlByHash.execute(req.params.shortUrl);
          res.render('url_redirect', { url: data });
        } catch (err) {
          res.status(404).render('url_redirect');
        }
    });

    router.post('/', async (req, res) => {
        const data = await createShortUrl.execute(req.body.originalUrl);
        res.json(data);
    });

    return router
}