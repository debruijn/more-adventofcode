const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}

const run = function() {

    // Read data
    let input = readInput(2019, 'XX');

    // Process input here to something useful
    console.log(input.length)

    // Get results using `fuel` function with recursive off and on
    const resultPart1 = 'TODO'
    const resultPart2 = 'TODO'

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
