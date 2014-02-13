angular.module("app").config(function ($routeProvider, $locationProvider, PresenterServiceProvider, PRESENTER) {

    $routeProvider
        .when("/", {
            templateUrl: "/templates/app/home.template.html"
        })
        .when("/presenter", {
            reloadOnSearch: false,
            templateUrl: "/templates/app/presenter.template.html"
        })
        .otherwise({
            redirectTo: "/"
        });

    $locationProvider.html5Mode(false).hashPrefix('!');


    var presenter = PresenterServiceProvider.builder()
        .setName(PRESENTER)
        .setSlideTemplateBasePath("/templates/app/slides/")
        .addSlide("a", "default.template.html")
        .addSlide("b", "default.template.html")
        .addSlide("c", "default.template.html")
        .addSlide("d", "default.template.html")
        .build();

    PresenterServiceProvider.configure(presenter, $routeProvider);

});

