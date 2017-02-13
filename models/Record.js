'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    long_url: { type: String },
    short_url: { type: String },
    hash: { type: String },
    updated_at: { type: Date },
    amount_usage: { type: Number, default: 0 }
});

schema.methods.safeModel = safeModel;

let Record = mongoose.model('Record', schema);

function safeModel() {
    return {
        short_url: this.short_url,
        long_url: this.long_url,
        hash: this.hash
    };
}

module.exports = Record;