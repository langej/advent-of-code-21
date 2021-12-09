import '../extensions/extensions.mjs'

let matrix = './input.txt'.readAsFile().split('\n').map(line => line.split('').map(num => Number(num)))

let isLowPoint = ({ x, y }) => {
    let point   = matrix[y  ][x  ]
    let top     = matrix[y-1]?.[x  ] ?? 9
    let left    = matrix[y  ]?.[x-1] ?? 9
    let right   = matrix[y  ]?.[x+1] ?? 9
    let bottom  = matrix[y+1]?.[x  ] ?? 9
    let lowest = Math.min(top, left, right, bottom)
    if (point < lowest) return true
    else                return false
}

matrix
    .map((line, y) =>
        line.filter((_, x) => isLowPoint({ x, y })))
    .flat()
    .map(point => point + 1)
    .reduce((a, b) => a + b).log('Puzzle #1')

let basinId = 0
let lowPoints = []
let Matrix = {

    startBasinometer: function () {
        lowPoints.forEach(p => p.spread())
    },
    setPoint: function(p) {
        this.matrix[p.y][p.x] = p
    },
    matrix:
        matrix.map((line, y) => 
            line.map((value, x) => {
                let lowPoint = isLowPoint({ x, y })
                let Point = {
                    x,
                    y,
                    value,
                    isBasin: value < 9 ? true : false,
                    lowPoint,
                    basinId: lowPoint ? basinId++ : undefined,
                    setBasin: function (id) {
                        let self = this
                        if (self.isBasin == true) {
                            self.basinId = id
                            self.spread()
                        }
                    },
                    spread: function () {
                        let left = Matrix.matrix[y]?.[x - 1]
                        if (left && left.basinId === undefined) {
                            left.setBasin(this.basinId)
                        }
                        let right =Matrix.matrix[y  ]?.[x+1]
                        if (right && right.basinId === undefined) {
                            right.setBasin(this.basinId)
                        }
                        let top =Matrix.matrix[y-1]?.[x  ]
                        if (top && top.basinId === undefined) {
                            top.setBasin(this.basinId)
                        }
                        let bottom =Matrix.matrix[y+1]?.[x  ]
                        if (bottom && bottom.basinId === undefined) {
                            bottom.setBasin(this.basinId)
                        }
                    }
                }
                if (Point.lowPoint) {
                    lowPoints.push(Point)
                }
                return Point
            })
        ),
}
Matrix.startBasinometer()
let basinSizes = new Array(basinId).fill(0)
Matrix.matrix.flat().map(p => {
    if (p.isBasin === true && p.basinId !== undefined) {
        basinSizes[p.basinId] += 1
    }
})
basinSizes.sort((a,b) => b - a).take(3).reduce( (a,b) => a * b).log('Puzzle #2')