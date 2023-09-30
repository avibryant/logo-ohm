import * as a from './ast'
import * as i from './instructions'
import { grammar } from "./grammar"
import {toAST} from './parser'

const semantics = grammar.createSemantics()
semantics.addOperation("toAST", toAST)

function parse(input: string): a.To[] {
    const m = grammar.match(input)
    return semantics(m).toAST() as a.To[]
}

export function compile(input: string, prims: Map<string,i.Primitive>): i.Program {
    const funcs = new Map<string,a.To>()
    parse(input).forEach(to => funcs.set(to.name, to))
    let compiled = new Map<string,i.Block>()

     function compileFunc(to: a.To): i.Block {
        const block = compileBlock(to.block.statements, new Set(to.inputs))
        to.inputs.forEach(name => {
            block.instructions.unshift({
                type: "set",
                name: name
            })
        })
        if(block.stack != to.outputs.length)
            throw new Error("Expected " + to.outputs.length + " outputs for " + to.name + " but got " + block.stack)
        return block
    }
    
    function compileBlock(stmts: a.Statement[], locals: Set<string>): i.Block {
        const instructions: i.Instruction[] = []

        const n = genStatement(stmts.slice(), instructions, locals)

        return {
            type: "block",
            instructions,
            stack: n
        }
    }

    function genStatement(stmts: a.Statement[], instructions: i.Instruction[], locals: Set<string>): number {
        if(stmts.length == 0)
            throw new Error("Unexpectedly ran out of statements")

        const peek = stmts[0]
        if(peek.type == "set") {
            const stack = genExpression(peek.exps, instructions, locals)
            if(stack == 0)
                throw new Error("Nothing to set " + peek.name + " to")
            stmts.shift()
            instructions.push({
                type: "set",
                name: peek.name
            })
            locals.add(peek.name)
            return stack - 1
        } else {
            return genExpression(stmts, instructions, locals)
        }
    }


    function genExpression(stmts: a.Statement[], instructions: i.Instruction[], locals: Set<string>): number {
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
            case "word":
                if(locals.has(peek.text)) {
                    stmts.shift()
                    instructions.push({
                        type: "get",
                        name: peek.text
                    })
                    return 1
                }
            case "operator":
                const ar = arity(peek.text)
                stmts.shift()
                let required = ar.inputs
                while(required > 0) {
                    required -= genExpression(stmts, instructions, locals)
                }
                instructions.push({
                    type: "call",
                    name: peek.text
                })
                return ar.outputs + required
            case "paren":
                const expressions = peek.exps.slice()
                let stack = 0
                while(expressions.length > 0) {
                    stack += genExpression(expressions, instructions, locals)
                }
                return stack
            case "block":
                instructions.push(compileBlock(peek.statements, locals))
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
        if(funcs.has(name)) {
            const f = funcs.get(name)!
            return {
                inputs: f.inputs.length,
                outputs: f.outputs.length
            }
        }

        if(prims.has(name)) {
            const p = prims.get(name)!
            return {
                inputs: p.inputs,
                outputs: p.outputs
            }
        }

        throw new Error("Could not find " + name)
    }

    funcs.forEach((to,name) => {
        compiled.set(name, compileFunc(to))
    })

    return {
        functions: compiled,
        primitives: prims
    }
}
