(function() {
    'use strict';

    helper.$inject = [];

    function helper() {
        var validUrl = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

        return {
            validUrl: validUrl
        };
    }

    module.exports = helper;
})();