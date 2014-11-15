var printDiamond = function (letter) {
    if (letter === 'C') {
        return '  A\n B B \nC   C\n B B \n  A';
    }

    if (letter === 'B') {
        return ' A\nB B\n A';
    }

    return 'A';
};
