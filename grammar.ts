import * as ohm from "ohm-js"

export const grammar = ohm.grammar(String.raw`

Logo {

    Prog
      = Cmds
  
    Cmds
      = Cmd*
  
    Cmd
      = to name var* nl Decls endK nl  -- func
      | Decls                               -- decls

    Decls
      = Decl+

    Decl
      = decl var "=" Exps nl               -- let
      | Exps                               -- exps
      | "\n"                               -- skip
  
    Exps
      = Exp+
    
    Exp
      = num           -- num
      | name          -- name
      | var           -- var
      | infix         -- infix
      | "[" Decls "]"  -- block
      | "(" Exps ")"   -- paren

    infix = "+" | "-" | "*" | "/"

    name  (an identifier)
      = ~keyword letter alnum*
  
    num  (a number)
      = digit* "." digit+  -- fract
      | digit+             -- whole
  
    var = ":" name
    keyword = decl | endK | to
    decl = "let" ~alnum
    to = "to" ~alnum
    endK = "end" ~alnum
    space := "\t" | " "
    nl = "\n" | end
}
`)
