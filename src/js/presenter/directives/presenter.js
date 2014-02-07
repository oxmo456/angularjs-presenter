angular.module("presenter").directive("presenter", function ($route) {

    return {
        restrict: "E",
        scope: true,
        controller: function ($scope, $attrs) {


            $scope.$on("$routeChangeSuccess", function (event, currentRoute, lastRoute) {

                console.log("ROUTE", currentRoute);



            });

        }

    };

});