var printDiamond = function (letter) {
    var withInternalSpaces = function (l) {
        return l === 'A'
            ? 'A'
            : [l, spacePad(distance('A', l)*2-1), l].join('');
        },
        row = function (to) {
            return [spacePad(distance(to, letter)), withInternalSpaces(to), spacePad(distance(to, letter))].join('');
        },
        rowsUntil = function () {
            var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, results = [];
            for (var i = 0; distance(alpha[i], letter) > 0; i += 1) {
                results.push(row(alpha[i]));
            }
            return results;
        };

    return rowsUntil().concat(withInternalSpaces(letter), rowsUntil().reverse()).join('\n');
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
