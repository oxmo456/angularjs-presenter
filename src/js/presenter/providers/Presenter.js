angular.module("presenter").provider("Presenter", function PresenterProvider(slugify) {

    var CHANGE = "change";
    var configData = [];

    function Slide(index, name, slug, templateUrl) {

        this.getIndex = function () {
            return index;
        };

        this.getName = function () {
            return name;
        };

        this.getSlug = function () {
            return slug;
        };

        this.getTemplateUrl = function () {
            return templateUrl;
        };
    }

    function Presenter(rootScope, location, name, slides) {
        var dispatcher = rootScope.$new(true);
        var currentSlide = slides[0];
        var slidesBySlug = {};
        angular.forEach(slides, function (slide) {
            slidesBySlug[slide.getSlug()] = slide;
        });

        this.getName = function () {
            return name;
        };

        this.getSlug = function () {
            return name;
        };

        this.getRoutes = function () {
            return [];
        };

        this.getFirstSlidePath = function () {
            return slugify(name) + "/" + slides[0].getSlug() + "/0";
        };

        this.getCurrentSlideTemplateUrl = function () {
            return currentSlide.getTemplateUrl();
        };

        this.addChangeListener = function (listener) {
            return dispatcher.$on(CHANGE, listener);
        };

        this.next = function () {
            var index = currentSlide.getIndex();
            index++;
            if (index >= slides.length)index = 0;
            var slide = slides[index];
            location.path(slugify(name) + "/" + slide.getSlug() + "/0");
        };

        this.prev = function () {
            var index = Math.max(currentSlide.getIndex() - 1, 0);
            var slide = slides[index];
            location.path(slugify(name) + "/" + slide.getSlug() + "/0");
        };

        this.show = function (slideSlug, step) {
            var slide = slidesBySlug[slideSlug];
            var result;
            if (slide) {
                result = true;
                currentSlide = slide;
                dispatcher.$broadcast(CHANGE, this);
            } else {
                result = false;
            }
            return result;
        };

    }

    function PresenterService(rootScope, location, presenters) {
        var dispatcher = rootScope.$new(true);
        var presentersByName = {};
        var presentersBySlug = {};
        var routes = [];
        for (var i = 0, count = presenters.length; i < count; i++) {
            var presenter = presenters[i];
            routes.push({
                name: presenter.getName(),
                routes: presenter.getRoutes()
            });
            presentersByName[presenter.getName()] = presenter;
            presentersBySlug[presenter.getSlug()] = presenter;
        }

        this.get = function (value, throwNotFoundError) {
            var presenter = presentersByName[value] || presentersBySlug[value];
            if (throwNotFoundError && !presenter) {
                throw new Error("Presenter '" + value + "'not found");
            }
            return presenter;
        };

        rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            var presenter = currentRoute.$$route ? presenters[currentRoute.$$route.presenterIndex] : null;
            if (presenter) {
                var params = currentRoute.params;
                if (!presenter.show(params.slide, params.step)) {
                    console.log("slide not found...");
                    location.path(presenter.getFirstSlidePath());
                }
            }
        });

    }

    function PresenterBuilder() {
        //TODO check if a presenter with the same SLUG exists ?
        var slides = [];
        var name = null;
        var templateUrl = null;
        var routeProvider = null;

        this.appendSlide = function (slideName, slideTemplateUrl) {
            slides.push(new Slide(slides.length, slideName, slugify(slideName), slideTemplateUrl));
            return this;
        };

        this.setRouteProvider = function (value) {
            routeProvider = value;
            return this;
        };

        this.setName = function (value) {
            name = value;
            return this;
        };

        this.setTemplateUrl = function (value) {
            templateUrl = value;
            return this;
        };

        this.build = function () {
            if (slides.length === 0 || !name || !templateUrl || !routeProvider) {
                throw new Error("Invalid Presenter configuration");
            }
            var presenterSlug = slugify(name);
            var presenterBaseRoute = "/" + presenterSlug;
            var data = {name: name, slides: slides};
            routeProvider.when(presenterBaseRoute + "/:slide/:step", {
                templateUrl: templateUrl,
                presenterIndex: configData.length
            });
            routeProvider.when(presenterBaseRoute + "/:slide", {
                redirectTo: function (parameters, path) {
                    return path + "/0";
                }
            });
            configData.push(data);
        };

    }


    this.builder = function () {
        return new PresenterBuilder();
    };

    this.$get = function ($rootScope, $location) {
        var presenters = [];
        angular.forEach(configData, function (data) {
            presenters.push(new Presenter($rootScope, $location, data.name, data.slides));
        });
        return new PresenterService($rootScope, $location, presenters);
    };

});