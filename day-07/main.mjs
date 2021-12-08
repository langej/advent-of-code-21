import { readFileSync } from 'fs'
let crabs = readFileSync('input.txt','utf-8').split(',').map(Number)
// if js just got a range operator...
let positions = 
    new Array(crabs.reduce((a,b)=>Math.max(a,b)) + 1)
        .fill(0)
        .map((_,idx) => idx)
let calcFuel = (steps) => (steps * (steps + 1)) / 2
let result = 
    positions
        .map(pos => 
            crabs
                .map(crab => calcFuel(Math.abs(crab - pos)))
                .reduce((prev, curr) => prev + curr)
        )
        .reduce( (a,b) => Math.min( a,b ) )
console.log(result)