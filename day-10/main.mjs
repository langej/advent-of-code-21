import '../extensions/extensions.mjs'

let opening = ['(', '{', '[', '<']
let closing = [')', '}', ']', '>']

let lines = 'input.txt'.readAsFile().split('\n').map(it => it.split(''))
let errors = []
let autocompletionLines = []
lines.forEach(line => {
    let stack = []
    let incomplete =
        line.every((it) => {
            if (opening.includes(it)) {
                stack.push(it)
                return true
            } else {
                let lastopen = stack.pop()
                let index = opening.indexOf(lastopen)
                if (it != closing[index]) {
                    errors.push(it)
                    return false
                } else {
                    return true
                }
            }
        })
    if (incomplete == true) {
        let autocompletions = []
        while (stack.length > 0) {
            let lastopen = stack.pop()
            let index = opening.indexOf(lastopen)
            autocompletions.push(closing[index])
        }
        autocompletionLines.push(autocompletions)
    }
})
errors.log('errors:')
let errorScores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
let errorScore = errors.reduce((a, b) => a + errorScores[b], 0)
errorScore.log('error score:')


let autocompleteScores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}
let scoreLines = autocompletionLines.map(line => {
    line.log('line')
    let automcompleteScore = line.reduce((a, b) => a * 5 + autocompleteScores[b], 0)
    automcompleteScore.log('score')
    return automcompleteScore
}).sort((a, b) => a - b)
let middle = Math.floor(scoreLines.length / 2)
let middleLine = scoreLines[middle]
middleLine.log('middle score:')