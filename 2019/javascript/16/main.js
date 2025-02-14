import { readInput, runAndTime } from '../util/util.js'

const decodeSignal = function (data) {
    let remainingSum = data.reduce((a, b) => a + b, 0)
    let newData = []
    for (let i of data.keys()) {
        newData.push(Math.abs(remainingSum) % 10)
        remainingSum -= data.at(i)
    }
    return newData
}

const run = function () {
    // Read data
    let input = readInput(2019, '16')

    // Part 1: create array of potential patterns, and apply them to current result iteratively
    let R = 100
    let curr = input
        .split('')
        .map((x) => parseInt(x))
        .filter((x) => !isNaN(x))
    let basePattern = [0, 1, 0, -1]
    let N = curr.length
    let patterns = []
    for (let i = 1; i <= N; i++) {
        let part1 = basePattern.map((x) => Array(i).fill(x)).flat()
        let part2 = Math.ceil((N + 1) / basePattern.length)
        let full = Array(part2)
            .fill(part1)
            .flat()
            .slice(1, N + 1)
        patterns.push(full)
    }

    for (let r = 0; r < R; r++) {
        let newCurr = []
        for (let i = 0; i < N; i++) {
            let temp = []
            for (let j = 0; j < N; j++) {
                temp.push(patterns.at(i).at(j) * curr.at(j))
            }
            newCurr.push(Math.abs(temp.reduce((a, b) => a + b, 0)) % 10)
        }
        curr = newCurr
    }

    const resultPart1 = parseInt(curr.slice(0, 8).join(''))

    // Part 2: use utility function to decode signal iteratively
    curr = input
        .split('')
        .map((x) => parseInt(x))
        .filter((x) => !isNaN(x))
    let loc = parseInt(input.slice(0, 7))
    let dataPostloc = Array(10000).fill(curr).flat().slice(loc)
    for (let r = 0; r < R; r++) {
        dataPostloc = decodeSignal(dataPostloc)
    }

    const resultPart2 = parseInt(dataPostloc.slice(0, 8).join(''))

    return [resultPart1, resultPart2]
}

runAndTime(run)
