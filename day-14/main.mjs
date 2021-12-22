import '../extensions/extensions.mjs'

let lines = 'test.txt'.readAsFile().split('\n')
let template = lines[0]
let rules = lines.slice(2).map((line) => line.split(' -> '))

let insert = (template) => {
    let result = ''
    for (let idx = 0; idx < template.length - 1; idx++) {
        let tempSlice = template.slice(idx, idx + 2)
        let [pair, insert] = rules.find((it) => it[0] == tempSlice) ?? []
        if (!!pair && !!insert) {
            result += tempSlice[0]
            result += insert
        }
    }
    result += template.slice(-1)
    return result
}

;(40).times((step) => {
    console.log(step)
    template = insert(template)
})

let countObject = template.split('').reduce((prev, curr) => {
    if (prev[curr]) {
        prev[curr] += 1
    } else prev[curr] = 1
    return prev
}, {})

let { max, min } = Object.entries(countObject).reduce(
    (prev, curr) => {
        if (prev.max && prev.min) {
            prev.max = Math.max(prev.max, curr[1])
            prev.min = Math.min(prev.min, curr[1])
        } else {
            prev.max = curr[1]
            prev.min = curr[1]
        }
        return prev
    },
    { max: undefined, min: undefined }
)
let result = max - min

countObject.log('count')
max.log('max')
min.log('min')
result.log('result')
