angular.module("presenter").factory("Initialize", function ($http, $q, Slide, SlideRoute, Ready, InitializationFailure,
                                                            slugify) {

    function loadSlides(source) {

        var deferred = $q.defer();
        var path = (function (source) {
            var prefix = source + "slide-";
            var postfix = ".template.html";
            return function (id) {
                return prefix + id + postfix;
            };
        })(source);

        function loadSlide(path, id, slides, deferred) {
            $http.get(path(id), {cache: true}).then(function success(response) {
                slides.push({
                    templateUrl: path(id),
                    template: response.data
                });
                loadSlide(path, ++id, slides, deferred);
            }, function failure() {
                deferred.resolve(slides);
            });
        }

        var slides = [];

        loadSlide(path, 0, slides, deferred);

        return deferred.promise;

    }

    function validateLoadedSlides(slides) {
        var result;
        if (slides && slides.length > 0) {
            result = slides;
        } else {
            result = $q.reject();
        }
        return result;
    }

    function createRoute(slideName, basePath, slideSlug, stepIndex) {
        return new SlideRoute(slideName, basePath + "#" + slideSlug + (angular.isDefined(stepIndex) ? "~" + stepIndex : ""));
    }

    function createSlides(presenter) {
        return function (slides) {
            var result = [];
            var basePath = presenter.getBasePath();
            var slideIndex = 0;
            for (var i = 0, count = slides.length; i < count; i++) {
                var slide = slides[i];
                var rawElement = angular.element(slide.template)[0];
                var slideName = rawElement.getAttribute("slide");
                var slideSlug = slugify(slideName);
                var stepCount = rawElement.querySelectorAll("[step]").length;
                if (stepCount === 0) {
                    result.push(new Slide(
                        slideIndex++,
                        slideName,
                        slideSlug,
                        slide.templateUrl,
                        createRoute(slideName, basePath, slideSlug),
                        null
                    ));
                } else {
                    for (var j = 0; j < stepCount; j++) {
                        result.push(new Slide(
                            slideIndex++,
                            slideName,
                            slideSlug,
                            slide.templateUrl,
                            createRoute(slideName, basePath, slideSlug, j),
                            j
                        ));
                    }
                }

            }
            return result;
        };
    }

    function Initialize(presenterState) {

        function initialize(presenterState) {
            var presenter = presenterState.getPresenter();
            var source = presenter.getSource();
            loadSlides(source)
                .then(validateLoadedSlides)
                .then(createSlides(presenter))
                .then(function success(slides) {
                    presenterState.set(new Ready(presenterState, slides));
                }, function failure() {
                    presenterState.set(new InitializationFailure(presenterState));
                });
        }

        this.dispose = function () {
            //TODO
        };

        this.next = function () {
            //TODO;
        };

        this.prev = function () {
            //TODO;
        };

        initialize(presenterState);

    }

    return Initialize;

});