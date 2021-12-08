import { readFileSync } from 'fs'
let uniqueNumbers =
    readFileSync('input.txt', 'utf-8')
        .split('\n')
        .map(line => line.split('|')[1].trim().split(' '))
        .map(line => line.filter(number => [2, 3, 4, 7].includes(number.length)))
        .flat().length
console.log(uniqueNumbers)