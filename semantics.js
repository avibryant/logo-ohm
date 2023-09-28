export const toAST = {
  Prog(cmds) {
    return cmds.toAST()
  },

  Cmds(cmds) {
    return cmds.children.map(c => c.toAST())
  },

  Cmd_func(_to, name, args, _nl, decls, _end, _eoc) {
    return {
      type: "func",
      name: name.toAST(),
      argNames: args.children.map(a => a.toAST()),
      decls: decls.toAST()
    }
  },

  Decls(decls) {
    return decls.children.map(d => d.toAST())
  },

  Decl_let(_decl, name, _eq, exps, _nl) {
    return {
      type: "let",
      name: name.toAST(),
      exps: exps.toAST()
    }
  },

  Exps(exps) {
    return exps.children.map(e => e.toAST())
  },

  Cmd_skip(_) {
    return null
  },

  Exp_num(_) {
    return this.sourceString
  },

  Exp_name(_) {
    return this.sourceString
  },

  Exp_infix(_) {
    return this.sourceString
  },

  Exp_block(_open, decls, _close) {
    return decls.toAST()
  },

  Exp_paren(_open, exps, _close) {
    return exps.toAST()
  },

  name(_first, _last) {
    return this.sourceString
  }
}
