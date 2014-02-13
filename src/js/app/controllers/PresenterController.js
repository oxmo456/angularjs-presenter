angular.module("app").controller("PresenterController", function ($scope, PresenterService, PRESENTER) {

    var presenter = PresenterService.get(PRESENTER);
    $scope.presenterRoutes = presenter.getRoutes();

    console.log(presenter);


});