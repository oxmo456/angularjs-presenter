angular.module("presenter").factory("Slide", function () {

    function Slide(name, stepCount) {

        this.getName = function () {
            return name;
        };

        this.getStepCount = function () {
            return stepCount;
        };

    }

    return Slide;

});