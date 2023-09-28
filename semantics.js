export const toAST = {

  Cmd_func(_to, name, args, _nl, decls, _end, _eoc) {
    return {
      type: "func",
      name: name.toAST(),
      argNames: args.children.map(a => a.toAST()),
      decls: decls.toAST()
    }
  },

  Cmd_decls(decls) {
    return {
      type: "decls",
      decls: decls.toAST()
    }
  },

  Decl_let(_decl, name, _eq, exps, _nl) {
    return {
      type: "let",
      name: name.toAST(),
      exps: exps.toAST()
    }
  },

  Decl_exps(exps) {
    return {
      type: "exps",
      exps: exps.toAST()
    }
  },

  Exp_num(_) {
    return {
      type: "num",
      text: this.sourceString
    }
  },

  Exp_name(_) {
    return {
      type: "word",
      name: this.sourceString
    }
  },

  Exp_infix(_) {
    return {
      type: "infix",
      name: this.sourceString
    }
  },

  Exp_block(_open, decls, _close) {
    return {
      type: "block",
      decls: decls.toAST()
    }
  },

  Exp_paren(_open, exps, _close) {
    return exps.toAST()
  },

  name(_first, _last) {
    return this.sourceString
  },

  var(_color, name) {
    return {
      type: "var",
      name: name.toAST()
    }
  },

  Prog(cmds) {
    return cmds.toAST()
  },

  Decl_skip(_) {
    return null
  },

  Cmds(cmds) {
    return cmds.children.map(c => c.toAST())
  },

  Decls(decls) {
    return decls.children.map(d => d.toAST()).filter(d => d != null)
  },

  Exps(exps) {
    return exps.children.map(e => e.toAST())
  }
}
