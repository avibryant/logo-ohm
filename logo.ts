import {parse} from './ast'

const input = `
to foo (a b -- c) [
  bar
  set foo [1 2 3]
]
`
const ast = parse(input)
console.log(JSON.stringify(ast, null, 2))

