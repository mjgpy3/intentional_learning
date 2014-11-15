describe('printDiamond', function () {
    it('exists', function () {
        expect(printDiamond).toBeDefined();
    });
    describe('given the letter A', function () {
        it('returns "A"', function () {
            expect(printDiamond('A')).toEqual('A');
        });
    });
    describe('given the letter B', function () {
        it('returns the A-B-A diamond', function () {
            expect(printDiamond('B')).toEqual(' A\nB B\n A');
        });
    });
});
