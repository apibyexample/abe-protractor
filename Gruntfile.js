module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            test: {
                src: [
                    'tests/e2e/app/vendor'
                ]
            }
        },
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
                        '!tests/e2e/app/vendor/**/*.js',
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
        jsdoc: {
            src: [
                'src/**/*.js'
            ],
            options: {
                destination: '.reports'
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
        },
        'selenium_start': {
            options: {
                port: 4445
            }
        }
    });

    // Load all Grunt available tasks
    require('load-grunt-tasks')(grunt);

    grunt.task.registerTask('lint', [
        'jshint:test',
        'jscs:test'
    ]);

    grunt.task.registerTask('e2e', [
        'connect:server',
        'run-e2e'
    ]);

    grunt.task.registerTask('run-e2e', [
        'selenium_phantom_hub',
        'protractor',
        'selenium_stop'
    ]);

    grunt.task.registerTask('test', [
        'lint',
        'jasmine_node',
        'e2e'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
