import { readInput, runAndTime } from '../util/util.js'
import { getOutput, intCodePC } from '../util/intCode.js'

const mapTurnR = new Map()
mapTurnR.set([0, 1].toString(), [1, 0])
mapTurnR.set([1, 0].toString(), [0, -1])
mapTurnR.set([0, -1].toString(), [-1, 0])
mapTurnR.set([-1, 0].toString(), [0, 1])

const mapTurnL = new Map()
mapTurnL.set([0, 1].toString(), [-1, 0])
mapTurnL.set([-1, 0].toString(), [0, -1])
mapTurnL.set([0, -1].toString(), [1, 0])
mapTurnL.set([1, 0].toString(), [0, 1])

const run = function () {
    // Read data
    let input = readInput(2019, '11')

    // Process input here to something useful
    input = input.split(',').map((x) => parseInt(x))

    // Get results
    let loc = [0, 0]
    let dir = [0, 1]
    let nextOutIsDir = false
    let field = new Map()
    field.set(loc.toString(), 0)

    let pc1 = new intCodePC(input.slice(), [field.get(loc.toString())])
    let stop = 0
    let out = [1]

    while (stop !== 1) {
        ;[out, stop] = pc1.runUntilOutput([field.get(loc.toString())])
        if (stop === 2) {
            if (nextOutIsDir) {
                if (out[0] === 1) {
                    dir = mapTurnR.get(dir.toString())
                } else {
                    dir = mapTurnL.get(dir.toString())
                }
                loc = [loc[0] + dir[0], loc[1] + dir[1]]
                if (!field.has(loc.toString())) {
                    field.set(loc.toString(), 0)
                }
            } else {
                field.set(loc.toString(), out[0])
            }
            nextOutIsDir = !nextOutIsDir
            pc1.cleanOut()
        }
    }

    const resultPart1 = field.size

    loc = [0, 0]
    dir = [0, 1]
    nextOutIsDir = false
    field = new Map()
    field.set(loc.toString(), 1)

    let pc2 = new intCodePC(input, [field.get(loc.toString())])
    stop = 0
    out = [0]

    while (stop !== 1) {
        // console.log(out, stop, loc, dir, field.size, field, nextOutIsDir);
        // console.log(out, stop, loc, dir, field.size, field, nextOutIsDir, field.get(loc.toString()));
        // console.log(pc2.pos, pc2.readVal(pc2.pos));
        ;[out, stop] = pc2.runUntilOutput([field.get(loc.toString())])
        // console.log(out, stop, loc, dir, field.size, field, nextOutIsDir, field.get(loc.toString()));
        if (stop === 2) {
            if (nextOutIsDir) {
                if (out[0] === 1) {
                    dir = mapTurnR.get(dir.toString())
                } else {
                    dir = mapTurnL.get(dir.toString())
                }
                loc = [loc[0] + dir[0], loc[1] + dir[1]]
                if (!field.has(loc.toString())) {
                    // console.log(' test')
                    field.set(loc.toString(), 0)
                }
            } else {
                field.set(loc.toString(), out[0])
            }
            nextOutIsDir = !nextOutIsDir
            pc2.cleanOut()
        }
    }

    let min_x = 1000,
        max_x = -1000,
        min_y = 1000,
        max_y = -1000
    for (let key of field.keys()) {
        let [x, y] = key.split(',').map((x) => parseInt(x))
        min_x = Math.min(min_x, x)
        max_x = Math.max(max_x, x)
        min_y = Math.min(min_y, y)
        max_y = Math.max(max_y, y)
    }

    for (let y = max_y; y >= min_y; y--) {
        let thisLine = ''
        for (let x = min_x; x <= max_x; x++) {
            if (field.get([x, y].toString()) === 1) {
                thisLine += '#'
            } else {
                thisLine += ' '
            }
        }
        console.log(thisLine)
    }

    const resultPart2 = 'HGEHJHUZ'

    return [resultPart1, resultPart2]
}

runAndTime(run)
