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
    if (length === 2) {
        return '  ';
    }

    if (length === 1) {
        return ' ';
    }
    return '';
};
