angular.module("presenter").controller("PresenterController", function ($scope, $location, presenter, KeyService,
                                                                        KeyCodes) {

    function slideToObj(slide) {
        return slide ? {
            name: slide.getName(),
            path: slide.getPath(),
            templateUrl: slide.getTemplateUrl(),
            data: slide.getData()
        } : null;
    }

    function routeUpdate() {
        var hash = $location.hash();
        var slide = presenter.findSlideBySlug(hash);
        if (slide) {
            $scope.slide = slideToObj(slide);
            $scope.prevSlide = slideToObj(presenter.findPreviousSlideOf(slide));
            $scope.nextSlide = slideToObj(presenter.findNextSlideOf(slide));
        } else {
            $scope.slide = null;
            $location.hash(null);
        }
    }

    $scope.routes = presenter.getRoutes();

    $scope.$on("$routeUpdate", routeUpdate);


    function leftKeyUp() {
        console.log("LEFT...");
    }

    function rightKeyUp() {
        console.log("RIGHT...");
    }

    var removeLeftKeyUpListener = KeyService.addKeyUpListener(KeyCodes.LEFT, leftKeyUp);
    var removeRightKeyUpListener = KeyService.addKeyUpListener(KeyCodes.RIGHT, rightKeyUp);

    $scope.$on("$destroy", function () {
        removeLeftKeyUpListener();
        removeRightKeyUpListener();
    });

    routeUpdate();
});