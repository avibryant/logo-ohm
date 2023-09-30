import {compile} from './compiler'
import {print} from './printer'

const input = `
to foo (a b -- r) [
  a
]

to bar (-- a) [
  foo 1 2 
]
`
const inst = compile(input, new Map())
console.log(print(inst))