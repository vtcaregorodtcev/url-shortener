(function() {
    'use strict';

    routing.$inject = ['$locationProvider', '$stateProvider'];

    function routing($locationProvider, $stateProvider) {
        $stateProvider
            .state('redirect', {
                url: '/:hash',
                resolve: {
                    longUrl: resolveLongUrl
                }
            });

        $locationProvider.html5Mode(true);
    }

    resolveLongUrl.$inject = ['UrlService', '$stateParams'];

    function resolveLongUrl(urlService, stateParams) {
        return urlService.resolveLongUrl(stateParams.hash);
    }

    module.exports = routing;
})();