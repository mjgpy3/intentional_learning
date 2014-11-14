describe('Scoring a bowling game', function () {
    describe('a new game', function () {
        var aNewGame = newGame();
        var frames = aNewGame.frames;

        describe('.frames.length', function () {
            it('is 10', function () {
                expect(frames.length).toEqual(10);
            });
        });
        describe('a frame', function () {
            var aFrame = frames[0];
            var tries = aFrame.tries;

            describe("tries.length", function () {
                it('is 2', function () {
                    expect(tries.length).toEqual(2);
                });
            });
        });
    });
});
