angular.module("presenter").directive("presenterKeyboardNavigation", function (KeyService, KeyCodes) {

    return {
        restrict: "A",
        require: "presenter",
        link: function (scope, element, attrs, presenterController) {

            function leftKeyUp() {
                presenterController.prev();
            }

            function rightKeyUp() {
                presenterController.next();
            }

            KeyService.addKeyUpListener(KeyCodes.LEFT, leftKeyUp);
            KeyService.addKeyUpListener(KeyCodes.RIGHT, rightKeyUp);


            scope.$on("$destroy", function () {
                KeyService.removeKeyUpListener(KeyCodes.LEFT, leftKeyUp);
                KeyService.removeKeyUpListener(KeyCodes.RIGHT, rightKeyUp);
            });

        }

    };


});