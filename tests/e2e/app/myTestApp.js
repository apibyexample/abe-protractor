angular
    .module('app', [
        'ngResource',
        'ngMockE2E'
    ])
    .controller('testCtrl', function ($scope, helloResource, userResource) {
        $scope.app = {
            name: 'My Test App for ABE Protractor',
            hello: null,
            users: null
        };

        helloResource.get().$promise.then(function (res) {
            $scope.app.hello = res;
        });

        userResource.get().$promise.then(function (res) {
            $scope.app.users = res;
        });
    })
    .factory('helloResource', function ($resource) {
        var url = 'http://localhost:8081/',
            helloResource = $resource(url + 'json/hello');

        return helloResource;
    })
    .factory('userResource', function ($resource) {
        var url = 'http://localhost:8081/',
            userResource = $resource(url + 'json/users');

        return userResource;
    });
