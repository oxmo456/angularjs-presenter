angular.module("presenter").provider("PresenterService", function PresenterServiceProvider(slugify, iterator) {
    var SLASH = "/";
    var presenters = {};

    function Slide(name, path, templateUrl) {

        this.getName = function () {
            return name;
        };

        this.getPath = function () {
            return path;
        };

        this.getTemplateUrl = function () {
            return templateUrl;
        };

    }

    function Presenter(name, slides) {

        this.getName = function () {
            return name;
        };

        this.getSlidesIterator = function () {
            return iterator(slides);
        };

        this.getRoutes = function () {
            var routes = [];
            for (var i = 0, count = slides.length; i < count; i++) {
                var slide = slides[i];
                routes.push({
                    name: slide.getName(),
                    path: slide.getPath()
                });
            }
            return routes;
        };

    }

    function PresenterBuilder() {

        var name;
        var slideTemplateBasePath = "";
        var slides = [];

        this.setName = function (value) {
            name = value;
            return this;
        };

        this.setSlideTemplateBasePath = function (value) {
            slideTemplateBasePath = value;
            return this;
        };

        this.addSlide = function (name, templateUrl) {
            slides.push({name: name, templateUrl: templateUrl});
            return this;
        };

        this.build = function () {
            //TODO add parameters validation
            var presenterSlug = slugify(name);
            for (var i = 0, count = slides.length; i < count; i++) {
                var slideData = slides[i];
                var slideName = slideData.name;
                var slideSlug = slugify(slideName);
                var path = SLASH + presenterSlug + SLASH + slideSlug;
                slides[i] = new Slide(slideName, path, slideTemplateBasePath + slideData.templateUrl);
            }
            return new Presenter(name, slides);
        };

    }


    this.builder = function () {
        return new PresenterBuilder();
    };

    this.configure = function (presenter, routeProvider) {
        var presenterName = presenter.getName();
        if (angular.isDefined(presenters[presenterName])) {
            throw new Error("A presenter named '" + presenterName + "' exists");
        }
        presenters[presenterName] = presenter;
        var slides = presenter.getSlidesIterator();
        var slide = null;
        var prevSlide;
        var nextSlide;
        slide = slides.next();
        while (slide) {
            nextSlide = slides.next();
            routeProvider.when(slide.getPath(), {
                templateUrl: slide.getTemplateUrl(),
                controller: "SlideController",
                presenter: presenter,
                slide: slide,
                prevSlide: prevSlide,
                nextSlide: nextSlide
            });
            prevSlide = slide;
            slide = nextSlide;

        }
    };

    function PresenterService(presenters) {

        this.get = function (presenterName) {
            return presenters[presenterName];
        };

    }

    this.$get = function () {
        return new PresenterService(presenters);
    };

});