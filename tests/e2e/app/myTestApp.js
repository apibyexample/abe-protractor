angular
    .module('app', [
        'ngResource',
        'ngMockE2E'
    ])
    .controller('myTestAppCtrl', function ($scope, myTestResource) {
        var app = {
            name: 'My Test App for ABE Protractor'
        };

        $scope.app = app;
        $scope.users = null;
        myTestResource.get().$promise.then(function (res) {
            $scope.users = res;
        });
    })
    .factory('myTestResource', function ($resource) {
        var url = 'http://localhost:8081/',
            myTestResource = $resource(url + 'json/endpoint.json', {
                id: '@id'
            });

        return myTestResource;
    });
