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
    describe('given the letter C', function () {
        it('returns the A-B-C-B-A diamond', function () {
            expect(printDiamond('C')).toEqual('  A\n B B \nC   C\n B B \n  A');
        });
    });
});

describe('spacePad', function () {
    it('exists', function () {
        expect(spacePad).toBeDefined();
    });
});
