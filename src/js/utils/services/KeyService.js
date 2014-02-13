angular.module("utils").service("KeyService", function KeyService($rootScope, body) {
    var KEY_UP = "keyup";
    var dispatcher = $rootScope.$new();
    var state = new SleepingState();

    function onBodyKeyUp(event) {
        console.log("KEY UP");
        dispatcher.$broadcast(event.keyCode);
    }

    function SleepingState(removeListener) {
        if (removeListener) {
            body.off(KEY_UP, onBodyKeyUp);
        }

        this.addKeyUpListener = function (keyCode, listener) {
            state = new ActiveState();
            return state.addKeyUpListener(keyCode, listener);
        };

    }

    function ActiveState() {

        var listenersCount = 0;

        body.on(KEY_UP, onBodyKeyUp);

        function listenerExists(keyCode, listener) {
            var result;
            try {
                result = dispatcher.$$listeners[keyCode].indexOf(listener) >= 0;
            } catch (e) {
                result = false;
            }
            return result;
        }

        this.addKeyUpListener = function (keyCode, listener) {
            if (!listenerExists(keyCode, listener)) {
                listenersCount++;
                var removeListener = dispatcher.$on(keyCode, listener);
                return function () {
                    removeListener();
                    listenersCount--;
                    if (listenersCount === 0) {
                        state = new SleepingState(true);
                    }
                };
            }
        };

    }

    this.addKeyUpListener = function (keyCode, listener) {
        return state.addKeyUpListener(keyCode, listener);
    };


});
