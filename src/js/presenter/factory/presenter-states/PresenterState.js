angular.module("presenter").factory("PresenterState", function () {

    function PresenterState(presenter) {

        var state;

        this.setState = function (value) {
            state = value;
        };

        this.getState = function () {
            return state;
        };

        this.getPresenter = function () {
            return presenter;
        };

    }

    return PresenterState;

});