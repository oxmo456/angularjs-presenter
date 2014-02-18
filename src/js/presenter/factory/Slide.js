angular.module("presenter").factory("Slide", function () {

    function Slide(index, name, slug, templateUrl, route, stepIndex) {


        this.getIndex = function () {
            return index;
        };

        this.getName = function () {
            return name;
        };

        this.getSlug = function () {
            return slug;
        };

        this.getTemplateUrl = function () {
            return templateUrl;
        };

        this.getRoute = function () {
            return route;
        };

        this.getStepIndex = function () {
            return stepIndex;
        };

    }

    return Slide;

});