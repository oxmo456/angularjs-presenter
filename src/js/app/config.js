angular.module("app").config(function ($routeProvider, $locationProvider) {


    $routeProvider.when("/", {
        templateUrl: "/templates/app/home.template.html"
    }).otherwise({
            redirectTo: "/"
        });


    $locationProvider.html5Mode(false).hashPrefix('!');
});

