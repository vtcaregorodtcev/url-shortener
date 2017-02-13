(function() {
    'use strict';

    helper.$inject = [];

    function helper() {
        var validUrl = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        var onlyDigitsCharsRegexp = /^[a-z0-9]+$/i;

        return {
            validUrl: validUrl,
            onlyDigitsCharsRegexp: onlyDigitsCharsRegexp
        };
    }

    module.exports = helper;
})();