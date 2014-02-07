angular.module("presenter").directive("step", function () {

    return {
        restrict: "E",
        controller: function ($attrs) {
            console.log("  >", $attrs.name);
        }
    };


});