describe('Test that my App can get Mocked data', function () {
    beforeEach(function () {
        browser.get('index.html');
    });

    it('Should have JSON data from stub', function () {
        expect(element(by.css('p.firstname')).getText()).toEqual('Joe');
        expect(element(by.css('p.lastname')).getText()).toEqual('Bloggs');
        expect(element(by.css('p.age')).getText()).toEqual('29');
    });
});
