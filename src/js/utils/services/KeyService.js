angular.module("utils").service("KeyService", function KeyService($rootScope, body) {
    var KEY_UP = "keyup";
    var dispatchers = {};
    var state = new SleepingState();

    function onBodyKeyUp(event) {
        angular.forEach(dispatchers, function (dispatcher) {
            dispatcher.$apply(function () {
                console.log("keyup...");
                dispatcher.$broadcast(event.keyCode);
            });

        })
    }

    function SleepingState(removeListener) {
        if (removeListener) {
            body.off(KEY_UP, onBodyKeyUp);
        }
        this.addKeyUpListener = function (scope, keyCode, listener) {
            state = new ActiveState();
            return state.addKeyUpListener(scope, keyCode, listener);
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

            this.increase = function (amount) {
                count += amount || 1;
                checkState();
            };

            this.decrease = function (amount) {
                count -= amount || 1;
                checkState();
            };

        }

        function dispatcher(scope) {
            var scopeId = scope.$id;
            var dispatcher = dispatchers[scopeId];
            if (!dispatcher) {
                dispatcher = dispatchers[scope.$id] = scope.$new(true);
                dispatcher.$on("$destroy", function () {
                    angular.forEach(dispatcher.$$listenerCount, function (value, key) {
                        if (key !== "$destroy") {
                            listenersCount.decrease(value);
                        }
                    });
                    delete dispatchers[scopeId];
                });
            }
            return dispatcher;
        }

        function listenerExists(scope, keyCode, listener) {
            var result;
            try {
                var dispatcher = dispatchers[scope.$id];
                result = dispatcher && dispatcher.$$listeners[keyCode].indexOf(listener) >= 0;
            } catch (e) {
                result = false;
            }
            return result;
        }

        this.addKeyUpListener = function (scope, keyCode, listener) {
            if (!listenerExists(scope, keyCode, listener)) {
                listenersCount.increase();
                var removeListener = dispatcher(scope).$on(keyCode, listener);
                return function () {
                    removeListener();
                    listenersCount.decrease();
                };
            }
        };

    }

    this.addKeyUpListener = function (scope, keyCode, listener) {
        return state.addKeyUpListener(scope, keyCode, listener);
    };


});
