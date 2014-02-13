angular.module("presenter").directive("keyboardSlideController", function (body) {

    var TAB_INDEX = "tabindex";

    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            body.on("keydown", function (event) {
                console.log("...", event);
            });
        }
    }

});