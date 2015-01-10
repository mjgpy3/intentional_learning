var matching = function (toMatch) {
    var cases, matcher, decorateWithMatchingValue;

    cases = [];

    decorateWithMatchingValue = function (f) {
        return function () {
            return f(toMatch);
        };
    };

    Case = function (matchChecker, resultCalculator) {
        this.isMatch = matchChecker;
        this.result = decorateWithMatchingValue(resultCalculator);
    };

    matcher = {
        match: function () {
            matchingCase = cases.find(function (aCase) {
                return aCase.isMatch();
            });

            if (matchingCase) {
                return matchingCase.result();
            }
            throw new Error('Non-exhaustive patterns matching ' + toMatch);
        },
        otherwise: function (resultCalculator) {
            return decorateWithMatchingValue(resultCalculator)();
        },
        on: {
            object: function (resultCalculator) {
                cases.push(new Case(function () {
                    return typeof toMatch === 'object' && toMatch !== null;
                },
                    resultCalculator
                ));

                return matcher;
            },
            objectWithProperty: function (prop, resultCalculator) {
                cases.push(new Case(function () {
                    return typeof toMatch === 'object' && toMatch[prop] !== undefined;
                },
                    resultCalculator
                ));

                return matcher;
            },
            value: function (exactMatch, resultCalculator) {
                cases.push(new Case(function () {
                    return toMatch === exactMatch;
                },
                    resultCalculator
                ));

                return matcher;
            }
        }
    };

    return matcher;
};

describe('matching({ foo: "bar" }).', function () {
    var described;

    beforeEach(function () {
        described = matching({ foo: 'bar' });
    });

    describe('on.', function () {
        beforeEach(function () {
            described = described.on;
        });

        describe('object(function () { return 99; }).match()', function () {
            beforeEach(function () {
                described = described.object(function () { return 99; }).match();
            });

            it('is 99', function () {
                expect(described).toBe(99);
            });
        });

        describe('object(function (x) { return x; }).match()', function () {
            beforeEach(function () {
                described = described.object(function (x) { return x; }).match();
            });

            it('has "bar" at its foo property', function () {
                expect(described.foo).toBe('bar');
            });
        });

        describe('objectWithProperty("foo", function () { return 7; }).match()', function () {
            beforeEach(function () {
                described = described.objectWithProperty('foo', function () { return 7; }).match();
            });

            it('is 7', function () {
                expect(described).toBe(7);
            });
        });

        describe('objectWithProperty("spaz", function () { ... }).match()', function () {
            beforeEach(function () {
                described = described.objectWithProperty('spaz', function () { return 7; }).match;
            });

            it('throws an error', function () {
                expect(described).toThrow();
            });
        });

        describe('value({}, function() { ... }).match()', function () {
            beforeEach(function () {
                described = described.value({}, function () { }).match;
            });

            it('throws an error', function () {
                expect(described).toThrow();
            });
        });
    });
});

describe('matching(42).', function () {
    var described;

    beforeEach(function () {
        described = matching(42);
    });

    describe('otherwise(', function () {
        beforeEach(function () {
            described = described.otherwise;
        });

        describe('function (x) { return x; })', function () {
            beforeEach(function () {
                described = described(function (x) { return x; });
            });

            it('is 42', function () {
                expect(described).toBe(42);
            });
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

        describe('value(42, function (x) { return x; }).match()', function () {
            beforeEach(function () {
                described = described.value(42, function (x) { return x; }).match();
            });

            it('is 42', function () {
                expect(described).toBe(42);
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

        describe('object(function () { ... }).match()', function () {
            beforeEach(function () {
                described = described.object(function () { }).match;
            });

            it('throws an error', function () {
                expect(described).toThrow();
            });
        });
    });
});
