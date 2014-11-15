describe('printDiamond', function () {
    it('exists', function () {
        expect(printDiamond).toBeDefined();
    });
    describe('given the letter A', function () {
        it('returns "A"', function () {
            expect(printDiamond('A')).toEqual('A');
        });
    });
});
