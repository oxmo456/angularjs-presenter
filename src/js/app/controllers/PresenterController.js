angular.module("app").controller("PresenterController", function ($scope, Presenter) {

    var presenter = Presenter.get("presenter");

    $scope.prev = function () {
        console.log("prev");
        presenter.prev();
    };

    $scope.next = function () {
        console.log("next");
        presenter.next();
    };

});