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

  type Rule = Ebnf*Ebnf
  type Grammar = Rule list

  let prependChar (c, text) = c.ToString() + text

  let symbol : Parser<char, unit> = anyOf ['['; ']'; '{'; '}'; '('; ')'; '<'; '>'; '\''; '"'; '='; '|'; '.'; ','; ';']

  let character = letter <|> digit <|> symbol <|> pchar '_'

  let identifier : Parser<Ebnf, unit> =
    letter .>>. manyChars (letter <|> digit <|> pchar '_') |>> (Identifier << prependChar)

  let terminal =
    between (pchar '\'') (pchar '\'') (many1Chars character) <|>
    between (pchar  '"') (pchar  '"') (manyChars character)

  let lhs = identifier

  let rec rhs : Parser<Ebnf, unit> = parse.Delay(fun () ->
        identifier
    <|> (pchar '[' >>. rhs .>> pchar ']' |>> Optional)
    <|> (pchar '{' >>. rhs .>> pchar '}' |>> Repetition)
    <|> (pchar '(' >>. rhs .>> pchar ')' |>> Grouping)
    <|> (rhs .>> pchar '|' .>>. rhs |>> Alteration)
    <|> (rhs .>> pchar ',' .>>. rhs |>> Concatination)
  )

  let rule : Parser<Rule, unit> = lhs .>> pchar '=' .>>. rhs .>> pchar ';'

  let grammar : Parser<Grammar, unit> = many rule
