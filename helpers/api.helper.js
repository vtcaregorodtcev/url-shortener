'use strict';

const Record = require('../models/Record');
const Q = require('q');
const crypto = require('crypto');
const validUrl = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

module.exports = {
    validUrl: validUrl,
    createShortUrl: createShortUrl,
    getRecordByHash: getRecordByHash
};

function createShortUrl(longUrl) {
    var deferred = Q.defer();

    Record.findOne({ long_url: longUrl }, (err, doc) => {
        if (err) throw err;

        if (!doc) {
            let record = new Record({
                long_url: longUrl,
                hash: createHash(longUrl),
                updated_at: Date.now()
            });

            saveDoc(record, deferred);
        } else {
            doc.updated_at = Date.now();
            saveDoc(doc, deferred);
        };
    });

    return deferred.promise;

    function saveDoc(doc, deferred) {
        doc.save((err, doc) => {
            if (err) throw err;
            deferred.resolve(doc);
        });
    }
}

function getRecordByHash(hash) {
    var deferred = Q.defer();

    Record.findOne({ hash: hash }, (err, doc) => {
        if (err) throw err;

        deferred.resolve(doc);
    });

    return deferred.promise;
}

function createHash(longUrl) {
    return crypto.randomBytes(20).toString('hex').slice(-8);
}