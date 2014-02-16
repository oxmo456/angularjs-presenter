angular.module("presenter").factory("PresenterState", function () {

    function PresenterState(presenter, eventDispatcher, routesDeferred) {

        var state;

        this.getPresenter = function () {
            return presenter;
        };

        this.getRoutesDeferred = function () {
            return routesDeferred;
        };

        this.getEventDispatcher = function () {
            return eventDispatcher;
        };

        this.get = function () {
            return state;
        };

        this.set = function (value) {
            state = value;
        };

    }

    return PresenterState;

});