export interface To {
    name: string
    block: Block
    inputs: string[],
    outputs: string[]
}

export type Statement = Set | Exp

export interface Set {
    type: "set"
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