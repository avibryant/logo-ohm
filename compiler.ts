import * as a from './ast'
import * as i from './instructions'
import { grammar } from "./grammar"
import {toAST} from './parser'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

function parse(input: string): a.To[] {
    const m = grammar.match(input)
    return semantics(m).tokenize() as a.To[]
}

export function compile(input: string, prims: Map<string,i.Primitive>): i.Program {
    const funcs = new Map<string,a.To>()
    parse(input).forEach(to => funcs.set(to.name, to))
    const compiled = new Map<string,i.Block>()

    funcs.forEach((to,name) => {
        compiled.set(name, compileFunc(to))
    })

    return {
        functions: compiled,
        primitives: prims
    }

    function compileFunc(to: a.To): i.Block {
        const iBlock = compileBlock(to.block.statements)
        //TODO add locals
        //TODO check arity
        return iBlock
    }
    
    function compileBlock(stmts: a.Statement[]): i.Block {
        const instructions: i.Instruction[] = []

        genStatement(stmts.slice(), instructions)

        return {
            type: "block",
            instructions
        }
    }

    function genStatement(stmts: a.Statement[], instructions: i.Instruction[]): number {
        if(stmts.length == 0)
            throw new Error("Unexpectedly ran out of statements")

        const peek = stmts[0]
        switch(peek.type) {
            case "set":
                //TODO
                return 0
            case "word":
            case "operator":
                return genExpression(stmts, instructions)
            default:
                throw new Error("statements cannot start with " + peek.type)
        }
    }


    function genExpression(stmts: a.Statement[], instructions: i.Instruction[]): number {
        if(stmts.length == 0)
            throw new Error("Ran out of expressions unexpectedly")

        const peek = stmts[0]
        switch(peek.type) {
            case "num":
                instructions.push({
                    type: "num",
                    value: parseFloat(peek.text)
                })
                stmts.shift()
                return 1
                break
            case "operator":
            case "word":
                const ar = arity(peek.text)
                stmts.shift()
                let required = ar.inputs
                while(required > 0) {
                    required -= genExpression(stmts, instructions)
                }
                instructions.push({
                    type: "call",
                    name: peek.text
                })
                return ar.outputs
            case "paren":
                const expressions = peek.exps.slice()
                let stack = 0
                while(expressions.length > 0) {
                    stack += genExpression(expressions, instructions)
                }
                return stack
            case "block":
                instructions.push(compileBlock(peek.statements))
                return 1
            default:
                throw new Error("expressions cannot include " + peek.type)
        }
    }

    interface Arity {
        inputs: number
        outputs: number
    }

    function arity(name: string): Arity {
        return {inputs: 0, outputs: 0} //TODO
    }
}
