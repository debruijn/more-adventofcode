const fs = require('fs')

const readInput = function (year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
}

const run = function () {
    // Read data
    let input = readInput(2019, '06')

    // Process input here to something useful
    let mapping = {}
    for (let row of input.split('\n').filter((x) => x !== '')) {
        let [x, y] = row.split(')')
        mapping[y] = [x, false, false]
    }

    // Keep expanding processed orbits until none are left to be done
    let count_orbits = 0
    let stop = false
    while (!stop) {
        for (let k in mapping) {
            let v = mapping[k]
            if (!v[1]) {
                if (v[0] === 'COM') {
                    mapping[k] = [v[0], 1, new Set(['COM'])]
                    count_orbits += 1
                } else if (mapping[v[0]][1]) {
                    mapping[k] = [v[0], 1 + mapping[v[0]][1], mapping[v[0]][2].union(new Set([v[0]]))]
                    count_orbits += mapping[k][1]
                }
            }
        }
        stop = true
        for (let k in mapping) {
            if (mapping[k].includes(false)) {
                stop = false
                break
            }
        }
    }

    // Get results
    const resultPart1 = count_orbits
    const resultPart2 = mapping['SAN'][2].union(mapping['YOU'][2]).difference(mapping['SAN'][2].intersection(mapping['YOU'][2])).size

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
