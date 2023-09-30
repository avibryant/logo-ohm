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
        return iBlock
    }
    
    function compileBlock(stmts: a.Statement[]): i.Block {
        const instructions: i.Instruction[] = []

        genStatement(0)

        return {
            type: "block",
            instructions
        }

        function genStatement(i: number) {
            switch(stmts[i].type) {
                case "set":
                    //TODO
                    break
                case "word":
                case "operator":
                    genExpression(i)
                    break
                default:
                    throw new Error("statements cannot start with " + stmts[i].type)
            }
        }

        function genExpression(i: number) {
            switch(stmts[i].type) {
                case "num":
                    break
                case "paren":
                    break
                case "block":
                    break
                case "operator":
                case "word":
                    break
                default:
                    throw new Error("expressions cannot include " + stmts[i].type)
            }
        }
    }
}
