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

    grunt.task.registerTask('lint', [
        'jshint:test',
        'jscs:test'
    ]);

    grunt.task.registerTask('test', [
        'lint',
        'jasmine_node'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
