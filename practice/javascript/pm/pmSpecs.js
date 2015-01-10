describe('matching({ foo: "bar", spam: "eggs"}).', function () {
    var described;

    beforeEach(function () {
        described = matching({ foo: 'bar', spam: 'eggs' });
    });

    describe('on.', function () {
        beforeEach(function () {
            described = described.on;
        });

        describe('objectWithProperties("foo", "spam", function () { return 42; }).match()', function () {
            beforeEach(function () {
                described = described.objectWithProperties('foo', 'spam', function () { return 42; }).match();
            });

            it('is 42', function () {
                expect(described).toBe(42);
            });
        });

        describe('objectWithProperties("foo", "quux", function () {  }).match()', function () {
            beforeEach(function () {
                described = described.objectWithProperties('foo', 'quux', function () { }).match;
            });

            it('throws an error', function () {
                expect(described).toThrow();
            });
        });

        [
            'objectWithProperty',
            'objectWithProperties'
        ].forEach(function (matchCond) {
            describe(matchCond + '("foo", function () { return 7; }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('foo', function () { return 7; }).match();
                });

                it('is 7', function () {
                    expect(described).toBe(7);
                });
            });

            describe(matchCond + '("foo", function (x) { return x; }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('foo', function (x) { return x; }).match();
                });

                it('is "bar" at the foo property', function () {
                    expect(described.foo).toBe("bar");
                });
            });

            describe(matchCond + '("spaz", function () { ... }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('spaz', function () { return 7; }).match;
                });

                it('throws an error', function () {
                    expect(described).toThrow();
                });
            });
        });
    });
});

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

        [
            'objectWithProperty',
            'objectWithProperties'
        ].forEach(function (matchCond) {
            describe(matchCond + '("foo", function () { return 7; }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('foo', function () { return 7; }).match();
                });

                it('is 7', function () {
                    expect(described).toBe(7);
                });
            });

            describe(matchCond + '("foo", function (x) { return x; }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('foo', function (x) { return x; }).match();
                });

                it('is "bar" at the foo property', function () {
                    expect(described.foo).toBe("bar");
                });
            });

            describe(matchCond + '("spaz", function () { ... }).match()', function () {
                beforeEach(function () {
                    described = described[matchCond]('spaz', function () { return 7; }).match;
                });

                it('throws an error', function () {
                    expect(described).toThrow();
                });
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

        describe('satisfying(function (x) { return x > 41 && x < 43; }, function () { return "met"; }).match()', function () {
            var isBetween41And43 = function (x) { return x > 41 && x < 43; };

            beforeEach(function () {
                described = described.satisfying(isBetween41And43, function () { return 'met'; }).match();
            });

            it('is "met"', function () {
                expect(described).toBe("met");
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

describe('some integration tests', function () {
    var metString = 'I am met',
        anyFunction = function () { throw new Error("shouldn't be hit"); },
        returnsIAmMet = function () { return metString; },
        isBelow42 = function (x) { return x < 42; };

    describe('matching value->value->value where 2nd matches', function () {
        it('works', function () {
            expect(
                matching(42).
                    on.value(99, anyFunction).
                    on.value(42, returnsIAmMet).
                    on.value(25, anyFunction).
                    match()
            ).
                toEqual(metString);
        });
    });

    describe('matching value->value->value where 1st matches', function () {
        it('works', function () {
            expect(
                matching(42).
                    on.value(42, returnsIAmMet).
                    on.value(99, anyFunction).
                    on.value(25, anyFunction).
                    match()
            ).
                toEqual(metString);
        });
    });

    describe('matching many types, none of which match, with an otherwise (i.e. the matching value)', function () {
        it('works', function () {
            expect(
                matching(42).
                    on.value(99, anyFunction).
                    on.object(anyFunction).
                    on.objectWithProperties('blah', 'baz', anyFunction).
                    on.objectWithProperty('feee', anyFunction).
                    on.satisfying(isBelow42, anyFunction).
                    otherwise(returnsIAmMet)
            ).
                toEqual(metString);
        });
    });

    describe('matching many types, none of which match, without an otherwise', function () {
        it('throws an error', function () {
            expect(
                matching(42).
                    on.value(99, anyFunction).
                    on.object(anyFunction).
                    on.objectWithProperties('blah', 'baz', anyFunction).
                    on.objectWithProperty('feee', anyFunction).
                    on.satisfying(isBelow42, anyFunction).
                    match
            ).
                toThrow();
        });
    });

    describe('trying to match with no patterns, using the match call', function () {
        it('throws an error', function () {
            expect(matching(42).match).toThrow();
        });
    });
});
