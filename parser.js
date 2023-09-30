export const toAST = {
  Prog(tos) {
    return tos.children.map(t => t.toAST())
  },

  To(_to, name, effect, block) {
    var inputs = []
    var outputs = []

    if(effect.numChildren > 0) {
      const e = effect.children[0].toAST()
      inputs = e.inputs
      outputs = e.outputs
    }

    return {
      name: name.toAST().text,
      block: block.toAST(),
      inputs,
      outputs
    }
  },

  Effect(_left, inputs, outputs, _right) {
    var outputNames = []
    if(outputs.numChildren > 0)
      outputNames = outputs.children[0].toAST()
    return {
      inputs: inputs.toAST(),
      outputs: outputNames
    }
  },

  EffectInputs(names) {
    return names.children.map(n => n.toAST().text)
  },

  EffectOutputs(_dash, names) {
    return names.children.map(n => n.toAST().text)
  },

  Set(_set, name, exps) {
    return {
      type: "set",
      name: name.toAST().text,
      exps: exps.children.map(e => e.toAST())
    }
  },

  Block(_open, statements, _close) {
    return {
      type: "block",
      statements: statements.children.map(s => s.toAST())
    }
  },

  Parens(_open, exps, _close) {
    return {
      type: "paren",
      exps: exps.children.map(e => e.toAST())
    }
  },

  num(_) {
    return {
      type: "num",
      text: this.sourceString
    }
  },

  operator(_) {
    return {
      type: "operator",
      text: this.sourceString
    }
  },

  name(_first, _last) {
    return {
      type: "word",
      text: this.sourceString
    }
  }
}
