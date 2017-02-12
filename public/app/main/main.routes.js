(function() {
    'use strict';

    routing.$inject = ['$stateProvider'];

    function routing($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                template: require('./main.template.html'),
                controller: 'MainController',
                controllerAs: 'mc'
            });
    }

    module.exports = routing;

})();