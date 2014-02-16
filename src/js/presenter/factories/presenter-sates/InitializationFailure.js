angular.module("presenter").factory("InitializationFailure", function (INITIALIZATION_FAILURE, INITIALIZATION_COMPLETE) {

    function InitializationFailure(state) {

        state.getEventDispatcher().dispatch(INITIALIZATION_FAILURE);

        state.getRoutesDeferred().reject();

        this.isInitialized = function () {
            return false;
        };

        this.initialize = function () {
            throw new Error("Illegal state error");
        };

        this.addInitializationCompleteListener = function (listener) {
            throw new Error("Illegal state error");
        };

        this.addInitializationFailureListener = function (listener) {
            throw new Error("Illegal state error");
        };

        this.removeInitializationCompleteListener = function (listener) {
            state.getEventDispatcher().removeEventListener(INITIALIZATION_COMPLETE, listener);
        };

        this.removeInitializationFailureListener = function (listener) {
            state.getEventDispatcher().removeEventListener(INITIALIZATION_FAILURE, listener);
        };


    }

    return InitializationFailure;

});