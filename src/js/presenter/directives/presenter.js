angular.module("presenter").directive("presenter", function ($route) {

    return {
        restrict: "E",
        scope: true,
        controller: function ($scope, $attrs) {

            console.log("INIT...");

            $scope.$on("$routeUpdate", function (event, currentRoute, lastRoute) {

                console.log("ROUTE UPDATE", currentRoute);



            });

        }

    };

});