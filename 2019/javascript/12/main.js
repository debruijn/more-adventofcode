import { lcm, readInput, runAndTime } from '../util/util.js'

const run = function () {
    // Read data
    let input = readInput(2019, '12')

    // Process input here to something useful
    const T = 1000
    let moonsLoc = input
        .split('\n')
        .filter((x) => x !== '')
        .map((row) =>
            row
                .replace('<x=', '')
                .replace(' y=', '')
                .replace(' z=', '')
                .replace('>', '')
                .split(',')
                .map((x) => parseInt(x))
        )
    let moonsVelo = moonsLoc.map((_) => [0, 0, 0])

    // Get results
    let t = 0
    let hists = [new Map(), new Map(), new Map()]
    let loopSize = [0, 0, 0]

    while (loopSize.some((x) => x === 0)) {
        for (let dim of [0, 1, 2]) {
            if (loopSize[dim] === 0) {
                let locs = moonsLoc.map((x) => x[dim])
                let velo = moonsVelo.map((x) => x[dim])
                let state = locs.toString() + ';' + velo.toString()
                if (hists[dim].has(state)) {
                    loopSize[dim] = t - hists[dim].get(state)
                } else {
                    hists[dim].set(state, t)
                }

                // Apply gravity: for each dim, if loc is bigger decrease, if loc is lower increase (net)
                for (let [i, moon] of moonsLoc.entries()) {
                    for (let [j, o_moon] of moonsLoc.entries()) {
                        if (moon[dim] > o_moon[dim]) {
                            moonsVelo[i][dim] += -1
                        } else if (moon[dim] < o_moon[dim]) {
                            moonsVelo[i][dim] += 1
                        }
                    }
                }

                for (let [i, moon] of moonsVelo.entries()) {
                    moonsLoc[i][dim] += moon[dim]
                }
            }
        }
        t += 1
    }

    let tPart1 = [0, 1, 2].map((x) => T % loopSize[x])
    let statesPart1 = [0, 1, 2].map(
        (dim) =>
            hists[dim]
                .keys()
                .filter((x) => hists[dim].get(x) === tPart1[dim])
                .toArray()[0]
    )

    let potEnergy = moonsLoc
            .keys()
            .map((_) => 0)
            .toArray(),
        kinEWnergy = moonsLoc
            .keys()
            .map((_) => 0)
            .toArray()
    for (let j of moonsLoc.keys()) {
        for (let i of [0, 1, 2]) {
            potEnergy[j] += Math.abs(parseInt(statesPart1[i].split(';')[0].split(',')[j]))
            kinEWnergy[j] += Math.abs(parseInt(statesPart1[i].split(';')[1].split(',')[j]))
        }
    }
    const resultPart1 = moonsLoc
        .keys()
        .map((i) => potEnergy[i] * kinEWnergy[i])
        .reduce((a, b) => a + b)
    const resultPart2 = loopSize.reduce(lcm)

    return [resultPart1, resultPart2]
}

runAndTime(run)
