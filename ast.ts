export type Node =
    Func |
    Decls |
    Let |
    Exps |
    Num |
    Word |
    Operator | 
    Block | 
    Var

export interface Func {
    type: "func"
    argNames: string[]
    decls: Decl[]
}

export interface Decls {
    type: "decls"
    decls: Decl[]
}

type Decl = Let | Exps
export interface Let {
    type: "let"
    name: string
    exps: Exp[]
}

export interface Exps {
    type: "exps"
    exps: Exp[]
}

export type Exp = Num | Word | Operator | Block | Var

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