var printDiamond = function (letter) {
    var bRow = 'B B';
    var aRow = 'A';

    if (letter === 'C') {
        return '  ' + aRow + '\n ' + bRow + ' \nC   C\n ' + bRow + ' \n  ' + aRow;
    }

    if (letter === 'B') {
        return ' ' + aRow + '\n' + bRow + '\n ' + aRow;
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
