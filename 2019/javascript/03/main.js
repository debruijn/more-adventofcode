const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}


const findCrossings = function(lph, lpv) {
    let crossings = [], steps = [];
    for (let lph_i of lph) {
        for (let lpv_i of lpv) {
            if (((lph_i[0][0] - lpv_i[0][0]) * (lph_i[1][0] - lpv_i[1][0]) <= 0) &&
                ((lph_i[0][1] - lpv_i[0][1]) * (lph_i[1][1] - lpv_i[1][1]) <= 0)) {
                crossings.push([lph_i[0][1], lpv_i[0][0]])
                steps.push([lph_i[2] + lpv_i[2] + Math.abs(lpv_i[0][0] - lph_i[0][0]) +
                Math.abs(lph_i[0][1] - lpv_i[0][1])])
            }
        }
    }
    return [crossings, steps]
}


const run = function() {

    // Read data
    let input = readInput(2019, '03');

    // Process input here to something useful
    input = input.split('\n')
        .filter(x => x !== '')
        .map(x => x.split(','));

    // Construct horizontal and vertical line parts of both wires
    let lphBoth = [], lpvBoth = [];
    for (let wire of input) {
        let lph = [], lpv = [];
        let pt = [0, 0];
        let dist = 0;
        let newPt;
        for (let step of wire) {
            if ("RL".includes(step[0])) {
                newPt = [pt[0] + parseInt(step.slice(1)) * (step[0] === 'L' ? -1 : 1), pt[1]];
                lph.push([pt, newPt, dist]);
            } else {
                newPt = [pt[0], pt[1] + parseInt(step.slice(1)) * (step[0] === 'D' ? -1 : 1)];
                lpv.push([pt, newPt, dist]);
            }
            pt = newPt;
            dist += parseInt(step.slice(1))
        }
        lphBoth.push(lph);
        lpvBoth.push(lpv);
    }

    // Use `findCrossings` to find crossings and steps taken on horizontal or vertical pieces, and join them
    let [crossings_1, steps_1] = findCrossings(lphBoth[0], lpvBoth[1])
    let [crossings_2, steps_2] = findCrossings(lphBoth[1], lpvBoth[0])
    let crossings = Array.prototype.concat(crossings_1, crossings_2);
    let steps = Array.prototype.concat(steps_1, steps_2);

    // Calculate distances for crossings
    let distances = crossings.map(x => Math.abs(x[0]) + Math.abs(x[1]));

    // Get answers to question based on these distances or steps
    const resultPart1 = distances.filter(x => x > 0).reduce((a, b) => Math.min(a, b));
    const resultPart2 = steps.filter(x => x > 0).reduce((a, b) => Math.min(a, b));

    return [resultPart1, resultPart2];
}


const printRes = function(res) {
    console.log('Answer for part 1: ' + res[0]);
    console.log('Answer for part 2: ' + res[1]);
}


const runAndTime = function(run) {
    console.time('Run function run-time')
    const res = run();
    printRes(res);
    console.timeEnd('Run function run-time')
}

runAndTime(run);
