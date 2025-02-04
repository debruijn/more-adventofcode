const fs = require('fs');

const readInput = function(year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'})
}

const range = function*(min, max, step=1) {
    for (let i = min; i < max; i += step) {
        yield i;
    }
};

const countZeros = function(x) {
    return x.split('').filter(x => x === '0').length
}

const mulOnesTwos = function(x) {
    x = x.split('');
    return x.filter(x => x === '1').length * x.filter(x => x === '2').length
}

const run = function() {

    // Read data
    let input = readInput(2019, '08');

    // Process input here to something useful
    let dims = [25, 6];
    let layerSize = dims[0] * dims[1];
    let layers = range(0, input.length - 1, layerSize).map(x => input.slice(x, x+layerSize)).toArray();

    // Part 1: find the lowest number of zeros, and get the multiplication thereof
    let currMin = layerSize;
    let resultPart1 = 'TODO'
    for (let [i, thisCount] of layers.map(x => countZeros(x)).entries()) {
        if (thisCount < currMin) {
            currMin = thisCount;
            resultPart1 = mulOnesTwos(layers[i]);
        }
    }

    // Part 2: start with just 2s, replace them with first 0 or 1 found, and then print line by line
    let finalPicture = '2'.repeat(layerSize).split('');
    for (let layer of layers) {
        for (let i of range(0, layerSize)) {
            finalPicture[i] = finalPicture[i] === '2' ? layer[i] : finalPicture[i];
        }
    }
    for (let i of range(0, dims[1])) {
        let thisLine = "";
        for (let j of range(0, dims[0])) {
            thisLine += finalPicture[i * dims[0] + j] === '1' ? '#' : ' ';
        }
        console.log(thisLine)
    }
    const resultPart2 = "CEKUA"

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
