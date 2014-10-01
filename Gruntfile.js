module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8081,
                    base: 'tests/e2e/app'
                }
            }
        },
        'jasmine_node': {
            all: [
                'tests/unit/'
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            test: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tests/**/*.js',
                        'src/**/*.js'
                    ]
                }
            }
        },
        jscs: {
            test: {
                files: {
                    src: [
                        '<%= jshint.test.files.src %>'
                    ]
                }
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                args: {
                    baseUrl: 'http://localhost:8081'
                }
            },
            e2e: {}
        }
    });

    // Load all Grunt available tasks
    require('load-grunt-tasks')(grunt);

    grunt.task.registerTask('test', [
        'jshint:test',
        'jscs:test',
        'jasmine_node'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
