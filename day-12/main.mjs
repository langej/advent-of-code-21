import '../extensions/extensions.mjs'
import _ from 'lodash'

let isUpperCase = (str) => str === str.toUpperCase()

let createCave = (name) => ({
    name:       name,
    children:   [],
    visited:    0,
    bigCave:    isUpperCase(name)
})

let Caves = {}

let initCaves = () => 'input.txt'.readAsFile().split('\n').map(line => {
    let [begin,end] = line.split('-')
    if (Caves[begin] === undefined) Caves[begin] = createCave(begin)
    if (Caves[end  ] === undefined) Caves[end  ] = createCave(end)
    Caves[begin].children.push(Caves[end  ])
    Caves[end  ].children.push(Caves[begin])
})

function findPaths({ caves, startCaveName, enoughTime }) {
    let _caves = _.cloneDeep(caves)
    let actualCave = _caves[startCaveName]
    actualCave.visited += 1
    if (actualCave.bigCave == false && actualCave.visited > 1) 
        enoughTime = false
    let filterPossiblePaths = cave => cave.name != 'start' && (cave.bigCave == true || enoughTime || cave.visited < 1)
    let possiblePaths =
        actualCave.children
            .filter(filterPossiblePaths)
    if (startCaveName == 'end')
        return 1
    else if (possiblePaths.length == 0)
        return 0
    else 
        return possiblePaths
            .map(cave => findPaths({caves: _caves, startCaveName: cave.name, enoughTime }))
            .reduce((a, b) => a + b, 0)
}

initCaves()
let paths = findPaths({ caves: Caves, startCaveName: 'start', enoughTime: true }) // for puzzle #1 => enoughTime: false
paths.log()