/*
interface Func {
    type: "func"
    name: string
    argNames: string[]
    cmds: Cmd[]
}

interface Let {
  type: "let"
  name: string
  expr: Expr
}

interface Cmd {

}
*/

export const toAST = {
  Prog(cmds) {
    return cmds.toAST()
  },

  Cmds(cmds) {
    return cmds.children.map(c => c.toAST())
  },

  Cmd_funcDecl(_to, name, args, _nl, cmds, _end, _eoc) {
    return {
      type: "func",
      name: name.toAST(),
      argNames: args.children.map(a => a.toAST),
      cmds: cmds.children.map(c => c.toAST())
    }
  },

  Cmd_varDecl(_decl, name, _eq, exp, _eoc) {
    return {
      type: "let",
      name: name.toAST(),
      expr: exp.toAST()
    }
  },

  Cmd_exp(exp) {
    return exp.toAST()
  },

  Cmd_skip(_) {
    return null
  },

  AddExp_add(x, _plus, y) {
    return ["add", x.toAST(), y.toAST()]
  },

  AddExp_sub(x, _minus, y) {
    return ["sub", x.toAST(), y.toAST()]
  },

  MulExp_mul(x, _times, y) {
    return ["mul", x.toAST(), y.toAST()]
  },

  MulExp_div(x, _div, y) {
    return ["div", x.toAST(), y.toAST()]
  },

  UnExp_neg(_minus, exp) {
    return ["neg", exp.toAST()]
  },

  PriExp_num(_) {
    return this.sourceString
  },

  PriExp_name(name) {
    return this.sourceString
  },

  PriExp_block(_open, cmds, _close) {
    return cmds.children.map(a => a.toAST())
  },

  PriExp_paren(_open, exp, _close) {
    return exp.toAST()
  }
}
