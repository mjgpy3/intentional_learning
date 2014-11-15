var printDiamond = function (letter) {
    var innerSpace = function (letter) {
        return spacePad(distance('A', letter)*2-1);
    };
    var internal = function (letter) {
        return letter + innerSpace(letter) + letter;
    };

    var row_0 = spacePad(distance('A', letter)) + 'A';
    var row_1 = spacePad(distance('B', letter)) + internal('B') + spacePad(distance('B', letter));
    var row_2 = spacePad(distance('C', letter)) + internal('C') + spacePad(distance('C', letter));

    if (letter === 'D') {
        return row_0 +
            '\n' + row_1 +
            '\n' + row_2 + '\n' +
            internal('D') +
            '\n' + row_2 +
            '\n' + row_1 + '\n' +
            row_0;
    }

    if (letter === 'C') {
        return row_0 +
            '\n' + row_1 + '\n' +
            internal('C') +
            '\n' + row_1 + '\n' +
            row_0;
    }

    if (letter === 'B') {
        return row_0 + '\n' + internal('B') + '\n' + row_0;
    }

    return row_0;
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
