angular.module("app").run(function (PresenterService) {

    var presenter = PresenterService.findPresenterByName("presenter").getOrThrow();

    function presenterReady() {

        console.log("presenter ready...");

    }

    function presenterInitializationFailure() {

        console.log("presenter initialization failure...");

    }


    presenter.addInitializationCompleteListener(presenterReady);
    presenter.addInitializationFailureListener(presenterInitializationFailure);
    presenter.initialize();


});