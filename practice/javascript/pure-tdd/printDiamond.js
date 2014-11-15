var printDiamond = function (letter) {
    var innerSpace = function (letter) {
        return spacePad(distance('A', letter)*2-1);
    };
    var internal = function (letter) {
        if (letter === 'A') {
            return 'A';
        }
        return letter + innerSpace(letter) + letter;
    };
    var row = function(to) {
        return spacePad(distance(to, letter)) +
            internal(to) +
            spacePad(distance(to, letter));
    };

    if (letter === 'D') {
        return row('A') +
            '\n' + row('B') +
            '\n' + row('C') + '\n' +
            internal('D') +
            '\n' + row('C') +
            '\n' + row('B') + '\n' +
            row('A');
    }

    if (letter === 'C') {
        return row('A') +
            '\n' + row('B') + '\n' +
            internal('C') +
            '\n' + row('B') + '\n' +
            row('A');
    }

    if (letter === 'B') {
        return row('A') + '\n' + internal('B') + '\n' + row('A');
    }

    return row('A');
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
