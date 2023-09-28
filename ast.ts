import { grammar } from "./grammar"
import {toAST} from './parser'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

export function parse(input: string): Cmd[] {
    const m = grammar.match(input)
    return semantics(m).toAST() as Cmd[]
}

export type Cmd =  Func | Decls
export type Decl = Let | Exps
export type Exp = Num | Word | Operator | Block | Var

export interface Func {
    type: "func"
    argNames: string[]
    decls: Decl[]
}

export interface Decls {
    type: "decls"
    decls: Decl[]
}


export interface Let {
    type: "let"
    name: string
    exps: Exp[]
}

export interface Exps {
    type: "exps"
    exps: Exp[]
}

export interface Num {
    type: "num"
    text: string
}

export interface Word {
    type: "word"
    name: string
}

export interface Operator {
    type: "operator"
    name: string
}

export interface Block {
    type: "block"
    decls: Decl[]
}

export interface Var {
    type: "var"
    name: string
}