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

            console.log("        SLIDE");

            var slideElements = [];
            var currentSlideElementIndex = 0;
            var currentSlideElement = null;

            function update() {
                var slideElement = slideElements[currentSlideElementIndex];
                if (slideElement && slideElement !== currentSlideElement) {
                    slideElement.show();
                }
            }

            $scope.visible = false;

            this.show = function () {
                $scope.visible = true;
                update();
            };

            this.hide = function () {
                $scope.visible = false;
            };

            this.register = function (slideElement) {
                slideElements.push(slideElement);
                update();
            };

        },
        link: function (scope, element, arguments, presenterController) {
            presenterController.registerSlide(element.controller("slide"));
        }
    };

});