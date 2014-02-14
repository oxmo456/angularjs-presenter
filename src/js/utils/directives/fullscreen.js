angular.module("utils").directive("fullscreen", function ($document, $parse) {

    //TODO handle multiple full-screen directives...

    var FULL_SCREEN_ATTRIBUTE_NAME = "fullscreen";
    var FULL_SCREEN_CLASS = "full-screen";
    var rawDocument = $document[0];

    function isInFullScreenState() {
        return rawDocument.webkitIsFullScreen;
    }

    return {
        restrict: "A",
        controller: function ($scope, $attrs, $element) {
            $scope[$attrs[FULL_SCREEN_ATTRIBUTE_NAME]] = this;

            var rawElement = $element[0];

            function onEnterFullScreen() {
                $element.addClass(FULL_SCREEN_CLASS);
            }

            function onExitFullScreen() {
                $element.removeClass(FULL_SCREEN_CLASS);
            }

            function fullScreenSateChange() {
                $scope.$apply(function () {
                    if (isInFullScreenState()) {
                        onEnterFullScreen();
                    } else {
                        onExitFullScreen();
                    }
                });
            }

            this.isFullScreen = function () {
                return isInFullScreenState();
            };

            this.toggleFullScreen = function () {
                if (isInFullScreenState()) {
                    rawDocument.webkitCancelFullScreen();
                } else {
                    rawElement.webkitRequestFullscreen();

                }
            };

            $document.on("webkitfullscreenchange", fullScreenSateChange);

            $scope.$on("$destroy", function () {
                $document.off("webkitfullscreenchange", fullScreenSateChange);
            });

        }
    };


});