'use strict';

const router = require('express').Router();
const helper = require('../helpers/api.helper');
const request = require('request');
const conf = require('../app.config');

module.exports = (app) => {
    router.route('/shorturl')
        .post((req, res, next) => {
            var longUrl = req.body.longUrl;
            var hash = req.body.hash;
            var host = req.body.host;

            if (!longUrl)
                res.status(202).send({ errMsg: "Long url is not presented" });

            if (!helper.validUrl.test(longUrl))
                res.status(202).send({ errMsg: "Long url is not valid" });

            request(longUrl, (err, response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    if (hash && !helper.alphaNumeric.test(hash))
                        res.status(202).send({ errMsg: "Hash for short url is not alphanumeric" });

                    helper
                        .isHashExists(hash, longUrl)
                        .then((ans) => {
                            return !ans.isExists ?
                                helper.createShortUrl(longUrl, hash, host || `${req.protocol}://${req.get('host')}/`) :
                                res.status(202).send({ errMsg: ans.toThat ? "Hash is already attached to this url" : "Hash is already taken" })
                        })
                        .then((doc) => res.status(200).send({ doc: doc, msg: hash ? "Hash attached to url successfully" : "" }));

                } else res.status(202).send({ errMsg: "Long url is not available" });
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