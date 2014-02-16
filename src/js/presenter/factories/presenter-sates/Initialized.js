angular.module("presenter").factory("Initialized", function (INITIALIZATION_COMPLETE) {

    function Initialized(state, data) {

        state.getEventDispatcher().dispatch(INITIALIZATION_COMPLETE);

        state.getRoutesDeferred().resolve("yo !");

        this.isInitialized = function () {
            return true;
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

    return Initialized;

});