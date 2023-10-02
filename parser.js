export const toAST = {
  Prog(tos) {
    return tos.children.map(t => t.toAST())
  },

  To(_to, name, symbols, block) {
    var inputs = []

    return {
      name: name.toAST().text,
      block: block.toAST(),
      inputs: symbols.children.map(s => s.toAST().text),
    }
  },

  Block(_open, words, _close) {
    return {
      type: "block",
      words: words.children.map(s => s.toAST())
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
      type: "name",
      text: this.sourceString
    }
  },

  symbol(_colon, name) {
    return {
      type: "symbol",
      text: name.toAST().text
    }
  }
}
