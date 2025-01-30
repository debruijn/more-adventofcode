const fs = require('fs');

const read_input = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}

const run = function() {

    // Read data
    let input = read_input(2019, 'XX');

    // Process input here to something useful
    console.log(input.length)

    // Get results using `fuel` function with recursive off and on
    const result_part1 = 'TODO'
    const result_part2 = 'TODO'

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
