module.exports = function (grunt) {
    // Load all Grunt available tasks
    require('load-grunt-tasks')(grunt);
    require('load-grunt-config')(grunt);

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
