angular
    .module('myTestApp', [
        'ngResource',
        'ngMockE2E'
    ])
    .controller('myTestAppCtrl', function ($scope, myTestResource) {
        var app = {
            name: 'My Test App for ABE Protractor'
        };

        $scope.app = app;
    })
    .factory('myTestResource', function ($resource) {
        var myTestResource = $resource('json/endpoint.json', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                }
            });

        return myTestResource;
    });
