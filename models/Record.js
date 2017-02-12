'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    long_url: { type: String },
    short_url: { type: String },
    hash: { type: String },
    updated_at: { type: Date },
    amount_usage: { type: Number, default: 0 }
});

let Record = mongoose.model('Record', schema);

module.exports = Record;