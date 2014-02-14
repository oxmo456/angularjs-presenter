angular.module("utils").service("KeyService", function KeyService($rootScope, body, EventDispatcher) {
    var KEY_UP = "keyup";
    var state = new SleepingState();

    var eventDispatcher = new EventDispatcher();

    function onBodyKeyUp(event) {
        eventDispatcher.dispatch(event.keyCode);
    }

    function SleepingState(removeListener) {
        if (removeListener) {
            body.off(KEY_UP, onBodyKeyUp);
        }

        this.addKeyUpListener = function (keyCode, listener, priority) {
            state = new ActiveState();
            return state.addKeyUpListener(keyCode, listener, priority);
        };

        this.removeKeyUpListener = function (keyCode, listener) {
            throw new Error("Illegal state error");
        };

    }

    function ActiveState() {
        var listenersCount = new ListenerCount();

        body.on(KEY_UP, onBodyKeyUp);

        function ListenerCount() {
            var count = 0;

            function checkState() {
                if (count === 0) {
                    state = new SleepingState(true);
                }
            }

            this.increase = function () {
                count++;
                checkState();
            };

            this.decrease = function () {
                count--;
                checkState();
            };

        }


        this.addKeyUpListener = function (keyCode, listener, priority) {
            if (eventDispatcher.addEventListener(keyCode, listener, priority)) {
                listenersCount.increase();
            }
        };

        this.removeKeyUpListener = function (keyCode, listener) {
            if (eventDispatcher.removeEventListener(keyCode, listener)) {
                listenersCount.decrease();
            }
        };

    }

    this.addKeyUpListener = function (keyCode, listener, priority) {
        return state.addKeyUpListener(keyCode, listener, priority);
    };

    this.removeKeyUpListener = function (keyCode, listener) {
        return state.removeKeyUpListener(keyCode, listener);
    };


});
