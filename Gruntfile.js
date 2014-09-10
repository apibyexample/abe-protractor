module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            test: {
                files: {
                    src: [
                        'Gruntfile.js'
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
        'jscs:test'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
