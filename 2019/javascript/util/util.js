import fs from 'fs'

const readInput = function (year, day) {
    let filename = 'input/' + year + '_' + day + '_input.txt'
    return fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
}

const printRes = function (res) {
    console.log('Answer for part 1: ' + res[0])
    console.log('Answer for part 2: ' + res[1])
}

const runAndTime = function (run) {
    console.time('Run function run-time')
    const res = run()
    printRes(res)
    console.timeEnd('Run function run-time')
}

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

export { readInput, printRes, runAndTime, gcd, lcm}
