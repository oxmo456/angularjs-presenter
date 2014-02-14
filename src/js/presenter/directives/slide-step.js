angular.module("presenter").directive("slideStep", function (KeyService, KeyCodes) {

    return {
        restrict: "A",
        require: "^slide",
        link: function (scope, element, attribute, slideController) {
            console.log("LINK SLIDE STEP...", scope);


            KeyService.addKeyUpListener(scope, KeyCodes.LEFT, function () {
                console.log("....");
            }, Number.MAX_VALUE);


        }
    };


});