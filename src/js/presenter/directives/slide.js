angular.module("presenter").directive("slide", function () {

    return {
        restrict: "E",
        controller: function ($attrs) {
            console.log(">", $attrs.name);
        }
    };


});