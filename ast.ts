export interface To {
    name: string
    block: Block
    inputs: string[]
}

type Word = Num | Name | Operator | Block | Sym

export interface Num {
    type: "num"
    text: string
}

export interface Name {
    type: "name"
    text: string
}

export interface Sym {
    type: "symbol"
    text: string
}

export interface Operator {
    type: "operator"
    text: string
}

export interface Block {
    type: "block"
    words: Word[]
}
