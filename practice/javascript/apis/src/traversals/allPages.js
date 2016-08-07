const R = require('ramda'),
  rp = require('request-promise');

// TODO: Async factor (how many pages to get at once)
// TODO: Better error results for validate
// TODO: Assert keyset is correct (like Hapi does)
// TODO: Try to use count and per-page to get all at the same time

const strategy = {
  name: 'getAllPages',
  routeKey: 'paged',
  validate: R
    .allPass([
      R.has('url'),
      R.pipe(R.prop('url'), R.test(/{pageNumber}/)),
      R.has('next'),
      R.pipe(R.prop('next'), R.is(Array)),
      R.pipe(R.prop('next'), R.all(R.is(String))),
      R.has('data'),
      R.pipe(R.prop('data'), R.is(Array)),
      R.pipe(R.prop('data'), R.all(R.is(String))),
      R.either(
        R.propIs(Number, 'firstPage'),
        R.pipe(R.has('firstPage'), R.not)
      )
    ]),
  get: entity => {
    const paged = entity.routes.paged;

    function recur(vs, url) {
      return rp({
        method: 'GET',
        json: true,
        url: url
      })
      .then(
        results => {
          const nextPage = R.path(paged.next, results),
            pageResults = R.path(paged.data, results),
            resultsAccum = vs.concat(pageResults);

          return nextPage ? recur(resultsAccum, nextPage) : Promise.resolve(resultsAccum);
        }
      );
    }

    const firstPage = R.defaultTo(1, paged.firstPage),
      firstUrl = R.replace('{pageNumber}', firstPage, paged.url);

    return recur([], firstUrl);
  }
};

//strategy
//  .get({
//    routes: {
//      paged: {
//        url: 'http://swapi.co/api/planets?page={pageNumber}',
//        next: ['next'],
//        data: ['results']
//      }
//    }
//  })
//  .then(
//    results => console.log(results)
//  );

module.exports = strategy;

[
  () => !strategy.validate({}),
  () => !strategy.validate({ url: '' }),
  () => !strategy.validate({ url: '{pageNumber}' }),
  () => !strategy.validate({ url: '{pageNumber}', next: 42 }),
  () => strategy.validate({ data: [], url: '{pageNumber}', next: [] }),
  () => strategy.validate({ url: '{pageNumber}', next: ['foo'], data: [] }),
  () => !strategy.validate({ url: '{pageNumber}', next: [42] }),
  () => !strategy.validate({ url: '{pageNumber}', next: ['foo', 'bar', 42, 'baz'] }),
  () => strategy.validate({ url: '{pageNumber}', next: ['foo', 'bar', 'a', 'baz'], data: [] }),
  () => !strategy.validate({ url: '{pageNumber}', next: [] , firstPage: 'foo' }),
  () => strategy.validate({ url: '{pageNumber}', next: [] , firstPage: 0, data: [] }),
  () => strategy.validate({ url: '{pageNumber}', next: [] , data: ['a', 'b'] }),
  () => !strategy.validate({ url: '{pageNumber}', next: [] , firstPage: 0, data: ['a', 42, 'b'] }),
].forEach((testCase, i) => {
  if (!testCase()){ console.log(`FAILED AT ${i}`); }
});
