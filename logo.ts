import { grammar } from "./grammar"
import {toAST} from './semantics'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

const input = "output foo 3+ foo 4"
const m = grammar.match(input)
if(m.succeeded())
    console.log(semantics(m).toAST())
