angular.module("app").config(function ($routeProvider, PresenterServiceProvider, PRESENTER) {

    var presenter = PresenterServiceProvider.builder()
        .setName(PRESENTER)
        .setSlidesTemplateBasePath("/templates/app/slides/")
        .setSlidesPathPrefix("#!")
        .addSlide("a", "default.template.html", {
            meta: "AAA"
        })
        .addSlide("b", "default.template.html", {
            meta: "BBB"
        })
        .addSlide("c", "default.template.html", {
            meta: "BBB"
        })
        .addSlide("d", "default.template.html", {
            meta: "BBB"
        })
        .build();

    PresenterServiceProvider.configure(presenter, $routeProvider);

});

