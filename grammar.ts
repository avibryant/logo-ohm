//From Alex Warth

import * as ohm from "ohm-js"

export const grammar = ohm.grammar(String.raw`

Logo {

    Prog
      = Cmds
  
    Cmds
      = Cmd*
  
    Cmd
      = to name name* "\n" Cmds endK "\n"  -- funcDecl
      | decl name "=" Exp "\n"             -- varDecl
      | Exp                                -- exp
      | "\n"                              -- skip
  
    Exp
      = AddExp
    
    AddExp
      = AddExp "+" MulExp  -- add
      | AddExp "-" MulExp  -- sub
      | MulExp
  
    MulExp
      = MulExp "*" UnExp  -- mul
      | MulExp "/" UnExp  -- div
      | UnExp
  
    UnExp
      = "-" PriExp  -- neg
      | PriExp
  
    PriExp
      = num           -- num
      | name          -- name
      | "[" Cmds "]"  -- block
      | "(" Exp ")"   -- paren
  
    name  (an identifier)
      = ~keyword letter alnum*
  
    num  (a number)
      = digit* "." digit+  -- fract
      | digit+             -- whole
  
    priExpStart = digit | "[" | "("
    keyword = decl | endK | to
    decl = "let" ~alnum
    to = "to" ~alnum
    endK = "end" ~alnum
    nl = "\n"  
}
`)
