angular.module("presenter").controller("SlideController", function ($scope, $route) {

    function injectSlideInformation(slideName, scope, route) {
        var slide = route.current.$$route[slideName];
        if (slide) {
            scope[slideName] = {
                name: slide.getName(),
                path: slide.getPath()
            };
        }
    }


    var context = $scope["presenter"] = {};

    injectSlideInformation("slide", context, $route);
    injectSlideInformation("nextSlide", context, $route);
    injectSlideInformation("prevSlide", context, $route);

    console.log($scope);

});