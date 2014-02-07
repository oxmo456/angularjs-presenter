angular.module("app").config(function ($routeProvider, $locationProvider, PresenterProvider) {

    $routeProvider.when("/", {
        templateUrl: "/templates/app/home.template.html"
    }).otherwise({
            redirectTo: "/"
        });


    $locationProvider.html5Mode(false).hashPrefix('!');

    PresenterProvider.config($routeProvider, "Angular is great !", "/templates/app/slides/slides.template.html");

});

