(function() {
    'use strict';

    var angular = require('angular');
    var alphaNumeric = require('./alpha-numeric');
    var copyClipboard = require('./copy-clipboard');

    module.exports = angular
        .module('core.directives', [])
        .directive('alphaNumeric', alphaNumeric)
        .directive('copyClipboard', copyClipboard)
        .name;

})();