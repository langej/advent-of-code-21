const fs = require("fs")

const readFile = (filename) => fs.readFileSync(filename, "utf8")

/** 
 * test of doing OOP in javascript inspired by Douglas Crockford 
 * => https://youtu.be/XFTOG895C7c?t=2927
*/
const submarine = (function () {
    let horizontal = 0, depth = 0
    const getPosition = () => ({ horizontal, depth, multiplied: horizontal * depth })
    const forward = (value) => { horizontal += value }
    const down = (value) => { depth += value }
    const up = (value) => { depth -= value }
    return Object.freeze({
        getPosition,
        forward,
        down,
        up
    })
})()

const correctSubmarine = (function () {
    let horizontal = 0, depth = 0, aim = 0
    const getPosition = () => ({ horizontal, depth, multiplied: horizontal * depth })
    const forward = (value) => {
        horizontal += value
        depth += value * aim
    }
    const down = (value) => { aim += value }
    const up = (value) => { aim -= value }
    return Object.freeze({
        getPosition,
        forward,
        down,
        up
    })
})()

const instructions = readFile("./input.txt").split("\n")
instructions.forEach(instruction => {
    const [direction, value] = instruction.split(" ")
    const numberedValue = Number(value)
    submarine[direction](numberedValue)
    correctSubmarine[direction](numberedValue)
})

console.log("puzzle #1:", submarine.getPosition())
console.log("puzzle #2:", correctSubmarine.getPosition())