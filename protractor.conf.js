/**
 * Base Protractor config. Not used directly in any testing environment but is
 * extended by the functional and integration test configs.
 */

var abeProtractor = require('./src/abe-protractor.js');

exports.config = {
    capability: {
        browserName: 'chrome'
    },
    suites: {
        all: 'tests/e2e/**/*.spec.js'
    },
    jasmineNodeOpts: {
        showColors: true
    },
    onPrepare: function () {
        abeProtractor.setupServiceStubs({
            mocksLocation: 'tests/e2e/app/mocks/**/*',
            stubsLocation: 'tests/e2e/app/stubs/',
            log: true
        });
    }
};
