angular.module("presenter").directive("presenter", function () {

    var PRESENTER_ATTRIBUTE = "presenter";
    var STATES = Object.freeze({
        LOADING: "loading",
        ERROR: "error",
        READY: "ready"
    });


    return {
        restrict: "A",
        templateUrl: "/templates/presenter/directives/presenter.template.html",
        replace: true,
        scope: {},
        controller: function ($scope, $element, $attrs, PresenterService, PRESENTER) {

            $scope[PRESENTER] = this;

            this.states = STATES;
            this.state = STATES.LOADING;


            function enterErrorState() {
                this.state = STATES.ERROR;
            }

            function enterReadyState() {
                this.state = STATES.READY;


            }

            enterErrorState = enterErrorState.bind(this);
            enterReadyState = enterReadyState.bind(this);

            var presenterName = $attrs[PRESENTER_ATTRIBUTE];
            var presenter = PresenterService.findPresenterByName(presenterName).getOrThrow("Presenter not found error");


            presenter.getRoutes().then(function (routes) {
                $scope.routes = routes;
            }, enterErrorState);

            if (presenter.isInitialized()) {
                enterReadyState();

            } else {
                try {
                    //TODO remove listeners
                    //presenter.addInitializationCompleteListener(enterReadyState);
                    //presenter.addInitializationFailureListener(enterErrorState);
                    presenter.initialize();
                } catch (e) {
                    enterErrorState();
                }
            }

            $element.on("$destroy", function () {
                presenter.removeInitializationCompleteListener(enterReadyState);
                presenter.removeInitializationFailureListener(enterErrorState);
            });

        },
        link: function (scope, element, attribute) {
            console.log("link presenter...");
        }
    };

});