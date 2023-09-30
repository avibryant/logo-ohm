import * as i from './instructions'

export function print(program: i.Program): string {
    const fbuf: string[] = []
    program.functions.forEach((f,name) => {
        fbuf.push(name)
        fbuf.push(": ")
        const buf: string[] = []
        printInstructions(f.instructions, buf)
        fbuf.push(buf.join(" "))
        fbuf.push("\n")
    })
    return fbuf.join("")
}

function printInstructions(inst: i.Instruction[], buf: string[]) {
    inst.forEach(i => {
        switch(i.type) {
            case "call":
                buf.push(i.name)
                break
            case "block":
                buf.push("[")
                printInstructions(i.instructions, buf)
                buf.push("]")
                break
            case "num":
                buf.push(i.value.toString())
                break
            case "get":
                buf.push("<" + i.name)
                break
            case "set":
                buf.push(">" + i.name)
                break
        }    
    })
}