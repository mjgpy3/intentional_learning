#r "FParsec.1.0.2/lib/net40-client/FParsec.dll";
#r "FParsec.1.0.2/lib/net40-client/FParsecCS.dll";

open FParsec

let foo : Parser<char, unit> = pchar 'a'
