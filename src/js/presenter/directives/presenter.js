angular.module("presenter").directive("presenter", function () {

    return {
        restrict: "E",
        link: function (scope, element, attrs) {
            console.log("LINK PRESENTER...", scope);
        }
    };

});