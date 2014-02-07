angular.module("presenter").provider("Presenter", function PresenterProvider(slugify) {

    this.config = function (routeProvider, name, templateUrl) {

        var slug = slugify(name);

        console.log(slug);

        routeProvider.when("/" + slug, {
            reloadOnSearch: false,
            template: "<presenter name=\"" + slug + "\"><div ng-include=\"'" + templateUrl + "'\"></div></presenter>"
        });

    };

    this.$get = function () {
        return null;
    };

});