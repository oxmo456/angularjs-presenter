angular.module("slugify").constant("slugify", function (value) {
    //TODO(nicolas) weak slug function, refactor...
    return value.toLowerCase().replace(/[^A-Za-z0-9-]/gi, "-").replace(/-*$/,"");
});