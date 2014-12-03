module.exports = {
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
};
