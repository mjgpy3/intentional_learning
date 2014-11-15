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
    describe('given the letter D', function () {
        it('returns the A-B-C-D-C-B-A diamond', function () {
            expect(printDiamond('D')).toEqual('   A\n  B B  \n C   C \nD     D\n C   C \n  B B  \n   A');
        });
    });
});

describe('spacePad', function () {
    it('exists', function () {
        expect(spacePad).toBeDefined();
    });
    describe('given 0', function () {
        it('returns the empty string', function () {
            expect(spacePad(0)).toEqual('');
        });
    });
    describe('given 1', function () {
        it('returns " "', function () {
            expect(spacePad(1)).toEqual(' ');
        });
    });
    describe('given 2', function () {
        it('returns "  "', function () {
            expect(spacePad(2)).toEqual('  ');
        });
    });
});

describe('distance', function () {
    it('exists', function () {
        expect(distance).toBeDefined();
    });
    describe('given A and A', function () {
        it('returns 0', function () {
            expect(distance('A', 'A')).toEqual(0);
        });
    });
    describe('given A and B', function () {
        it('returns 1', function () {
            expect(distance('A', 'B')).toEqual(1);
        });
    });
});
