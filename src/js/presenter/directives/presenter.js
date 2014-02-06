angular.module("presenter").directive("presenter", function () {

    function PresenterPublicAPI(presenterController) {

        this.next = function () {
            presenterController.next();
        };

        this.prev = function () {
            presenterController.prev();
        };


    }

    return {
        restrict: "E",
        controller: function presenterController($scope, $attrs) {

            console.log("        PRESENTER");

            //publish the public API of the controller into the current scope
            //use the name attribute as the publish key
            $scope[$attrs.name] = new PresenterPublicAPI(this);

            var slides = [];
            var currentSlideIndex = 0;
            var currentSlide = null;

            function update() {
                var slide = slides[currentSlideIndex];
                if (slide && currentSlide !== slide) {
                    if (currentSlide) {
                        currentSlide.hide();
                    }
                    currentSlide = slide;
                    currentSlide.show();
                }
            }

            this.registerSlide = function (slide) {
                slides.push(slide);
                update();
            };

            this.unregisterSlide = function (slide) {
                //TODO
            };

            this.next = function () {
                currentSlideIndex++;
                if (currentSlideIndex >= slides.length) {
                    currentSlideIndex = 0;
                }
                update();
            };

            this.prev = function () {
                currentSlideIndex = Math.max(0, --currentSlideIndex);
                update();
            };

        }
    };

});