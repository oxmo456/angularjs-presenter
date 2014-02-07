angular.module("presenter").directive("presenter", function ($rootScope, Presenter) {

    return {
        restrict: "E",
        templateUrl: "/templates/presenter/directives/presenter.template.html",
        scope: true,
        replace: true,
        controller: function presenterController($scope, $attrs) {
            function presenterChange(event, presenter) {
                $scope.templateUrl = presenter.getCurrentSlideTemplateUrl();
            }

            var presenter = Presenter.get($attrs.name, true);
            var removePresenterChangeListener = presenter.addChangeListener(presenterChange);
            $scope.$on("$destroy", function () {
                removePresenterChangeListener();
            });

            presenterChange(null, presenter);
        }
    };

});