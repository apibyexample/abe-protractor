var abePro = require('../src/abe-protractor.js'),
    browserMock = {
        'addMockModule': function (appName, app, data) {
            return [appName, app, data];
        }
    };

describe('ABE Protractor mockModule loading tests', function () {
    var options = {
            'mocksLocation': './tests/mocks/**',
            'stubsLocation': './',
            'log': false
        };
    // Makes a global variable for browser as called by the node module
    // to setup the Angular App (setup by Protractor)
    browser = browserMock;

    it ('adds default mock module to browser', function () {
        spyOn(browser, 'addMockModule').andCallThrough();
        abePro.setupServiceStubs(options);

        expect(browser.addMockModule).toHaveBeenCalled();

        var argsCalled = browser.addMockModule.argsForCall[0],
            appName = 'app.stubs.hello';

        expect(argsCalled[0]).toBe(appName);
        expect(typeof argsCalled[1]).toBe('function');
        expect(argsCalled[2]['stub-options']['module_name']).toBe(appName);
    });

});
