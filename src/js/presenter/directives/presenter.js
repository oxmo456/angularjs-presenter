angular.module("presenter").directive("presenter", function (PresenterService) {

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            console.log("LINK PRESENTER...", PresenterService, scope);
            var presenterName = attrs.presenter;

            var presenter = PresenterService.get(presenterName);

            console.log(presenter);


        }
    };

});