angular.module("presenter").directive("presenterKeyboardNavigation", function (KeyService, KeyCodes) {

    return {
        restrict: "A",
        require: "presenter",
        link: function (scope, element, attrs, presenterController) {
            console.log("presenter navigation...");

            function leftKeyUp() {
                presenterController.prev();
            }

            function rightKeyUp() {
                presenterController.next();
            }

            KeyService.addKeyUpListener(scope, KeyCodes.LEFT, leftKeyUp);
            KeyService.addKeyUpListener(scope, KeyCodes.RIGHT, rightKeyUp);


        }

    };


});