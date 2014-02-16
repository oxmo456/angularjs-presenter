angular.module("presenter").factory("Initialize", function ($http, $timeout, InitializationFailure, Initialized, INITIALIZATION_COMPLETE, INITIALIZATION_FAILURE) {

    function Initialize(state) {

        function initializationFailure() {
            state.set(new InitializationFailure(state));
        }

        function dataIsValid(data) {
            //TODO
            return true;
        }

        function initialize() {
            $timeout(function () {
                $http.get(state.getPresenter().getConfigurationUrl()).then(function success(response) {
                    var data = response.data;
                    if (dataIsValid(data)) {
                        state.set(new Initialized(state, data));
                    } else {
                        initializationFailure();
                    }
                }, function failure() {
                    initializationFailure();
                });
            }, 5000);
        }

        this.isInitialized = function () {
            return false;
        };

        this.initialize = angular.noop;

        this.addInitializationCompleteListener = function (listener) {
            state.getEventDispatcher().addEventListener(INITIALIZATION_COMPLETE, listener);
        };

        this.addInitializationFailureListener = function (listener) {
            state.getEventDispatcher().addEventListener(INITIALIZATION_FAILURE, listener);
        };

        this.removeInitializationCompleteListener = function (listener) {
            state.getEventDispatcher().removeEventListener(INITIALIZATION_COMPLETE, listener);
        };

        this.removeInitializationFailureListener = function (listener) {
            state.getEventDispatcher().removeEventListener(INITIALIZATION_FAILURE, listener);
        };

        initialize();


    }

    return Initialize;

});