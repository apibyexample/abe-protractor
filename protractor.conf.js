/**
 * Base Protractor config. Not used directly in any testing environment but is
 * extended by the functional and integration test configs.
 */

exports.config = {
    capability: {
        browserName: 'chrome'
    },
    suites: {
        all: 'tests/e2e/**/*.spec.js'
    },
    jasmineNodeOpts: {
        showColors: true
    }
};
