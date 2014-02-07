angular.module("presenter").directive("slide", function () {


    return {
        restrict: "E",
        require: "^presenter",
        templateUrl: "/templates/presenter/directives/slide/slide.template.html",
        replace: true,
        scope: {
            templateUrl: "@"
        },
        controller: function ($scope) {

        },
        link: function (scope, element, args, presenterController) {
            presenterController.registerSlide(element.controller("slide"));
        }
    };

});