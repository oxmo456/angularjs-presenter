angular.module("presenter").factory("Presenter", function (PresenterState, Initialize) {

    function Presenter(source) {
        var state;

        function initialize(context) {
            state = new PresenterState(context);
            state.setState(new Initialize(state));
        }

        this.getSource = function () {
            return source;
        };

        this.dispose = function () {
            state.getState().dispose();
        };


        initialize(this);
    }

    return Presenter;

});