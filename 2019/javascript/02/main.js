const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}


const getOutput = function(data, noun, verb) {
    data[1] = noun;
    data[2] = verb;

    for (let i = 0; i < data.length; i+=4) {
        if (data[i] === 99) {
            return data[0]
        } else if (data[i] === 1) {
            data[data[i+3]] = data[data[i+1]] + data[data[i+2]];
        } else if (data[i] === 2) {
            data[data[i+3]] = data[data[i+1]] * data[data[i+2]];
        } else {
            console.log("Wrong value for current position: " + data[i] + " at " + i);
        }
    }
    return data[0]
}


const completeGravityAssist = function(data) {
    for (let i=0; i < Math.min(100, data.length); i++) {
        for (let j = 0; j < Math.min(100, data.length); j++) {
            if (getOutput(data.slice(), i, j) === 19690720) {
                return 100 * i + j
            }
        }
    }
}


const run = function() {

    // Read data
    let input = readInput(2019, '02');

    // Process input here to something useful
    input = input.split(',')
        .map(x => parseInt(x));

    // Get results utility functions
    const resultPart1 = getOutput(input.slice(), 12, 2);
    const resultPart2 = completeGravityAssist(input);

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
