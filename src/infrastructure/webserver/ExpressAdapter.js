require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser")
const path = require('path');
const createRoutes = require("./routes")

class ExpressAdapter {
    constructor(useCases) {
        this.app = express()
        this.app.use(bodyParser.json());
        this.port = process.env.PORT || 3000;
        this.app.use(bodyParser.json());
        const routes = createRoutes(useCases)
        this.app.use('/url', routes);
        this.app.use('/static', express.static(path.join(__dirname, '../../../static')));

        this.app.set('view engine', 'pug');
        this.app.set('views', './src/views');

        this.app.get('/', (req, res) => {
            res.render('index');
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = ExpressAdapter