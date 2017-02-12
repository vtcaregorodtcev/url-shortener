'use strict';

const router = require('express').Router();
const helper = require('../helpers/api.helper');
const request = require('request');

module.exports = (app) => {
    router.route('/shorturl')
        .post((req, res, next) => {
            var longUrl = req.body.longUrl;
            if (!longUrl)
                res.status(400).send({ errMsg: "Long url is not presented" });

            if (!helper.validUrl.test(longUrl))
                res.status(400).send({ errMsg: "Long url is not valid" });

            request(longUrl, (err, response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    helper
                        .createShortUrl(longUrl)
                        .then((doc) => {
                            return res.status(200).send({ doc: doc });
                        });
                } else res.status(400).send({ errMsg: "Long url is not available" });
            });
        });

    router.route('/resolve')
        .post((req, res, next) => {
            let hash = req.body.hash;
            helper
                .getRecordByHash(hash)
                .then(function(record) {
                    if (record) {
                        record.amount_usage++;
                        record.save();

                        res.status(200).send(record.long_url);
                    };
                });
        });

    return app.use('/api/v1/', router);
};