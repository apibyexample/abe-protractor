[![Build Status](http://img.shields.io/travis/apibyexample/abe-protractor/master.svg)](https://travis-ci.org/apibyexample/abe-protractor)
[![Dependency Status](https://david-dm.org/apibyexample/abe-protractor/dev-status.svg)](https://david-dm.org/apibyexample/abe-protractor#info=devDependencies)
[![devDependency Status](https://david-dm.org/apibyexample/abe-protractor/status.svg)](https://david-dm.org/apibyexample/abe-protractor#info=dependencies)
[![Monthly downloads](http://img.shields.io/npm/dm/abe-protractor.svg)](https://www.npmjs.org/package/abe-protractor)
[![License](http://img.shields.io/npm/l/abe-protractor.svg)](https://www.npmjs.org/package/abe-protractor)

API By Example helper for Protractor
====================================

This repository includes tools to be able to use the [ABE format](https://github.com/apibyexample/abe-spec)
from within JS code. In particular we aim to support [Protractor JS](https://github.com/angular/protractor) tests.

## Usage

In order to use ``abe-protractor`` you will need to add the setup service stubs,
using Protractor's ``onPrepare`` within your protractor-conf file.

Example Usage:

```js
var abeProtractor = require('abe-protractor');

onPrepare: function () {
    abeProtractor.setupServiceStubs({
        mocksLocation: 'myApp/mocks/**/*',
        stubsLocation: '/tests/myApp/custom-stubs/',
        log: true
    });
}
```

It is expected that all of your ABE-Spec mocked JSON files are located in the same
folder (or at least the same parent folder).

### Do I have to make my stubs?

If you do not require any custom stubs you can use abe-protractor's default builder
for stubs. Using your mock JSON files it will create your stubs for you, based on the
information within your JSON spec.

To take a look at the stub that is generated take a look [here](src/abe-generate-stub.js).

### Logging

When we create the stubs we console log out what has been created, and the method types
that have been created. **By default this is turned off**.
