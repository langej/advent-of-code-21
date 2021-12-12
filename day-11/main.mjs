import '../extensions/extensions.mjs'

let matrix =
    'input.txt'
        .readAsFile().split('\n')
        .map(line => line.split('').map(energy => ({ energy: Number(energy), flashes: false })))

let flashes = 0

let incEnergy = ({ x, y }) => {
    if (matrix[y]?.[x]?.flashes === false) {   
        matrix[y][x].energy += 1
        if (matrix[y][x].energy > 9) {
            matrix[y][x].flashes = true
            flash({ x, y })
        }
    }
}

let flash = ({ x, y }) => {
    incEnergy({ x: x-1, y: y   })
    incEnergy({ x: x+1, y: y   })
    incEnergy({ x: x-1, y: y-1 })
    incEnergy({ x: x-1, y: y+1 })
    incEnergy({ x: x+1, y: y-1 })
    incEnergy({ x: x+1, y: y+1 })
    incEnergy({ x: x  , y: y-1 })
    incEnergy({ x: x  , y: y+1 })
}

let simulate = () => {
    matrix.forEach((line, y) => {
        line.forEach((oct, x) => {
            incEnergy({ x, y })
        })
    })
    matrix.forEach((line, y) => {
        line.forEach((oct, x) => {
            if (oct.flashes == true) {
                matrix[y][x].energy = 0
                matrix[y][x].flashes = false
                flashes++
                }
            })
        })
}

// Puzzle #1
// (100).times(() => simulate())

let steps = 0
// Puzzle #2
while (!matrix.flat().every(it => it.energy == 0)) {
    simulate()
    steps++
}

flashes.log('flashes: ')
steps.log('steps')