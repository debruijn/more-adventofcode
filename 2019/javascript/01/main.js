const fs = require('fs');

// Read data
let filename = 'input/2019_01_input.txt'
let input = fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});

// Utility function to calc fuel, directly or recursively
const fuel = function(x, recursive=false) {
    let answer = Math.floor(x / 3) - 2;
    return answer <= 0 ? 0 : recursive ? answer + fuel(answer, true) : answer;
}

// Process input to integers and drop final line if there
input = input.split('\n')
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));

// Get answers and print them
console.log('Answer for part 1: ' + input
    .map(x => fuel(x, false))
    .reduce((a, b) => a + b, 0)
);
console.log('Answer for part 2: ' + input
    .map(x => fuel(x, true))
    .reduce((a, b) => a + b, 0)
);
