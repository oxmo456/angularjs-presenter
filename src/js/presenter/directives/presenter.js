angular.module("presenter").directive("presenter", function () {

    var PRESENTER_ATTRIBUTE = "presenter";
    var PRESENTER_ID_ATTRIBUTE = "presenterId";
    var ROUTE_UPDATE_EVENT = "$routeUpdate";


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
                    this.slide = slideToObj(slide);
                    this.prevSlide = slideToObj(presenter.findPreviousSlideOf(slide));
                    this.nextSlide = slideToObj(presenter.findNextSlideOf(slide));
                } else {
                    this.nextSlide = this.prevSlide = this.slide = null;
                    $location.hash(null);
                }
            }

            this.routes = presenter.getRoutes();
            this.slide = null;
            this.prevSlide = null;
            this.nextSlide = null;

            this.prev = function () {
                if (this.prevSlide) {
                    $location.hash(this.prevSlide.slug);
                }
            };

            this.next = function () {
                if (this.nextSlide) {
                    $location.hash(this.nextSlide.slug);
                }
            };

            $scope.$on(ROUTE_UPDATE_EVENT, routeUpdate.bind(this));
            routeUpdate.bind(this)();

        }
    };

});