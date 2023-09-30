import * as ohm from "ohm-js"

export const grammar = ohm.grammar(String.raw`

Logo {

    Prog
      = To*

    To
      = "to" name Effect? Block

    Effect
      = "(" EffectInputs EffectOutputs? ")"

    EffectInputs
      = name*

    EffectOutputs
      = "--" name+
  
    Block
      = "[" Statement+ "]"
      
    Statement
      = Set | Exp

    Set
      = "set" name Exp+

    Exp
      = num
      | name
      | operator
      | Block
      | Parens

    Parens
      = "(" Exp+ ")"

    operator = "+" | "-" | "*" | "/"

    name
      = letter alnum*
  
    num
      = digit* "." digit+  -- fract
      | digit+             -- whole
  }
`)
