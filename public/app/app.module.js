(function() {
    'use strict';

    var angular = require('angular');
    var router = require('angular-ui-router');

    var config = require('./app.config');

    var core = require('./core');
    var main = require('./main');

    angular
        .module('app', [
            //libs
            router,

            //blocks
            core,
            main
        ])
        .config(config);

})();