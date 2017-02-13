'use strict';

const Record = require('../models/Record');
const Q = require('q');
const crypto = require('crypto');
const validUrl = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
const alphaNumeric = /^[a-z0-9]+$/i;

module.exports = {
    validUrl: validUrl,
    alphaNumeric: alphaNumeric,
    createShortUrl: createShortUrl,
    getRecordByHash: getRecordByHash,
    isHashExists: isHashExists
};

function isHashExists(hash, longUrl) {
    var deferred = Q.defer();

    Record.findOne({ hash: hash }, (err, doc) => {
        if (err) throw err;

        deferred.resolve({
            isExists: !!doc,
            toThat: !!doc && doc.long_url == longUrl
        });
    });

    return deferred.promise;
}

function createShortUrl(longUrl, hash, host) {
    var deferred = Q.defer();

    Record.findOne({ long_url: longUrl }, (err, doc) => {
        if (err) throw err;

        if (!doc) {
            var new_hash = hash || createHash(longUrl);

            let record = new Record({
                long_url: longUrl,
                hash: new_hash,
                short_url: host + new_hash,
                updated_at: Date.now()
            });

            saveDoc(record, deferred);
        } else {
            doc.updated_at = Date.now();
            doc.hash = hash || doc.hash;
            doc.short_url = host + doc.hash;

            saveDoc(doc, deferred);
        };
    });

    return deferred.promise;

    function saveDoc(doc, deferred) {
        doc.save((err, doc) => {
            if (err) throw err;
            deferred.resolve(doc.safeModel());
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