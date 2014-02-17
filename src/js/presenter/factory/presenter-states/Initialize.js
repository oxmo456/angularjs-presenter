angular.module("presenter").factory("Initialize", function ($http, $q, Slide) {

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
            $http.get(path(id)).then(function success(response) {
                slides.push(response.data);
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

    function extractSlidesData(slides) {

        var result = [];
        for (var i = 0, count = slides.length; i < count; i++) {
            var slide = slides[i];
            var rawElement = angular.element(slide)[0];
            result.push(new Slide(
                rawElement.getAttribute("slide"),
                rawElement.querySelectorAll("[step]").length
            ));
        }

        return result;
    }

    function Initialize(presenterState) {


        function initialize() {
            var source = presenterState.getPresenter().getSource();

            loadSlides(source)
                .then(validateLoadedSlides)
                .then(extractSlidesData)
                .then(function success(slides) {

                    console.log("OK", slides);

                }, function failure() {

                    console.log("KO");

                });
        }


        this.dispose = function () {
            //TODO
        };

        initialize();


    }

    return Initialize;

});