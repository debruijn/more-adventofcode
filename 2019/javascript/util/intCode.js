const num2decimals = function (num) {
    let decimals = num
        .toString()
        .split('')
        .map((x) => parseInt(x))
    let len = decimals.length
    for (let i = 0; i < 5 - len; i++) {
        decimals.unshift(0)
    }
    return decimals
}

const getOutput = function (data, inputVals, pos = 0) {
    let output = []
    let relBase = 0
    let dataExtra = new Map()

    const args2nums = function (args, modes) {
        for (let [i, j] of args.entries()) {
            args[i] = modes[i] === 0 ? readVal(j) : modes[i] === 2 ? readVal(j + relBase) : j
        }
        return args
    }

    const readVal = function (loc) {
        let val = loc <= data.length ? data[loc] : dataExtra.has(loc) ? dataExtra.get(loc) : 0
        return val
    }

    const writeVal = function (val, loc, mode = 0) {
        if (mode === 2) {
            loc += relBase
        }
        if (loc > data.length) {
            dataExtra.set(loc, val)
        } else {
            data[loc] = val
        }
    }

    while (pos >= 0) {
        let modesOpcode = num2decimals(data[pos])
        let opcode = 10 * modesOpcode.at(-2) + modesOpcode.at(-1)
        let modes = [modesOpcode.at(2), modesOpcode.at(1), modesOpcode.at(0)]

        // Uncomment for debugging purposes
        // console.log(pos, modesOpcode, opcode, modes, data[pos])
        if (opcode === 99) {
            return [output, pos, dataExtra]
        } else if (opcode === 3) {
            writeVal(inputVals.shift(), data[pos + 1], modes[0])
            pos += 2
            continue
        } else if (opcode === 4) {
            let args = args2nums(data.slice(pos + 1, pos + 2), modes)
            output.push(args[0])
            pos += 2
            continue
            // return [output, pos]
        } else if (opcode === 9) {
            let args = args2nums(data.slice(pos + 1, pos + 2), modes)
            relBase += args[0]
            pos += 2
            continue
        }
        let args = args2nums(data.slice(pos + 1, pos + 3), modes)
        if (opcode === 1) {
            writeVal(args[0] + args[1], data[pos + 3], modes[2])
            pos += 4
        } else if (opcode === 2) {
            writeVal(args[0] * args[1], data[pos + 3], modes[2])
            pos += 4
        } else if (opcode === 5) {
            pos = args[0] === 0 ? pos + 3 : args[1]
        } else if (opcode === 6) {
            pos = args[0] !== 0 ? pos + 3 : args[1]
        } else if (opcode === 7) {
            writeVal(args[0] < args[1] ? 1 : 0, data[pos + 3], modes[2])
            pos += 4
        } else if (opcode === 8) {
            writeVal(args[0] === args[1] ? 1 : 0, data[pos + 3], modes[2])
            pos += 4
        } else {
            console.log('Wrong value for current position: ' + data[pos] + ', ' + opcode + ' at ' + pos)
            return [output, pos, dataExtra]
        }
    }
    return [output, pos, dataExtra]
}

class intCodePC {
    data
    pos = 0
    dataExtra = new Map()
    relBase = 0
    output = []
    modes = [0, 0, 0]
    stop = false
    stopAtOutput = false
    input

    constructor(data, input = undefined) {
        this.data = data
        this.input = input !== undefined ? input : []
    }

    pos2decimals(pos) {
        let decimals = this.data[pos]
            .toString()
            .split('')
            .map((x) => parseInt(x))
        let len = decimals.length
        for (let i = 0; i < 5 - len; i++) {
            decimals.unshift(0)
        }
        return decimals
    }

    args2nums(args) {
        for (let [i, j] of args.entries()) {
            args[i] = this.modes[i] === 0 ? this.readVal(j) : this.modes[i] === 2 ? this.readVal(j + this.relBase) : j
        }
        return args
    }

    readVal(loc) {
        return loc <= this.data.length ? this.data[loc] : this.dataExtra.has(loc) ? this.dataExtra.get(loc) : 0
    }

    writeVal(val, loc, mode = 0) {
        if (mode === 2) {
            loc += this.relBase
        }
        if (loc > this.data.length) {
            this.dataExtra.set(loc, val)
        } else {
            this.data[loc] = val
        }
    }

    doStep() {
        let modesOpcode = this.pos2decimals(this.pos)
        let opcode = 10 * modesOpcode.at(-2) + modesOpcode.at(-1)
        this.modes = [modesOpcode.at(2), modesOpcode.at(1), modesOpcode.at(0)]

        if (opcode === 99) {
            this.stop = 1
            return
        } else if (opcode === 3) {
            if (this.input.length === 0) {
                this.stop = 3
            } else {
                this.writeVal(this.input.shift(), this.data[this.pos + 1], this.modes[0])
                this.pos += 2
            }
            return
        } else if (opcode === 4) {
            let args = this.args2nums(this.data.slice(this.pos + 1, this.pos + 2), this.modes)
            this.output.push(args[0])
            this.pos += 2
            if (this.stopAtOutput > 0 && this.output.length === this.stopAtOutput) {
                this.stop = 2
            }
            return
        } else if (opcode === 9) {
            let args = this.args2nums(this.data.slice(this.pos + 1, this.pos + 2), this.modes)
            this.relBase += args[0]
            this.pos += 2
            return
        }
        let args = this.args2nums(this.data.slice(this.pos + 1, this.pos + 3), this.modes)
        if (opcode === 1) {
            this.writeVal(args[0] + args[1], this.data[this.pos + 3], this.modes[2])
            this.pos += 4
        } else if (opcode === 2) {
            this.writeVal(args[0] * args[1], this.data[this.pos + 3], this.modes[2])
            this.pos += 4
        } else if (opcode === 5) {
            this.pos = args[0] === 0 ? this.pos + 3 : args[1]
        } else if (opcode === 6) {
            this.pos = args[0] !== 0 ? this.pos + 3 : args[1]
        } else if (opcode === 7) {
            this.writeVal(args[0] < args[1] ? 1 : 0, this.data[this.pos + 3], this.modes[2])
            this.pos += 4
        } else if (opcode === 8) {
            this.writeVal(args[0] === args[1] ? 1 : 0, this.data[this.pos + 3], this.modes[2])
            this.pos += 4
        } else {
            console.log('Wrong value for current position: ' + this.data[this.pos] + ', ' + opcode + ' at ' + this.pos)
            this.stop = 999
        }
    }

    cleanOut() {
        this.output = []
    }

    setInput(input) {
        this.input = input === undefined ? this.input : input
        this.input = typeof this.input === 'number' ? [this.input] : this.input
    }

    addInput(input) {
        if (this.input === undefined) {
            this.setInput(input)
        } else if (typeof input === 'number') {
            this.input.push(input)
        } else {
            for (let num of input) {
                this.input.push(num)
            }
        }
    }

    runUntilEnd(input = undefined) {
        this.setInput(input)
        this.stop = false
        this.stopAtOutput = false

        while (!this.stop) {
            this.doStep()
        }
        return [this.output, this.stop]
    }

    runUntilOutput(input = undefined, k = 1) {
        this.setInput(input)
        this.stop = false
        this.stopAtOutput = k

        while (!this.stop) {
            this.doStep()
        }
        return [this.output, this.stop]
    }
}

export { getOutput, intCodePC }
