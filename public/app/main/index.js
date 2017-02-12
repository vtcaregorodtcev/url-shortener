(function() {
    'use strict';

    var angular = require('angular');
    var controller = require('./main.controller');
    var routes = require('./main.routes');

    var styles = require('./main.styles.postcss');

    module.exports = angular
        .module('main', [])
        .controller('MainController', controller)
        .config(routes)
        .name;

})();