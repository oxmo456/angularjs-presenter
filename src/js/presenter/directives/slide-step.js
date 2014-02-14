angular.module("presenter").directive("slideStep", function (KeyService, KeyCodes) {

    return {
        restrict: "A",
        require: "^slide",
        link: function (scope, element, attribute, slideController) {

            function left(event) {
                event.stopPropagation();
            }

            KeyService.addKeyUpListener(KeyCodes.LEFT, left, Number.MAX_VALUE);

            element.on("$destroy", function () {
                KeyService.removeKeyUpListener(KeyCodes.LEFT, left);
            });

        }
    };


});