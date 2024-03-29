// Karma configuration
// Generated on Tue Aug 06 2013 10:29:29 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
    config.set({
        // Karma configuration
        // Generated on Sun Jul 28 2013 12:41:48 GMT-0400 (EDT)


        // base path, that will be used to resolve files and exclude
        basePath: '',


        // list of files / patterns to load in the browser
        files: [
            JASMINE,
            JASMINE_ADAPTER,
            "components/jquery/jquery.js",
            "components/angular/angular.js",
            "components/angular-mocks/angular-mocks.js",
            "components/angular-translate/angular-translate.js",
            "src/js/module.js",
            "src/js/controllers/**/*.js",
            "src/js/directives/**/*.js",
            "src/js/filters/**/*.js",
            "src/js/services/**/*.js",
            "src/js/util/**/*.js",
            "test/**/*.spec.js"
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // cli runner port
        runnerPort: 9100,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: "LOG_INFO",


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false

    });
};