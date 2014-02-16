angular.module("utils").factory("Option", function () {

        function Option(value) {

            var isDefinedAndNonNull = angular.isDefined(value) && value !== null;

            this.isDefined = function () {
                return isDefinedAndNonNull;
            };

            this.getOrThrow = isDefinedAndNonNull ? function () {
                return value;
            } : function (error) {
                throw new Error(error || "No such element error");
            };

        }

        return Option;

    }

)
;