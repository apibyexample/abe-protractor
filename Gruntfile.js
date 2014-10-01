module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
