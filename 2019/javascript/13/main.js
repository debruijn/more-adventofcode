import { readInput, runAndTime } from '../util/util.js'
import { intCodePC } from '../util/intCode.js'

const outToObjects = function (out) {
    let objects = new Map()
    for (let i = 0; i < out.length; i += 3) {
        let obj = out[i + 2]
        obj = obj === 1 ? '#' : obj === 2 ? 'x' : obj === 3 ? '-' : obj === 4 ? 'o' : ' '
        if (obj !== ' ') {
            objects.set(out[i] + ',' + out[i + 1], obj)
        }
    }
    return objects
}

const getBallAndPadFromOutput = function (out) {
    let [lastPad, lastBall] = [0, 0]
    for (let i = 0; i < out.length; i += 3) {
        let obj = out[i + 2]
        if (obj === 4) {
            lastBall = [out[i], out[i + 1]]
        }
        if (obj === 3) {
            lastPad = [out[i], out[i + 1]]
        }
    }
    return [lastBall, lastPad]
}

const run = function () {
    // Read data
    let input = readInput(2019, '13')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Get results for part 1
    let pc1 = new intCodePC(input.slice())
    let [out, _] = pc1.runUntilEnd()
    let objects = outToObjects(out)
    const resultPart1 = objects
        .values()
        .filter((x) => x === 'x')
        .toArray().length

    // Get results for part 2
    input[0] = 2
    let pc2 = new intCodePC(input.slice())
    let currScore = 0
    while (true) {
        let output = pc2.runUntilEnd()
        if (output[1] === 3) {
            let [lastBall, lastPad] = getBallAndPadFromOutput(output[0])
            let inputVal = lastBall[0] > lastPad[0] ? 1 : lastBall[0] < lastPad[0] ? -1 : 0
            pc2.addInput([inputVal])
        } else {
            currScore = Math.max(output[0].at(-1), currScore)
            break
        }
    }

    const resultPart2 = currScore

    return [resultPart1, resultPart2]
}

runAndTime(run)
