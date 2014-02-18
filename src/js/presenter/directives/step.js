angular.module("presenter").directive("step", function () {

    var HIDDEN_STEP_CLASS = "hidden-step";

    var STEP_ATTRIBUTE_NAME = "step";

    function initializeStepIndex(attrs, presenterController) {
        var stepIndex;
        stepIndex = parseInt(attrs[STEP_ATTRIBUTE_NAME]);
        if (isNaN(stepIndex)) {
            stepIndex = presenterController.nextStepIndex()
        }
        return stepIndex;
    }

    return {
        restrict: "A",
        require: "^presenter",
        link: function (scope, element, attrs, presenterController) {

            var stepIndex = initializeStepIndex(attrs, presenterController);

            function stepIndexChange(value) {
                if (stepIndex > value) {
                    element.addClass(HIDDEN_STEP_CLASS);
                } else {
                    element.removeClass(HIDDEN_STEP_CLASS);
                }
            }

            scope.$watch("presenter.slide.stepIndex", stepIndexChange);

        }

    };


});