angular.module("presenter").controller("PresenterController", function ($scope, $location, presenter, KeyService,
                                                                        KeyCodes) {

    function slideToObj(slide) {
        return slide ? {
            name: slide.getName(),
            slug: slide.getSlug(),
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
        if ($scope.prevSlide) {
            $location.hash($scope.prevSlide.slug);
        }
    }

    function rightKeyUp() {
        if ($scope.nextSlide) {
            $location.hash($scope.nextSlide.slug);
        }

    }

    KeyService.addKeyUpListener($scope, KeyCodes.LEFT, leftKeyUp);
    KeyService.addKeyUpListener($scope, KeyCodes.RIGHT, rightKeyUp);

    routeUpdate();
});