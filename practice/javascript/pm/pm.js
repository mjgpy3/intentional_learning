var matching = function (toMatch) {
    var cases, matcher, matchedResultOr, isMatchingAnObject, addCaseAndGetMatcher;

    cases = [];

    isMatchingAnObject = function () {
        return typeof toMatch === 'object' && toMatch !== null;
    };

    addCaseAndGetMatcher = function (p, resultCalculator) {
        cases.push({
            isMatch: p,
            result: resultCalculator
        });

        return matcher;
    };

    matchedResultOr = function (resultCalculator) {
        return function () {
            matchingCase = cases.find(function (aCase) {
                return aCase.isMatch(toMatch);
            });

            if (matchingCase) {
                return matchingCase.result(toMatch);
            }

            return resultCalculator(toMatch);
        };
    };

    matcher = {
        match: matchedResultOr(function () {
            throw new Error('Non-exhaustive patterns when attempting to match ' + toMatch);
        }),
        otherwise: function (resultCalculator) {
            return matchedResultOr(resultCalculator)();
        },
        on: {
            objectWithProperty: function (prop, resultCalculator) {
                return addCaseAndGetMatcher(function () {
                    return isMatchingAnObject() && toMatch[prop] !== undefined;
                },
                    resultCalculator
                );
            },
            objectWithProperties: function () {
                var args = [].slice.call(arguments);

                return addCaseAndGetMatcher(function () {
                    return isMatchingAnObject() && args.slice(0, -1).every(function (prop) {
                        return toMatch.hasOwnProperty(prop);
                    });
                },
                    args[args.length - 1]
                );
            },
            value: function (exactMatch, resultCalculator) {
                return addCaseAndGetMatcher(function () {
                    return toMatch === exactMatch;
                },
                    resultCalculator
                );
            },
            object: function (resultCalculator) {
                return addCaseAndGetMatcher(isMatchingAnObject, resultCalculator);
            },
            satisfying: addCaseAndGetMatcher
        }
    };

    return matcher;
};
