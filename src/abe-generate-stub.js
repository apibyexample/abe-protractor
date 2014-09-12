exports.generateDefaultStub = function (data) {
    angular
        .module(data['stub-options']['module_name'], [
            'ngMockE2E',
            'app'
        ])
        .run(function ($httpBackend) {
            var createStub = function (method, example, $httpBackend) {
                    var httpMethod = method.toUpperCase(),
                        url = new RegExp(example.request.url + '$'),
                        res = example.response;

                    $httpBackend
                        ['when' + httpMethod](url)
                        .respond(function (method, url) {
                            return [res.status, res.body];
                        });
                },
                methodData,
                method;

            delete data['stub-options'];

            for (methodData in data) {
                var httpMethod = data[methodData].method,
                    examples = data[methodData].examples;

                for (method in examples) {
                    createStub(
                        httpMethod,
                        examples[method],
                        $httpBackend
                    );
                }
            }
        });
};
