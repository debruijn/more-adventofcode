import { readInput, runAndTime } from '../util/util.js'
import { intCodePC } from '../util/intCode.js'

const takeStep = function (thisDir, prevDir, input) {
    let thisPc = new intCodePC(input.slice(), prevDir)
    thisPc.runUntilEnd()
    thisPc.addInput([thisDir])
    return thisPc.runUntilEnd()[0].at(-1)
}

const run = function () {
    // Read data
    let input = readInput(2019, '15')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Get results
    let loc = [0, 0]
    let mapping = new Map([
        [1, [0, 1]],
        [2, [0, -1]],
        [3, [-1, 0]],
        [4, [1, 0], [0, [0, 0]]]
    ])
    let queueLocs = [[loc, []]]
    let stateMemory = new Map([[loc.toString(), []]])
    let blockadeLocs = new Set()
    let foundLoc = undefined

    while (true) {
        let currState = queueLocs.shift()
        for (let thisDir of [1, 2, 3, 4]) {
            let thisLoc = mapping
                .get(thisDir)
                .entries()
                .map((x) => x[1] + currState[0][x[0]])
                .toArray()
            if (!blockadeLocs.has(thisLoc.toString())) {
                let out = takeStep(thisDir, currState[1].slice(), input)
                if (out === 2) {
                    if (foundLoc === undefined) {
                        foundLoc = thisLoc
                    }
                    if (!stateMemory.has(thisLoc.toString()) || currState[1].length < stateMemory.get(currState[0].toString()).length) {
                        stateMemory.set(thisLoc.toString(), currState[1].concat([thisDir]))
                    }
                } else if (out === 1) {
                    if (!stateMemory.has(thisLoc.toString()) || currState[1].length < stateMemory.get(currState[0].toString()).length) {
                        stateMemory.set(thisLoc.toString(), currState[1].concat([thisDir]))
                        let newState = currState[1].concat([thisDir])
                        queueLocs.push([thisLoc, newState])
                    }
                } else {
                    blockadeLocs.add(thisLoc.toString())
                }
            }
        }
        if (queueLocs.length === 0) {
            break
        }
    }

    const resultPart1 = stateMemory.get(foundLoc.toString()).length

    let oxygen = [foundLoc]
    let toFill = stateMemory
        .keys()
        .filter((x) => x !== foundLoc.toString())
        .toArray()
    let toCheck = [foundLoc]
    let t = 0

    while (toFill.length > 0) {
        let newToCheck = []
        for (let loc of toCheck) {
            for (let thisDir of [1, 2, 3, 4]) {
                let thisLoc = mapping
                    .get(thisDir)
                    .entries()
                    .map((x) => x[1] + loc[x[0]])
                    .toArray()
                if (toFill.includes(thisLoc.toString()) && !oxygen.includes(thisLoc)) {
                    toFill.splice(toFill.indexOf(thisLoc.toString()), 1)
                    oxygen.push(thisLoc)
                    newToCheck.push(thisLoc)
                }
            }
        }
        toCheck = newToCheck
        t += 1
    }
    const resultPart2 = t

    return [resultPart1, resultPart2]
}

runAndTime(run)
