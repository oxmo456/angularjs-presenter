module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: false,
                    port: 8080,
                    hostname: "*",
                    base: "./server"
                }
            }
        },
        ngmin: {
            dev: {
                src: [  "src/js/module.js",
                    "src/js/util/**/*.js",
                    "src/js/controllers/**/*.js",
                    "src/js/directives/**/*.js",
                    "src/js/services/**/*.js",
                    "src/js/filters/**/*.js",
                    "src/js/config.js",
                    "src/js/run.js"
                ],
                dest: "app/js/main.js"
            }
        },

        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["ngmin:dev"],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ["src/**/*.html"],
                tasks: ["copy:html"],
                options: {
                    nospawn: true
                }
            },
            less: {
                files: ["src/less/**/*.less"],
                tasks: ["less:development"],
                options: {
                    nospawn: true
                }
            },
            config: {
                files: ["src/config/*.json"],
                tasks: ["copy:config"],
                options: {
                    nospawn: true
                }
            },
            locales: {
                files: ["src/locales/*.json"],
                tasks: ["copy:locales"],
                options: {
                    nospawn: true
                }
            },
            media: {
                files: ["src/media/**/*"],
                tasks: ["copy:media"]
            }
        },
        copy: {
            html: {
                files: [
                    {expand: true, src: ["**/*.html"], cwd: "src/", dest: "app/"}
                ]
            },
            components: {
                files: [
                    {expand: true, src: ["angular/*"], cwd: "components/", dest: "server/components/"},
                    {expand: true, src: ["bootstrap/*"], cwd: "components/", dest: "server/components/"}
                ]
            },
            fonts: {
                files: [
                    {expand: true, src: ["fonts/**/*"], cwd: "src/", dest: "app/"}
                ]
            },
            config: {
                files: [
                    {expand: true, src: ["config/*.json"], cwd: "src/", dest: "app/"}
                ]
            },
            locales: {
                files: [
                    {expand: true, src: ["locales/*.json"], cwd: "src/", dest: "app/"}
                ]
            },
            media: {
                files: [
                    {expand: true, src: ["**"], cwd: "src/media/", dest: "app/media/"}
                ]
            }
        },
        less: {
            development: {
                files: {
                    "app/css/styles.css": ["src/less/styles.less"]
                }
            }
        },
        karma: {
            unit: {
                configFile: "karma.conf.js",
                runnerPort: 9999,
                singleRun: true,
                browsers: ["PhantomJS"]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, src: ["**/*.html"], cwd: "src/", dest: "app/"}
                ]
            }
        },
        clean: {
            dev: ["app/*"]
        },
        uglify: {
            dev: {
                files: {
                    "app/js/main.min.js": ["app/js/main.js"]
                }
            }
        }
    });


    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("dev-build", ["ngmin:dev", "copy", "less:development"]);

    grunt.registerTask("dev-watch", ["watch"]);

    //start a server for development purposes
    grunt.registerTask("server-dev", ["clean:dev", "dev-build", "connect:server", "dev-watch"]);

    //start a server for staging purposes
    grunt.registerTask("server-stg", [ "dev-build", "connect:server"]);

    //default server (dev)
    grunt.registerTask("server", ["server-dev"]);

};