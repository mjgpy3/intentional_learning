var printDiamond = function (letter) {
    var innerSpace = function (letter) {
        return spacePad(distance('A', letter)*2-1);
    };
    var dRow = 'D' + innerSpace('D') + 'D';
    var cRow = 'C' + innerSpace('C') + 'C';
    var bRow = 'B' + innerSpace('B') + 'B';
    var aRow = 'A';

    var row_0 = spacePad(distance('A', letter)) + aRow;
    var row_1 = spacePad(distance('B', letter)) + bRow + spacePad(distance('B', letter));
    var row_2 = spacePad(distance('C', letter)) + cRow + spacePad(distance('C', letter));

    if (letter === 'D') {
        return row_0 +
            '\n' + row_1 +
            '\n' + row_2 + '\n' +
            dRow +
            '\n' + row_2 +
            '\n' + row_1 + '\n' +
            row_0;
    }

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
