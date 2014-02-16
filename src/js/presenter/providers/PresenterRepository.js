angular.module("presenter").provider("PresenterRepository", function PresenterRepositoryProvider() {

    function Configuration() {

        var presentersConfigurations = [];

        this.add = function (name, configurationUlr, autoInitialize) {
            presentersConfigurations.push({
                name: name,
                autoInitialize: autoInitialize,
                configurationUrl: configurationUlr
            });
        };

        this.getPresentersConfigurations = function () {
            return presentersConfigurations;
        };

    }

    function PresenterRepository(configuration, Presenter, Option) {

        var presentersByName = {};

        function initialize(configuration, presentersByName) {
            var presentersConfigurations = configuration.getPresentersConfigurations();

            for (var i = 0, count = presentersConfigurations.length; i < count; i++) {
                var configuration = presentersConfigurations[i];
                var presenterName = configuration.name;
                if (angular.isUndefined(presentersByName[presenterName])) {
                    var presenter = new Presenter(
                        presenterName,
                        configuration.configurationUrl,
                        configuration.autoInitialize
                    );
                    presentersByName[presenterName] = presenter;
                } else {
                    throw new Error("Duplicated presenter name error");
                }
            }

        }

        this.findPresenterByName = function (name) {
            return new Option(presentersByName[name]);
        };

        initialize(configuration, presentersByName);

    }

    var configuration = new Configuration();

    this.add = configuration.add;

    this.$get = function (Presenter, Option) {
        return new PresenterRepository(configuration, Presenter, Option);
    };

});
