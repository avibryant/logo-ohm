import * as ohm from "ohm-js"

export const grammar = ohm.grammar(String.raw`

Logo {

    Prog
      = Cmds
  
    Cmds
      = Cmd*
  
    Cmd
      = to name name* nl Decls endK nl  -- func
      | Decls                               -- decls
      | "\n"                                -- skip

    Decls
      = Decl+

    Decl
      = decl name "=" Exps nl            -- let
      | Exps                               -- exps
  
    Exps
      = Exp+
    
    Exp
      = num           -- num
      | name          -- name
      | infix         -- infix
      | "[" Decls "]"  -- block
      | "(" Exps ")"   -- paren

    infix = "+" | "-" | "*" | "/"

    name  (an identifier)
      = ~keyword letter alnum*
  
    num  (a number)
      = digit* "." digit+  -- fract
      | digit+             -- whole
  
    keyword = decl | endK | to
    decl = "let" ~alnum
    to = "to" ~alnum
    endK = "end" ~alnum
    space := "\t" | " "
    nl = "\n" | end
}
`)
