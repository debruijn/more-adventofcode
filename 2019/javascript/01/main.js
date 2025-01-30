const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}

// Utility function to calc fuel, directly or recursively
const fuel = function(x, recursive=false) {
    let answer = Math.floor(x / 3) - 2;
    return answer <= 0 ? 0 : recursive ? answer + fuel(answer, true) : answer;
}

const run = function() {

    // Read data
    let input = readInput(2019, '01');

    // Process input to integers and drop final line if there
    input = input.split('\n')
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));

    // Get results using `fuel` function with recursive off and on
    const resultPart1 = input
        .map(x => fuel(x, false))
        .reduce((a, b) => a + b, 0);
    const resultPart2 = input
        .map(x => fuel(x, true))
        .reduce((a, b) => a + b, 0)

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
