import { readInput, runAndTime } from '../util/util.js'
import { getOutput, intCodePC } from '../util/intCode.js'

const run = function () {
    // Read data
    let input = readInput(2019, '09')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Decide whether to use function or class
    let useClass = true
    let resultPart1, resultPart2

    // Get results
    if (useClass) {
        // use class
        let pc1 = new intCodePC(input, [1])
        resultPart1 = pc1.runUntilEnd([1])[0][0]
        let pc2 = new intCodePC(input, [1])
        resultPart2 = pc2.runUntilEnd([2])[0][0]
    } else {
        // use function
        resultPart1 = getOutput(input.slice(), [1], 0)[0][0]
        resultPart2 = getOutput(input.slice(), [2], 0)[0][0]
    }

    return [resultPart1, resultPart2]
}

runAndTime(run)
