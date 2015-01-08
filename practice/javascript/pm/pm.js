var matching = function (toMatch) {
    return {
        otherwise: function (resultCalculator) {
            return resultCalculator();
        },
        on: {
            value: function (exactMatch, resultCalculator) {
                return {
                    match: function () {
                        if (exactMatch === toMatch) {
                            return resultCalculator();
                        }
                        throw new Error('Match ' + toMatch + ' not met');
                    }
                };
            }
        }
    };
};

var context = describe;

describe('matching(42).', function () {
    var described;

    beforeEach(function () {
        described = matching(42);
    });

    describe('otherwise(', function () {
        beforeEach(function () {
            described = described.otherwise;
        });

        [42, '"foobar"'].forEach(function (thing) {
            describe('function () { return ' + thing + '; })', function () {
                it('is ' + thing, function () {
                    expect(described(function () { return thing; })).toBe(thing);
                });
            });
        });
    });
    
    describe('on.', function () {
        beforeEach(function () {
            described = described.on;
        });

        describe('value(35, function () { ... }).', function () {
            beforeEach(function () {
                described = described.value(35, function () { return ''; });
            });

            describe('match()', function () {
                it('throws an error', function () {
                    expect(described.match).toThrow();
                });
            });
        });

        describe('value(42, function () { return 9; }).', function () {
            beforeEach(function () {
                described = described.value(42, function () { return 9; });
            });

            describe('match()', function () {
                it('is 9', function () {
                    expect(described.match()).toBe(9);
                });
            });
        });

        describe('value(42, function () { return 7; }).', function () {
            beforeEach(function () {
                described = described.value(42, function () { return 7; });
            });

            describe('match()', function () {
                it('is 7', function () {
                    expect(described.match()).toBe(7);
                });
            });
        });
    });
});
