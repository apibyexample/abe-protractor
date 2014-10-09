/**
 * Base Protractor config. Not used directly in any testing environment but is
 * extended by the functional and integration test configs.
 */

var abeProtractor = require('./src/abe-protractor.js');

exports.config = {
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
    },
    suites: {
        all: 'tests/e2e/**/*.spec.js'
    },
    jasmineNodeOpts: {
        showColors: true
    },
    onPrepare: function () {
        abeProtractor.setupServiceStubs({
            mocksLocation: 'node_modules/abe-spec/samples/**/*',
            stubsLocation: 'tests/e2e/app/stubs/',
            log: true
        });
    }
};
