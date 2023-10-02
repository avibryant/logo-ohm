import * as ohm from "ohm-js"

export const grammar = ohm.grammar(String.raw`

Logo {

    Prog
      = To*

    To
      = "to" name symbol* Block
  
    Block
      = "[" Word+ "]"

    Word
      = num
      | symbol
      | name
      | operator
      | Block

    operator = "+" | "-" | "*" | "/"

    name
      = letter alnum*

    symbol
      = ":" name
      
    num
      = digit* "." digit+  -- fract
      | digit+             -- whole
  }
`)
