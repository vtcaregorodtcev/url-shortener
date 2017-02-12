'use strict';

const path = require('path');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const conf = require('./app.config');

/* ----- connections -------- */

mongoose.connect(conf.mongo_connection, (err) => { if (err) console.log(err); });

/* ----- connections -------- */

const app = express();
app.use(logger(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

['api'].map((route) => {
    require(path.join(__dirname, "/controllers/" + route))(app);
});

if (app.get('env') === 'production') {
    app.use((req, res, next) => {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect(`https://${req.hostname}${req.url}`);
    });
};

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.error(err);

    next(err);
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(conf.port, () => {
    console.log('Express server listening on port ' + conf.port);
});