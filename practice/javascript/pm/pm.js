var matching = function (toMatch) {
    var cases, obj;

    cases = [];

    obj = {
        otherwise: function (resultCalculator) {
            return resultCalculator();
        },
        on: {
            value: function (exactMatch, resultCalculator) {
                cases.push({
                    isMatch: function () {
                        return toMatch === exactMatch;
                    },
                    result: resultCalculator
                });

                return {
                    on: obj.on,
                    otherwise: obj.otherwise,
                    match: function () {
                        matchingCase = cases.find(function (aCase) {
                            return aCase.isMatch();
                        });

                        if (matchingCase) {
                            return matchingCase.result();
                        }
                        throw new Error('Match ' + toMatch + ' not met');
                    }
                };
            }
        }
    };

    return obj;
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
                beforeEach(function () {
                    described = described(function () { return thing; });
                });

                it('is ' + thing, function () {
                    expect(described).toBe(thing);
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

            describe('otherwise(function () { return 42; });', function () {
                beforeEach(function () {
                    described = described.otherwise(function () { return 42; });
                });

                it('is 42', function () {
                    expect(described).toBe(42);
                });
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

            describe('on.value(35, function () { return 10; }).match()', function () {
                beforeEach(function () {
                    described = described.on.value(35, function () { return 10; }).match();
                });

                it('is 9', function () {
                    expect(described).toBe(9);
                });
            });

            describe('on.value(42, function () { return 10; }).match()', function () {
                beforeEach(function () {
                    described = described.on.value(42, function () { return 10; }).match();
                });

                it('is 9', function () {
                    expect(described).toBe(9);
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
