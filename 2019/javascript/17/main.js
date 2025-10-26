import { readInput, runAndTime } from '../util/util.js'
import { intCodePC } from '../util/intCode.js'

const outToList = function (out) {
    let outList = []
    let currRow = ''
    for (let el of out) {
        if (el === 10) {
            if (currRow.length > 0) {
                outList.push(currRow)
                currRow = ''
            }
        } else {
            currRow += String.fromCharCode(el)
        }
    }
    if (currRow.length > 0) {
        outList.push(currRow)
    }
    return outList
}

const findIntersections = function (grid) {
    let intersections = []
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            if (grid[i][j] === '#') {
                let n_scaff = (grid[i - 1][j] === '#') + (grid[i + 1][j] === '#') + (grid[i][j - 1] === '#') + (grid[i][j + 1] === '#')
                if (n_scaff === 4) {
                    intersections.push([i, j])
                }
            }
        }
    }
    return intersections
}

const run = function () {
    // Read data
    let data = readInput(2019, '17')

    // Process input here to something useful
    let input = data.split(',').map((x) => parseInt(x))

    // Get results
    let pc = new intCodePC(input)
    let out = pc.runUntilEnd()

    let grid = outToList(out[0])
    let intersections = findIntersections(grid)

    const resultPart1 = intersections.map((x) => x[0] * x[1]).reduce((a, b) => a + b, 0)

    input = data.split(',').map((x) => parseInt(x))
    input[0] = 2
    let input_instr = [
        [66, 44, 67, 44, 66, 44, 65, 44, 67, 44, 65, 44, 66, 44, 67, 44, 66, 44, 65, 10],
        [76, 44, 54, 44, 82, 44, 49, 50, 44, 82, 44, 49, 50, 44, 82, 44, 49, 48, 10],
        [82, 44, 49, 48, 44, 76, 44, 56, 44, 82, 44, 49, 48, 44, 82, 44, 52, 10],
        [76, 44, 54, 44, 76, 44, 54, 44, 82, 44, 49, 48, 10],
        [110, 10]
    ]

    let pc2 = new intCodePC(input)
    pc2.runUntilEnd()

    for (let instr of input_instr.values()) {
        out = pc2.runUntilEnd(instr)
    }
    const resultPart2 = out[0].reverse()[0]

    return [resultPart1, resultPart2]
}

runAndTime(run)
