import { readFileSync } from 'fs'

let Range = (begin, end) => {
    let min = Math.min(begin, end)
    let max = Math.max(begin, end)
    function range(start, end) {
        if(start === end) return [start];
        return [start, ...range(start + 1, end)];
    }
    let r = range(min, max)
    if (begin > end) return r.reverse()
    else             return r
}

let input = readFileSync('input.txt', 'utf8')
let rawlines = input.split('\n')
let lines = rawlines.map(line => {
    let [p1, p2] = line.split('->')
    let [x1, y1] = p1.split(',').map(num => Number(num))
    let [x2, y2] = p2.split(',').map(num => Number(num))
    return {
        horizontal: Range(x1, x2),
        vertical:   Range(y1, y2)
    }
})

let generateMatrix = (maxX, maxY) => {
    let matrix = new Array(maxY + 1).fill([])
    matrix.map((_, idx) => matrix[idx] = new Array(maxX + 1).fill(0))
    return matrix
}

let mapSize = {
    x: lines.map(line => Math.max(...line.horizontal)).reduce((prev,curr) => Math.max(prev,curr)),
    y: lines.map(line => Math.max(...line.vertical)).reduce((prev,curr) => Math.max(prev,curr))
}

let Matrix = generateMatrix(mapSize.x, mapSize.y)
let Map = {
    matrix: Matrix,
    setPoint: function ({ x, y }) { this.matrix[y][x]++ },
    getCountOfOverlapPoints: function () {
        return this.matrix.flat().filter(count => count > 1).length
    }
}

let Line = {
    x: [],
    y: [],
    createPoints: function () {
        let generatePoint = (x,y) => ({x,y})
        if (this.y.length === 1 ) {
            return this.x.map(num => generatePoint(num, this.y[0]))
        } else if (this.x.length === 1 ) {
            return this.y.map(num => generatePoint(this.x[0], num))
        } else {
            // return [] // Puzzle #1
            return this.x.map( (num, idx) => { return generatePoint(this.x[idx], this.y[idx]) }) // Puzzle #2
        }
    },
    create: function ({ x, y }) {
        let line = Object.create(this)
        line.x = x
        line.y = y
        return line
    }
}

lines
    .map(line => Line.create({x: line.horizontal, y: line.vertical}))
    .forEach(line => {
        let points = line.createPoints()
        points.forEach(p => Map.setPoint({x: p.x, y: p.y}))
    })

console.log(Map.getCountOfOverlapPoints())