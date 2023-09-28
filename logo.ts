import {parse} from './ast'

const input = `
to foo :bar
let :y = output 3 + :bar [1? 2 3]

end
`
const ast = parse(input)
console.log(JSON.stringify(ast, null, 2))
