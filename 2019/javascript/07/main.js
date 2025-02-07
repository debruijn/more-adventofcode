const fs = require('fs')

const readInput = function (year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
}

// Utility function to perform permutations using Heap's method
function* permute(arr) {
    var length = arr.length,
        c = Array(length).fill(0),
        i = 1,
        k,
        p

    yield arr.slice()
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i]
            p = arr[i]
            arr[i] = arr[k]
            arr[k] = p
            ++c[i]
            i = 1
            yield arr.slice()
        } else {
            c[i] = 0
            ++i
        }
    }
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

const getOutput = function (data, input_vals, pos = 0) {
    let output = false

    while (pos >= 0) {
        let modesOpcode = num2decimals(data[pos])
        let opcode = 10 * modesOpcode.at(-2) + modesOpcode.at(-1)
        let modes = [modesOpcode.at(2), modesOpcode.at(1), modesOpcode.at(0)]

        // Uncomment for debugging purposes
        // console.log(pos, modesOpcode, opcode, modes, data[pos])
        if (opcode === 99) {
            return [output, pos]
        } else if (opcode === 3) {
            data[data[pos + 1]] = input_vals.shift()
            pos += 2
            continue
        } else if (opcode === 4) {
            let args = args2nums(data.slice(pos + 1, pos + 2), data, modes)
            output = args[0]
            pos += 2
            return [output, pos]
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
            return [output, pos]
        }
    }
    return [output, pos]
}

const run = function () {
    // Read data
    let input = readInput(2019, '07')

    // Process input to arr of nums
    input = input.split(',').map((x) => parseInt(x))

    // Part 1
    let curr_max = 0
    let phases = [0, 1, 2, 3, 4]
    for (let seq of permute(phases)) {
        let curr_val = 0
        for (let phase_setting of seq) {
            ;[curr_val, _] = getOutput(input.slice(), [phase_setting, curr_val], 0)
        }
        curr_max = curr_val > curr_max ? curr_val : curr_max
    }
    const resultPart1 = curr_max

    // Part 2
    curr_max = 0
    phases = [5, 6, 7, 8, 9]
    for (let seq of permute(phases)) {
        let inputs = seq.map((x) => [x])
        inputs[0].push(0)
        let curr_pos = new Array(phases.length).map((_) => 0)
        let [this_out, new_val, new_pos, stop] = [0, 0, 0, false]
        while (!stop) {
            for (let i of seq.keys()) {
                ;[new_val, new_pos] = getOutput(input.slice(), inputs[i], curr_pos[i])
                if (new_val === false) {
                    stop = true
                    break
                }
                curr_pos[i] = new_pos
                inputs[(i + 1) % phases.length].push(new_val)
            }
            this_out = !stop ? new_val : this_out
        }
        curr_max = this_out > curr_max ? this_out : curr_max
    }
    const resultPart2 = curr_max

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
