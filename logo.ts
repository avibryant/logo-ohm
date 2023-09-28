import { grammar } from "./grammar"
import {toAST} from './semantics'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

const input = `
to foo bar
let y = output 3 + 4 [1 2 3]
end
`

const m = grammar.match(input)
if(m.succeeded())
    console.log(semantics(m).toAST())
else
    console.log("bah")