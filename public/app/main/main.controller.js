(function() {
    'use strict';

    mainController.$inject = ['$scope', 'Helper', 'UrlService'];

    function mainController($scope, helper, urlService) {
        var vm = this;

        vm.process = processFunc;

        function processFunc() {
            if (!vm.longUrl) return false;

            if (!checkUrl(vm.longUrl))
                setMsgs({
                    errMsg: "Url is not valid",
                    msg: ""
                });
            else {
                setMsgs({
                    errMsg: "",
                    msg: ""
                });

                urlService
                    .generateShortUrl(vm.longUrl)
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
            var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            vm.shortUrl = host.concat("/" + hash);
        }

        function checkUrl(url) {
            return helper.validUrl.test(url)
        }
    }

    module.exports = mainController;
})();