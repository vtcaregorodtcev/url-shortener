(function() {
    'use strict';

    var angular = require('angular');
    var helper = require('./helper');
    var urlService = require('./url.service');

    module.exports = angular
        .module('core.services', [])
        .factory('Helper', helper)
        .factory('UrlService', urlService)
        .name;

})();