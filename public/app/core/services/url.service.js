(function() {
    'use strict';

    urlService.$inject = ['$http'];

    function urlService($http) {
        var api = process.env.BASE_API;

        return {
            urlIsFree: urlIsFree,
            generateShortUrl: generateShortUrl,
            resolveLongUrl: resolveLongUrl
        };

        function urlIsFree(shortUrl) {
            return $http.post(api + "/isurlfree", { shortUrl: shortUrl })
                .then(function(res) {
                    return res.data;
                })
        }

        function generateShortUrl(longUrl) {
            return $http.post(api + "/shorturl", { longUrl: longUrl })
                .then(function(res) {
                    return res.data;
                })
        }

        function resolveLongUrl(hash) {
            return $http.post(api + "/resolve", { hash: hash })
                .then(function(res) {
                    location.href = res.data;
                });
        }
    }

    module.exports = urlService;
})();