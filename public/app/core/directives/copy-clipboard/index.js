(function() {
    'use strict';

    copyClipboard.$inject = [];

    function copyClipboard() {
        return {
            restrict: "A",
            scope: { text: "=" },
            template: "<img ng-click='copy()' class='copy-icon' src='http://www.readyicons.com/IconSets/Sky_Light_(Basic)/32x32-save.png' />",
            link: link
        };

        function link(scope, elem, attrs) {
            scope.copy = copy;

            function copy() {
                var textArea = document.createElement("textarea");

                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;
                textArea.style.width = '2em';
                textArea.style.height = '2em';
                textArea.style.padding = 0;

                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';
                textArea.style.background = 'transparent';

                textArea.value = scope.text;

                document.body.appendChild(textArea);

                textArea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Copying text command was ' + msg);
                } catch (err) {
                    console.log('Oops, unable to copy');
                }

                document.body.removeChild(textArea);
            }
        }
    }

    module.exports = copyClipboard;
})();