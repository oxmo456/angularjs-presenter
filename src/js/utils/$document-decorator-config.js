angular.module("app").config(function ($provide) {

    $provide.decorator("$document", function ($delegate) {

        $delegate.hello = function () {
            console.log("hello");
        };

        return $delegate;
    });

});

