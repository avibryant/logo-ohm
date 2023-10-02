import { grammar } from "./grammar"
import {toAST} from './parser'
import * as a from './ast'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

function parse(input: string): a.To[] {
    const m = grammar.match(input)
    return semantics(m).toAST() as a.To[]
}

const input = `
to foo :a :b [
  let a 1
]
`
const inst = parse(input)
console.log(inst[0].block.words)

