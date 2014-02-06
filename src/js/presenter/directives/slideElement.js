angular.module("presenter").directive("slideElement", function () {

    var SLIDE_ELEMENT_CLASS_NAME = "slide-element";
    var SLIDE_ELEMENT_VISIBLE_CLASS_NAME = "slide-element-visible";
    var SLIDE_ELEMENT_HIDDEN_CLASS_NAME = "slide-element-hidden";

    return {
        restrict: "A",
        require: "^slide",
        templateUrl: "/templates/presenter/directives/slide/slide-element.template.html",
        transclude: true,
        scope: true,
        controller: function ($scope, $element) {

            console.log("            SLIDE ELEMENT");

            $element.addClass(SLIDE_ELEMENT_CLASS_NAME);

            function hideElement() {
                $element.addClass(SLIDE_ELEMENT_HIDDEN_CLASS_NAME);
                $element.removeClass(SLIDE_ELEMENT_VISIBLE_CLASS_NAME);
            }

            function showElement() {
                $element.removeClass(SLIDE_ELEMENT_HIDDEN_CLASS_NAME);
                $element.addClass(SLIDE_ELEMENT_VISIBLE_CLASS_NAME);
            }

            this.show = showElement;
            this.hide = hideElement;

            hideElement();

        },
        link: function (scope, element, arguments, slideController) {
            slideController.register(element.controller("slideElement"));
        }
    };


});