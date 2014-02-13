angular.module("utils").constant("iterator", function (source) {

    function Iterator(source) {

        var cursor = 0;

        this.hasNext = function () {
            return !!source[cursor];
        };

        this.next = function () {
            return source[cursor++];
        };

    }

    if (!angular.isArray(source)) {
        throw new Error("Source must be an Array");
    }
    return new Iterator(source);

});