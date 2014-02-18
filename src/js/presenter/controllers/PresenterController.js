angular.module("presenter").controller("PresenterController", function PresenterController($scope, $attrs, $element,
                                                                                           $location, $timeout,
                                                                                           Presenter) {

    var SOURCE_ATTRIBUTE = "src";
    $scope.presenter = null;

    function sourceChange(source) {
        if ($scope.presenter) {
            $scope.presenter.dispose();
        } else {
            $scope.presenter = new Presenter(source, $location.path());
        }
    }

    $scope.$watch($attrs[SOURCE_ATTRIBUTE], sourceChange);

    $element.on("$destroy", function () {
        if ($scope.presenter) {
            $scope.presenter.dispose();
        }
    });


    var stepIndex = 0;
    this.nextStepIndex = function () {
        return stepIndex++;
    };

});