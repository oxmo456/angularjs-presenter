angular.module("presenter").factory("SlideRoute", function () {

    function SlideRoute(name, path) {

        this.getName = function () {
            return name;
        };

        this.getPath = function () {
            return path;
        };

    }

    return SlideRoute;

});