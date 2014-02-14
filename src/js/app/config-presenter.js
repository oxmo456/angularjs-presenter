angular.module("app").config(function ($routeProvider, PresenterServiceProvider, PRESENTER) {

    var presenter = PresenterServiceProvider.builder()
        .setName(PRESENTER)
        .setSlidesTemplateBasePath("/templates/app/slides/")
        .addSlide("a", "slideA.template.html", {
            meta: "AAA"
        })
        .addSlide("b", "slideB.template.html", {
            meta: "BBB"
        })
        .addSlide("c", "slideC.template.html", {
            meta: "BBB"
        })
        .addSlide("d", "default.template.html", {
            meta: "BBB"
        })
        .build();

    PresenterServiceProvider.configure(presenter, $routeProvider);

});

