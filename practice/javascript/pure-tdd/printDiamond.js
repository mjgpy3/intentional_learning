var printDiamond = function (letter) {
    var internal = function (letter) {
        return letter === 'A' ? 'A' : letter + spacePad(distance('A', letter)*2-1) + letter;
    };
    var row = function (to) {
        return spacePad(distance(to, letter)) +
            internal(to) +
            spacePad(distance(to, letter));
    };
    var rowsUntil = function () {
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            i,
            results = [];
        for (var i = 0; distance(alpha[i], letter) > 0; i += 1) {
            results.push(row(alpha[i]));
        }
        return results;
    };

    return rowsUntil().concat(internal(letter), rowsUntil().reverse()).join('\n');
};

var spacePad = function (length) {
    var result = '', i;
    for (i = 0; i < length; i += 1) {
        result += ' ';
    }
    return result;
};

var distance = function (c1, c2) {
    return c2.charCodeAt(0) - c1.charCodeAt(0);
};
