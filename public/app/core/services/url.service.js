(function() {
    'use strict';

    urlService.$inject = ['$http'];

    function urlService($http) {
        var api = process.env.BASE_API;

        return {
            generateShortUrl: generateShortUrl,
            resolveLongUrl: resolveLongUrl
        };

        function generateShortUrl(longUrl, hash, host) {
            return $http.post(api + "/shorturl", {
                    longUrl: longUrl,
                    hash: hash,
                    host: host
                })
                .then(function(res) {
                    return res.data;
                });
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