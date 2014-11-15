var printDiamond = function (letter) {
    var cRow = 'C   C';
    var bRow = 'B B';
    var aRow = 'A';

    if (letter === 'C') {
        return spacePad(distance('A', letter)) + aRow + '\n' + spacePad(distance('B', letter)) + bRow + spacePad(distance('B', letter)) + '\n' + cRow + '\n' + spacePad(distance('B', letter)) + bRow + spacePad(distance('B', letter)) + '\n' + spacePad(distance('A', letter)) + aRow;
    }

    if (letter === 'B') {
        return spacePad(distance('A', letter)) + aRow + '\n' + bRow + '\n' + spacePad(distance('A', letter)) + aRow;
    }

    return aRow;
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
