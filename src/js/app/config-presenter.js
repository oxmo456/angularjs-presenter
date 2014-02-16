angular.module("app").config(function ($routeProvider, PresenterRepositoryProvider) {

    PresenterRepositoryProvider.add("presenter", "/data/presenter/presenter.config.json");
    PresenterRepositoryProvider.add("presenter2", "/data/presenter/presenter.config.json.error");

});

