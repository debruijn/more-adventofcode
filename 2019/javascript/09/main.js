const fs = require('fs')

const readInput = function (year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
}

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

const run = function () {
    // Read data
    let input = readInput(2019, '09')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Get results
    const resultPart1 = getOutput(input, [1], 0)[0][0]
    const resultPart2 = getOutput(input, [2], 0)[0][0]
    return [resultPart1, resultPart2]
}

const printRes = function (res) {
    console.log('Answer for part 1: ' + res[0])
    console.log('Answer for part 2: ' + res[1])
}

const runAndTime = function (run) {
    console.time('Run function run-time')
    const res = run()
    printRes(res)
    console.timeEnd('Run function run-time')
}

runAndTime(run)
