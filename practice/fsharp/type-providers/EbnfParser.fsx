#r "FParsec.1.0.2/lib/net40-client/FParsec.dll";
#r "FParsec.1.0.2/lib/net40-client/FParsecCS.dll";

#nowarn "40"

module EbnfParser =
  open FParsec

  type Ebnf =
    | Identifier of string
    | Definition of Ebnf*Ebnf
    | Concatination of Ebnf*Ebnf
    | Alteration of Ebnf*Ebnf
    | Repetition of Ebnf
    | Grouping of Ebnf
    | Optional of Ebnf
    | Terminal of string

  type Rule = Ebnf*Ebnf
  type Grammar = Rule list

  let prependChar (c, text) = c.ToString() + text

  let symbol extra = anyOf <| extra::['['; ']'; '{'; '}'; '('; ')'; '<'; '>'; '='; '|'; '.'; ','; ';'; '-']

  let character extra = letter <|> digit <|> symbol extra <|> pchar '_'

  let identifier : Parser<Ebnf, unit> =
    letter .>>. manyChars (letter <|> digit <|> pchar '_') |>> (Identifier << prependChar)

  let terminal =
        (between (pchar '\'') (pchar '\'') (many1Chars <| character '"'))
    <|> (between (pchar  '"') (pchar  '"') (many1Chars <| character '\'')) |>> Terminal

  let lhs = identifier

  let rec rhs : Parser<Ebnf, unit> =
    let recur = parse.Delay(fun () -> rhs)

    choice [
      pchar '|' >>.recur .>>. recur |>> Alteration;
      pchar ',' >>. recur .>>. recur |>> Concatination;
      identifier;
      terminal;
      pchar '[' >>. recur .>> pchar ']' |>> Optional;
      pchar '{' >>. recur .>> pchar '}' |>> Repetition;
      pchar '(' >>. recur .>> pchar ')' |>> Grouping
    ]

  let rule : Parser<Rule, unit> = lhs .>> pchar '=' .>>. rhs .>> pchar ';'

  let grammar : Parser<Grammar, unit> = sepEndBy rule (pchar ';')

  let r1 = run grammar "integer=,|\"0\"[\"-\"]natural_number;"

  printfn "%A" r1
