angular.module("presenter").provider("PresenterService", function PresenterServiceProvider(slugify, iterator) {
    var SLASH = "/";
    var DASH = "#";
    var presenters = {};

    function Slide(index, name, path, templateUrl, data) {

        var slug = slugify(name);

        this.getData = function () {
            return data;
        };

        this.getIndex = function () {
            return index;
        };

        this.getName = function () {
            return name;
        };

        this.getSlug = function () {
            return slug;
        };

        this.getPath = function () {
            return path;
        };

        this.getTemplateUrl = function () {
            return templateUrl;
        };

    }


    function Presenter(name, slides) {

        var slug = slugify(name);
        var slidesBySlug = {};
        for (var i = 0, count = slides.length; i < count; i++) {
            var slide = slides[i];
            slidesBySlug[slide.getSlug()] = slide;
        }

        this.getName = function () {
            return name;
        };

        this.getSlidesIterator = function () {
            return iterator(slides);
        };

        this.getSlug = function () {
            return slug;
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

        this.findSlideBySlug = function (slug) {
            return slidesBySlug[slug];
        };

        function findSlideByIndex(index) {
            return slides[index] || null;
        }

        this.findPreviousSlideOf = function (slide) {
            var result;
            try {
                result = findSlideByIndex(slide.getIndex() - 1);
            } catch (e) {
                result = null;
            }
            return result;
        };

        this.findNextSlideOf = function (slide) {
            var result;
            try {
                result = findSlideByIndex(slide.getIndex() + 1);
            } catch (e) {
                result = null;
            }
            return result;
        };

    }

    function SlideFactory(presenterSlug, slideTemplateBasePath) {
        this.create = function (data) {
            var slideName = data.name;
            var slideSlug = slugify(slideName);
            var path = SLASH + presenterSlug + DASH + slideSlug;
            return new Slide(data.index, slideName, path, slideTemplateBasePath + data.templateUrl, data.data);
        }

    }

    function PresenterBuilder() {

        var name;
        var slideTemplateBasePath = "";
        var slides = [];

        this.setName = function (value) {
            name = value;
            return this;
        };

        this.setSlidesTemplateBasePath = function (value) {
            slideTemplateBasePath = value;
            return this;
        };

        this.addSlide = function (name, templateUrl, data) {
            slides.push({index: slides.length, name: name, templateUrl: templateUrl, data: data || null});
            return this;
        };

        this.build = function () {
            //TODO add parameters validation
            var presenterSlug = slugify(name);
            var slideFactory = new SlideFactory(presenterSlug, slideTemplateBasePath);
            slides = slides.map(function (slideData) {
                return slideFactory.create(slideData);
            });
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

        routeProvider.when(SLASH + presenter.getSlug(), {
            reloadOnSearch: false,
            templateUrl: "/templates/presenter/presenter.template.html"
        });
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
