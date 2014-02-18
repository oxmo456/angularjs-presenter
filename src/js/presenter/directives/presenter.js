angular.module("app").directive("presenter", function () {

    return {
        restrict: "E",
        templateUrl: "/templates/presenter/directives/presenter.template.html",
        replace: true,
        controller: "PresenterController",
        link: function (scope, element, attribute) {
        }
    };

});