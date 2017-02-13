(function() {
    'use strict';

    alphaNumeric.$inject = ['Helper'];

    function alphaNumeric(helper) {
        return {
            restrict: "A",
            link: link
        };

        function link(scope, elem, attrs) {
            elem.bind("keydown keypress", function(e) {
                var val = e.target.value;

                if (val)
                    if (!helper.onlyDigitsCharsRegexp.test(val + e.key))
                        return event.preventDefault();
            });

            scope.$on('$destroy', function() {
                elem.unbind('keydown keypress');
            });
        }
    }

    module.exports = alphaNumeric;
})();