var rewire = require('rewire'),
    abePro = rewire('../../src/abe-protractor.js'),
    browserMock = {
        'addMockModule': function (appName, app, data) {
            return [appName, app, data];
        }
    },
    errors = abePro['__get__']('errors'),
    setupStub = abePro['__get__']('setupStub');

describe('ABE Protractor mockModule loading tests', function () {
    var options = {
            'mocksLocation': './tests/mocks/**',
            'stubsLocation': './',
            'log': false
        };
    // Makes a global variable for browser as called by the node module
    // to setup the Angular App (setup by Protractor)
    browser = browserMock;

    it ('Should return that it\'s not a folder', function () {
        var match = './tests/mocks/query.json';

        expect(setupStub(match, options)).toEqual(errors['NO_FOLDER']);
    });

    it ('Should return that there are no JSON Files', function () {
        var match = './tests/mocks/';

        expect(setupStub(match, options)).toEqual(errors['NO_JSON']);
    });

    describe('Check addMockModule is called correctly', function () {
        beforeEach(function () {
            spyOn(browser, 'addMockModule').andCallThrough();
            abePro.setupServiceStubs(options);
        });

        it ('adds default mock module to browser', function () {
            expect(browser.addMockModule).toHaveBeenCalled();
        });

        it ('adds a default mock module with correct args', function () {
            var argsCalled = browser.addMockModule.argsForCall[0],
                appName = 'app.stubs.hello';

            expect(argsCalled[0]).toBe(appName);
            expect(typeof argsCalled[1]).toBe('function');
            expect(argsCalled[2]['stub-options']['module_name']).toBe(appName);
        });
    });

});
