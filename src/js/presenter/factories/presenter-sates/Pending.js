angular.module("presenter").factory("Pending", function (Initialize, INITIALIZATION_COMPLETE, INITIALIZATION_FAILURE) {


    function Pending(state) {

        this.isInitialized = function () {
            return false;
        };

        this.initialize = function () {
            state.set(new Initialize(state));
        };

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


    }

    return Pending;

});