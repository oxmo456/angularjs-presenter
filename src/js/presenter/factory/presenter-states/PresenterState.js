angular.module("presenter").factory("PresenterState", function () {

    function PresenterState(presenter) {

        var state;

        this.set = function (value) {
            state = value;
        };

        this.get = function () {
            return state;
        };

        this.getPresenter = function () {
            return presenter;
        };

    }

    return PresenterState;

});