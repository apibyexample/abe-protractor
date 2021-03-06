/**
 * @module abe-protractor
 *
 * @requires {@link https://www.npmjs.org/package/protractor|protractor}
 * @requires {@link https://www.npmjs.org/package/glob|glob}
 * @requires {@link http://nodejs.org/api/fs.html|fs}
 * @requires {@link http://nodejs.org/api/path.html|path}
 * @requires {@link http://nodejs.org/api/util.html|util}
 *
 *
 * @description
 * Using ABE-spec as a base, allow for automatic creating of stubs using
 * ngMockE2E $httpBackend.
 *
 * @example
 * var abeProtractor = require('abe-protractor');
 *
 * abeProtractor.setupServiceStubs({
 *   mocksLocation: 'myApp/mocks/**\/*\/'
 *   stubsLocation: 'myApp/mockStubs/',
 *   log: true
 * });
 * // This will then setup stubs you have manually created and some default
 * // mocks
 */

var glob = require('glob'),
    path = require('path'),
    util = require('util'),
    fs = require('fs'),
    errors = {
        'NO_FOLDER': 'not a folder',
        'NO_JSON': 'no JSON files in folder'
    },
    setupStub,
    setupServiceStubs;

/**
 * @private
 * @description
 * Setup a stub and add to the browser.
 *
 * @param {string} match   Location of mock
 * @param {object} options Options to be passed to the setupServiceStubs
 * @property {string} options.mocksLocation This is your location of your ABE
 *                                          mocks
 * @property {string} options.stubsLocation This is base location of your
 *                                          Angular custom Stubs
 * @property {boolean} options.log Whether or not to log out the stubs setup
 *
 */
setupStub = function (match, options) {
    // Return early if this isn't a folder

    if (match.slice(1 * -1) !== path.sep) {
        return errors['NO_FOLDER'];
    }

    var jsonFiles = glob.sync(match + '*.json');

    // Return early if there are no JSON files in this folder

    if (jsonFiles.length === 0) {
        return errors['NO_JSON'];
    }

    var folder = path.basename(match),
        moduleName = util.format('app.stubs.%s', folder),
        filename = util.format('%s.stub.js', folder),
        stubPath = path.join(process.cwd(), options.stubsLocation, filename),
        stub,
        data = {},
        methods = [];

    if (fs.existsSync(stubPath)) {
        stub = require(stubPath);
    } else {
        stub = require('./generate-stub.js').generateStub;
        data = {
            'stub-options': {
                'module_name': moduleName
            }
        };
    }

    // Require each of the JSON files in the folder into a object hash
    // keyed by filename sans file extention, yielding an object with
    // a structure similar to,
    //
    // {
    //     query: {mock-data},
    //     get: {mock-data},
    //     post: {mock-data},
    //     put: {mock-data}
    // }
    jsonFiles.forEach(function (jsonPath) {
        var name = path.basename(jsonPath, '.json');
        data[name] = require(path.relative(__dirname, jsonPath));
        methods.push(name);
    });

    if (options.log) {
        console.log(util.format('Adding %s module (%s)', moduleName, methods));
    }

    // Tell Protractor to add the stubbed resource module to the app at
    // runtime. The mock data object is passed through to the stub.
    browser.addMockModule(moduleName, stub, data);
};

/**
 * Setup Service Stubs
 *
 * @param {object} options Options to be passed to the setupServiceStubs
 * @property {string} options.mocksLocation This is your location of your ABE
 *                                          mocks
 * @property {string} options.stubsLocation This is base location of your
 *                                          Angular custom Stubs
 * @property {boolean} options.log Whether or not to log out the stubs setup
 */
setupServiceStubs = function (options) {

    // Loop over all JSON mock data folders pased to the setupServiceStubs
    glob
        .sync(options.mocksLocation, {
            mark: true
        })
        .forEach(function (match) {
            setupStub(match, options);
        });
};

module.exports.setupServiceStubs = setupServiceStubs;
