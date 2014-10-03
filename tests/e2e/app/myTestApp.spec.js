describe('Test that my App can get Mocked data', function () {
    beforeEach(function () {
        browser.get('index.html');
    });

    it('Should have JSON data from users stub', function () {
        expect(element(by.css('p.firstname')).getText()).toEqual('Joe');
        expect(element(by.css('p.lastname')).getText()).toEqual('Bloggs');
        expect(element(by.css('p.age')).getText()).toEqual('29');
    });

    it ('Should have JSON data from hello stub', function () {
        expect(element(by.css('.hello .id')).getText()).toEqual('1');
    });
});
