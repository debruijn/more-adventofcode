import { readInput, runAndTime } from "../util/util.js";

const run = function() {

    // Read data
    let input = readInput(2019, '10');

    // Process input here to something useful
    input = input.split('\n');
    let locs = []
    for (let [i, row] of input.entries()) {
        for (let [j, cell] of row.split('').entries()) {
            if (cell === '#') {
                locs.push([j, i])
            }
        }
    }

    // Part 1
    let currMax = 0;
    let locMax = [];
    for (let loc of locs) {
        let angles = new Set();
        for (let otherLoc of locs) {
            if (loc === otherLoc) {
                continue
            }
            if (loc[0] - otherLoc[0] === 0) {
                angles.add([loc[1] > otherLoc[1], 0].toString())
            } else {
                let element = otherLoc[0] > loc[0] ? 1 : -1;
                angles.add([(loc[1] - otherLoc[1]) / (loc[0] - otherLoc[0]), element].toString())
            }
        }
        if (angles.size > currMax) {
            currMax = angles.size;
            locMax = loc;
        }
    }

    // Part 2: find angle and distance for each other loc
    let otherLocsPerAngle = new Map();
    for (let otherLoc of locs) {
        let otherAngle =  ((-((Math.atan2(-(otherLoc[1] - locMax[1]), otherLoc[0] - locMax[0])
            / Math.PI * 180) - 90)) + 360) % 360;
        let dist = Math.abs(otherLoc[1] - locMax[1]) + Math.abs(otherLoc[0] - locMax[0])
        if (otherLocsPerAngle.has(otherAngle)) {
            let angleDistMap = otherLocsPerAngle.get(otherAngle);
            angleDistMap.set(dist, otherLoc);
        } else {
            let angleDistMap = new Map();
            angleDistMap.set(dist, otherLoc);
            otherLocsPerAngle.set(otherAngle, angleDistMap);
        }
    }

    // Part 2: for each sorted angle, take the lowest distance and remove, until 200 are removed
    let sortedKeys = otherLocsPerAngle.keys().toArray().toSorted((a, b) => a - b);
    let counter = 0;
    let thisLoc = locMax;
    for (let key of sortedKeys) {
        if (otherLocsPerAngle.has(key)) {
            let angleDistMap = otherLocsPerAngle.get(key);
            let minDist = angleDistMap.keys().reduce((a, b) => Math.min(a, b))
            thisLoc = angleDistMap.get(minDist)
            angleDistMap.delete(minDist)
            counter++;
        }
        if (counter === 200) {
            break
        }
    }

    // Get results
    const resultPart1 = currMax
    const resultPart2 = 100 * thisLoc[0] + thisLoc[1];

    return [resultPart1, resultPart2];
}

runAndTime(run);
