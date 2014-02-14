angular.module("presenter").directive("presenter", function () {

    var PRESENTER_ATTRIBUTE = "presenter";
    var PRESENTER_ID_ATTRIBUTE = "presenterId";


    return {
        restrict: "A",
        controller: function ($scope, $attrs, $location, PresenterService) {
            var presenter = PresenterService.get($attrs[PRESENTER_ID_ATTRIBUTE]);
            $scope[PRESENTER_ATTRIBUTE] = this;

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

            this.routes = presenter.getRoutes();

            this.prev = function () {
                if ($scope.prevSlide) {
                    $location.hash($scope.prevSlide.slug);
                }
            };

            this.next = function () {
                if ($scope.nextSlide) {
                    $location.hash($scope.nextSlide.slug);
                }
            };

            $scope.$on("$routeUpdate", routeUpdate);

            routeUpdate();

        }
    };

});