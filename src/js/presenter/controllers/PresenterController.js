angular.module("presenter").controller("PresenterController", function PresenterController($scope, $attrs, Presenter) {

    var SOURCE_ATTRIBUTE = "src";
    $scope.presenter = null;

    function sourceChange(source) {
        if ($scope.presenter) {
            $scope.presenter.dispose();
        } else {
            $scope.presenter = new Presenter(source);
        }

    }

    $scope.$watch($attrs[SOURCE_ATTRIBUTE], sourceChange);

});