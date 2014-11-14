describe('Scoring a bowling game', function () {
    describe('a new game', function () {
        describe('.frames.length', function () {
            it('is 10', function () {
                expect(newGame().frames.length).toEqual(10);
            });
        });
    });
});
