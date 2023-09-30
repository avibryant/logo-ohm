import {compile} from './compiler'

const input = `
to foo (a b -- c) [
  3
]
`
const inst = compile(input, new Map())
console.log(inst)