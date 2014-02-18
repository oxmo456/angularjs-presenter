angular.module("presenter").factory("Ready", function ($location, $rootScope) {

    function initializeSlidesByUrl(slides) {
        var map = {};
        for (var i = 0, count = slides.length; i < count; i++) {
            var slide = slides[i];
            map[slide.getRoute().getPath()] = slide;
        }
        return map;
    }

    function initializeRoutes(slides) {
        var routes = [];
        for (var i = 0, count = slides.length; i < count; i++) {
            var slide = slides[i];
            routes.push(slide.getRoute());
        }
        return routes;
    }

    function Ready(presenterState, slides) {
        var slidesByUrlMap;
        var routes;
        var presenter;

        function firstSlide() {
            return slides[0];
        }

        function lastSlide() {
            return slides[slides.length - 1];
        }

        function initialize() {
            slidesByUrlMap = initializeSlidesByUrl(slides);
            routes = initializeRoutes(slides);
            presenter = presenterState.getPresenter();
            $rootScope.$on("$routeUpdate", updateCurrentSlide.bind(this));
            updateCurrentSlide();
        }


        function updateCurrentSlide() {
            var url = $location.url();
            var slide = slidesByUrlMap[url];
            if (slide) {
                var prevSlide = slides[slide.getIndex() - 1] || lastSlide();
                var nextSlide = slides[slide.getIndex() + 1] || firstSlide();
                presenter.slide = {
                    name: slide.getName(),
                    stepIndex: slide.getStepIndex(),
                    templateUrl: slide.getTemplateUrl(),
                    next: nextSlide,
                    prev: prevSlide
                };
            } else {
                $location.url(firstSlide().getRoute().getPath());
            }
        }

        this.dispose = function () {
            //TODO;
        };

        this.next = function () {
            $location.url(presenter.slide.next.getRoute().getPath());
        };

        this.prev = function () {
            $location.url(presenter.slide.prev.getRoute().getPath());
        };

        initialize();

    }

    return Ready;

});