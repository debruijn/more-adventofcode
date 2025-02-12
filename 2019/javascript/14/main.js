import { readInput, runAndTime } from '../util/util.js'

const run = function () {
    // Read data
    let input = readInput(2019, '14')

    // Process input here to something useful: mapping of out to its ingredients and how many you can make from them
    input = input
        .split('\n')
        .filter((x) => x !== '')
        .map((x) => x.split(' => '))
    let mapping = new Map()
    for (let row of input) {
        let [inp, out] = row
        let count
        ;[count, out] = out.split(' ')
        inp = inp.split(',').map((x) => x.split(' ').reverse())
        inp = inp.map((x) => [x[0], parseInt(x[1])])
        inp = new Map(inp)
        mapping.set(out, [parseInt(count), inp])
    }

    // Get results for part 1: create fake wallet with 1 Fuel and 0 of rest; swap it around until you only have OREs
    let wallet = new Map(mapping.keys().map((x) => [x, 0]))
    wallet.set('ORE', 0)
    wallet.set('FUEL', 1)
    while (true) {
        for (let key of wallet.keys()) {
            if (key !== 'ORE') {
                let thisMap = mapping.get(key)
                while (wallet.get(key) > 0) {
                    let buyCount = Math.ceil(wallet.get(key) / thisMap[0])
                    wallet.set(key, wallet.get(key) - thisMap[0] * buyCount)
                    for (let [oKey, val] of thisMap[1].entries()) {
                        wallet.set(oKey, wallet.get(oKey) + val * buyCount)
                    }
                }
            }
        }
        if (
            wallet
                .entries()
                .filter((x) => x[0] !== 'ORE')
                .every((x) => x[1] <= 0)
        ) {
            break
        }
    }
    const resultPart1 = wallet.get('ORE')

    // Part 2: start at FUEL=target/result_part1, see how many OREs you need; adjust FUEL with wrong factor
    let target = 1000000000000
    let stop = false
    let prevFac = 1
    while (!stop) {
        wallet = new Map(mapping.keys().map((x) => [x, 0]))
        wallet.set('ORE', 0)
        wallet.set('FUEL', parseInt((target / resultPart1) * prevFac + ''))
        while (true) {
            for (let key of wallet.keys()) {
                if (key !== 'ORE') {
                    let thisMap = mapping.get(key)
                    while (wallet.get(key) > 0) {
                        let buyCount = Math.ceil(wallet.get(key) / thisMap[0])
                        wallet.set(key, wallet.get(key) - thisMap[0] * buyCount)
                        for (let [oKey, val] of thisMap[1].entries()) {
                            wallet.set(oKey, wallet.get(oKey) + val * buyCount)
                        }
                    }
                }
            }
            if (
                wallet
                    .entries()
                    .filter((x) => x[0] !== 'ORE')
                    .every((x) => x[1] <= 0)
            ) {
                break
            }
        }
        if (wallet.get('ORE') > target) {
            stop = true
        } else {
            prevFac *= target / wallet.get('ORE')
        }
    }
    const resultPart2 = Math.floor((target / resultPart1) * prevFac)

    return [resultPart1, resultPart2]
}

runAndTime(run)
