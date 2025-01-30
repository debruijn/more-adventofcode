const fs = require('fs');

const read_input = function(year, day) {
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
    let input = read_input(2019, '01');

    // Process input to integers and drop final line if there
    input = input.split('\n')
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));

    // Get results using `fuel` function with recursive off and on
    const result_part1 = input
        .map(x => fuel(x, false))
        .reduce((a, b) => a + b, 0);
    const result_part2 = input
        .map(x => fuel(x, true))
        .reduce((a, b) => a + b, 0)

    return [result_part1, result_part2];
}


const print_res = function(res) {
    console.log('Answer for part 1: ' + res[0]);
    console.log('Answer for part 2: ' + res[1]);
}


const run_and_time = function(run) {
    console.time('Run function run-time')
    const res = run();
    print_res(res);
    console.timeEnd('Run function run-time')
}

run_and_time(run);
