angular.module("presenter").factory("Presenter", function ($http, $q, EventDispatcher, PresenterState, Pending, Initialize) {


    function Presenter(name, configurationUrl, autoInitialize) {
        var eventDispatcher = new EventDispatcher();
        var routesDeferred = $q.defer();
        var state = new PresenterState(this, eventDispatcher, routesDeferred);
        if (autoInitialize) {
            state.set(new Initialize(state));
        } else {
            state.set(new Pending(state));
        }


        this.isInitialized = function () {
            return state.get().isInitialized();
        };

        this.initialize = function () {
            return state.get().initialize();
        };

        this.addInitializationCompleteListener = function (listener) {
            return state.get().addInitializationCompleteListener(listener);
        };

        this.addInitializationFailureListener = function (listener) {
            return state.get().addInitializationFailureListener(listener);
        };

        this.removeInitializationCompleteListener = function (listener) {
            return state.get().removeInitializationCompleteListener(listener);
        };

        this.removeInitializationFailureListener = function (listener) {
            return state.get().removeInitializationFailureListener(listener);
        };

        this.getRoutes = function () {
            return routesDeferred.promise;
        };

        this.getName = function () {
            return name;
        };

        this.getConfigurationUrl = function () {
            return configurationUrl;
        };


    }

    return Presenter;

});