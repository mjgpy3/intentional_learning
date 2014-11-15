var printDiamond = function (letter) {
    var cRow = 'C   C';
    var bRow = 'B B';
    var aRow = 'A';

    var row_0 = spacePad(distance('A', letter)) + aRow;
    var row_1 = spacePad(distance('B', letter)) + bRow + spacePad(distance('B', letter));

    if (letter === 'C') {
        return row_0 +
            '\n' + row_1 + '\n' +
            cRow +
            '\n' + row_1 + '\n' +
            row_0;
    }

    if (letter === 'B') {
        return row_0 + '\n' + bRow + '\n' + row_0;
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
