angular
    .module('app', [
        'ngResource',
        'ngMockE2E'
    ])
    .controller('testCtrl', function ($scope, basicResource, userResource) {
        $scope.app = {
            name: 'My Test App for ABE Protractor',
            basic: null,
            users: null
        };

        basicResource.save().$promise.then(function (res) {
            $scope.app.basic = res;
        });

        userResource.get({
            id: 1
        }).$promise.then(function (res) {
            $scope.app.users = res;
        });
    })
    .factory('basicResource', function ($resource) {
        var url = 'http://localhost:8081/',
            basicResource = $resource(url + 'basic');

        return basicResource;
    })
    .factory('userResource', function ($resource) {
        var url = 'http://localhost:8081/',
            userResource = $resource(url + 'json/users/:id');

        return userResource;
    });
