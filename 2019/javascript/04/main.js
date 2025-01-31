const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}


const getCounts = function(arr) {
    // Count all values in arr and construct counter
    const counter = {};
    for (const num of arr) {
        counter[num] = counter[num] ? counter[num] + 1 : 1;
    }

    // Extract counts from the counter
    const counts = [];
    for (let i in counter) {
        counts.push(counter[i]);
    }
    return counts
}

const check = function(num) {
    let digits = num.toString().split('');
    if (digits
        .reduce(
            (a, b) =>
            a[0] ? [true, b] : [a[1] > b, b], [false, 0]
        )[0]
    ) {
        return [0, 0]
    }
    const counts = getCounts(digits);
    return [counts.some(x => x >= 2) ? 1 : 0, counts.some(x => x === 2) ? 1 : 0]
}

const run = function() {

    // Read data
    let input = readInput(2019, '04');

    // Process input here to something useful
    input = input.split('-').map(x => parseInt(x));
    console.log(input.length)

    // Get results -> loop over all numbers in range and test each of them
    let resultPart1 = 0;
    let resultPart2 = 0;
    for (let pswd = input[0]; pswd <= input[1]; pswd++) {
        let res = check(pswd);
        resultPart1 += res[0];
        resultPart2 += res[1];
    }

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
