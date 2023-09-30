import { grammar } from "./grammar"
import {toAST} from './parser'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

export function parse(input: string): To[] {
    const m = grammar.match(input)
    return semantics(m).toAST() as To[]
}

export interface To {
    type: "func"
    name: string
    block: Block
    inputs: string[],
    outputs: string[]
}

export type Statement = Set | Exp

export interface Set {
    type: "let"
    name: string
    exps: Exp[]
}

type Exp = Num | Word | Operator | Block | Paren

export interface Num {
    type: "num"
    text: string
}

export interface Word {
    type: "word"
    text: string
}

export interface Operator {
    type: "operator"
    text: string
}

export interface Block {
    type: "block"
    statements: Statement[]
}

export interface Paren {
    type: "paren"
    exps: Exp[]
}