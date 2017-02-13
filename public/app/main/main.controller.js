(function() {
    'use strict';

    mainController.$inject = ['$scope', 'Helper', 'UrlService'];

    function mainController($scope, helper, urlService) {
        var vm = this;

        vm.host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/";
        vm.shortUrl = vm.host;

        vm.onlyDigitsCharsRegexp = helper.onlyDigitsCharsRegexp;

        vm.process = processFunc;

        function processFunc() {
            if (!vm.longUrl) return false;

            if (!checkUrl(vm.longUrl))
                setMsgs({ errMsg: "Url is not valid" });
            else {
                setMsgs({});

                urlService
                    .generateShortUrl(vm.longUrl, vm.hash, vm.host)
                    .then(function(data) {
                        setMsgs(data);
                        setShortUrl(data.doc.hash);
                    });
            }
        }

        function setMsgs(data) {
            vm.errMsg = data.errMsg;
            vm.msg = data.msg;
        }

        function setShortUrl(hash) {
            vm.shortUrl = vm.host.concat(hash);
            vm.hash = hash;
        }

        function checkUrl(url) {
            return helper.validUrl.test(url);
        }
    }

    module.exports = mainController;
})();