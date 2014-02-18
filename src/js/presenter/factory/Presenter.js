angular.module("presenter").factory("Presenter", function (PresenterState, Initialize) {

    function Presenter(source, path) {
        var state;

        function initialize(context) {
            state = new PresenterState(context);
            state.set(new Initialize(state));
        }

        this.getSource = function () {
            return source;
        };

        this.getBasePath = function () {
            return path;
        };

        this.dispose = function () {
            state.get().dispose();
        };

        this.next = function () {
            state.get().next();
        };

        this.prev = function () {
            state.get().prev();
        };

        initialize(this);
    }

    return Presenter;

});