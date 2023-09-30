export interface Primitive {
    inputs: number
    outputs: number
}

export interface Program {
    functions: Map<string,Block>
    primitives: Map<string,Primitive>
}

export type Instruction = Call | Local | Num | Block

export interface Block {
    type: "block"
    instructions: Instruction[]
}

export interface Call {
    type: "call"
    name: string
}

export interface Num {
    type: "num"
    value: number
}

export interface Local {
    type: "set" | "get"
    name: string
}