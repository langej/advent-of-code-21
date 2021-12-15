import '../extensions/extensions.mjs'

let points = []
let foldInstructions = []

let addPoint = (x, y) => points.push({ x, y })
let addFoldInstruction = (direction, position) => foldInstructions.push({ direction, position })

'input.txt'.readAsFile().split('\n').forEach(line => {
    if (line.includes(',')) {
        let [x, y] = line.split(',')
        addPoint(Number(x),Number(y))
    } else if (line.includes('fold')) {
        let [direction, position] = line.split(' ').last().split('=')
        addFoldInstruction(direction, Number(position))
    }
})

let xMax = Math.max(...points.map(p => p.x))
let yMax = Math.max(...points.map(p => p.y))
let page = new Array(yMax + 1).fill(new Array(xMax + 1).fill(false))

let Page = {
    page: [...page.map(line => [...line])],
    setPoint: function (x, y) {
        this.page[y][x] = true
    },
    fold: function (direction, position) {
        if (direction == 'y') {
            let top = this.page.slice(0, position)
            let bottom = this.page.slice(position + 1)
            bottom.reverse().forEach((line, y) => {
                line.forEach((p, x) => {
                    if (p == true) top[y][x] = p
                })
            })
            this.page = [...top.map(p => [...p])]
        } else if (direction == 'x') {
            this.page =
                [...this.page.map(line => {
                    let left = line.slice(0, position)
                    let right = line.slice(position + 1)
                    right.reverse().forEach((p, x) => {
                        if (p == true) left[x] = p 
                    })
                    return [...left]
                })]
        }
    },
    countPoints: function () {
        return this.page.flat().filter(p => p === true).length
    },
    log: function () {
        this.page.forEach(line => {
            line.map(p => {
                if (p === true) return '#'
                else return '.'
            }).join(' ').log()
        })
    }
}

points.forEach(p => Page.setPoint(p.x, p.y))

let firstFold = foldInstructions.first()
Page.fold(firstFold.direction, firstFold.position)
Page.countPoints().log('Puzzle #1 count of points:')
let restFolds = foldInstructions.rest() 
restFolds.forEach(instr => Page.fold(instr.direction, instr.position))
'Puzzle #2:'.log()
Page.log()