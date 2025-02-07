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

const args2nums = function (args, data, modes) {
    for (let [i, j] of args.entries()) {
        args[i] = modes[i] === 0 ? data[j] : j
    }
    return args
}

const getOutput = function (data, system_id) {
    let output = -9999
    let pos = 0

    while (pos >= 0) {
        let modesOpcode = num2decimals(data[pos])
        let opcode = 10 * modesOpcode.at(-2) + modesOpcode.at(-1)
        let modes = [modesOpcode.at(2), modesOpcode.at(1), modesOpcode.at(0)]

        // Uncomment for debugging purposes
        // console.log(pos, modesOpcode, opcode, modes, data[pos])
        if (opcode === 99) {
            return output
        } else if (opcode === 3) {
            data[data[pos + 1]] = system_id
            pos += 2
            continue
        } else if (opcode === 4) {
            let args = args2nums(data.slice(pos + 1, pos + 2), data, modes)
            output = args[0]
            pos += 2
            continue
        }
        let args = args2nums(data.slice(pos + 1, pos + 3), data, modes)
        if (opcode === 1) {
            data[data[pos + 3]] = args[0] + args[1]
            pos += 4
        } else if (opcode === 2) {
            data[data[pos + 3]] = args[0] * args[1]
            pos += 4
        } else if (opcode === 5) {
            pos = args[0] === 0 ? pos + 3 : args[1]
        } else if (opcode === 6) {
            pos = args[0] !== 0 ? pos + 3 : args[1]
        } else if (opcode === 7) {
            data[data[pos + 3]] = args[0] < args[1] ? 1 : 0
            pos += 4
        } else if (opcode === 8) {
            data[data[pos + 3]] = args[0] === args[1] ? 1 : 0
            pos += 4
        } else {
            console.log('Wrong value for current position: ' + data[pos] + ', ' + opcode + ' at ' + pos)
            return output
        }
    }
    return output
}

const run = function () {
    // Read data
    let input = readInput(2019, '05')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Get results
    const resultPart1 = getOutput(input.slice(), 1)
    const resultPart2 = getOutput(input.slice(), 5)

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
