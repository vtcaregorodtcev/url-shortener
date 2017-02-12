(function() {
    'use strict';

    var angular = require('angular');
    var services = require('./services');

    module.exports = angular
        .module('core', [
            services
        ])
        .name;

})();