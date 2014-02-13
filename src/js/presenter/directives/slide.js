angular.module("presenter").directive("slide", function () {

    return {
        restrict: "E",
        link: function (scope, element, attribute) {
            console.log("LINK SLIDE...", scope);


        }
    };


});