angular.module("app").config(function ($routeProvider, PresenterProvider) {

    //Builder pattern : http://stackoverflow.com/questions/328496/when-would-you-use-the-builder-pattern
    PresenterProvider.builder()
        .setName("presenter")
        .setTemplateUrl("/templates/app/presenter/presenter.template.html")
        .setRouteProvider($routeProvider)
        .appendSlide("a", "/templates/app/presenter/slides/a.template.html")
        .appendSlide("b", "/templates/app/presenter/slides/b.template.html")
        .appendSlide("c", "/templates/app/presenter/slides/c.template.html")
        .build();

});

