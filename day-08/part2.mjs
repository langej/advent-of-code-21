import { readFileSync } from 'fs'

let lines =
    readFileSync('input.txt', 'utf-8')
        .split('\n')
        .map(it => it.split('|').map(numbers => numbers.trim().split(' ')))

let sameSegments = (a, b) => {
    if (b === undefined) return false
    let samelength = a.length == b.length
    let s1 = a.sort()
    let s2 = b.sort()
    return samelength && s1.every((_, idx) => s1[idx] === s2[idx])
}

let filterSegments = (first, minus) => first.filter(it => !minus.includes(it))

let resolveResult = (line) => {
    let [signals, result] = line
    signals = signals.map(it => it.split(''))
    result = result.map(it => it.split(''))

    let filterByLength = (length) => signals.filter(it => it.length == length)
    
    let [eight] = filterByLength(7)
    let [seven] = filterByLength(3)
    let [four] = filterByLength(4)
    let [one] = filterByLength(2)
    let [nine] = filterByLength(6).filter(it => filterSegments(it, four).length == 2)
    let [top] = filterSegments(seven, one)
    let [bottom] = filterSegments(nine, four.concat(top))
    let [bottomleft] = filterSegments(eight, nine)
    let [three] = signals.filter(it => filterSegments(it, one.concat(top, bottom)).length == 1)
    let [five] = filterByLength(5).filter(it => filterSegments(it, three.concat(bottomleft)).length==1)
    let [six] = signals.filter(it => sameSegments(it, five.concat(bottomleft)))
    let [zero] = filterByLength(6).filter(it => !sameSegments(it, six) && !sameSegments(it, nine))
    let [two] = filterByLength(5).filter(it => !sameSegments(it, three) && !sameSegments(it, five))
    let all = [zero, one, two, three, four, five, six, seven, eight, nine]
    let numberString =
        result.map(it => {
            switch (all.find(num => sameSegments(it, num))) {
                case zero:  return '0'
                case one:   return '1'
                case two:   return '2'
                case three: return '3'
                case four:  return '4'
                case five:  return '5'
                case six:   return '6'
                case seven: return '7'
                case eight: return '8'
                case nine:  return '9'
                default:    return ''
            }
        }).join('')
    return numberString
}

let sum = lines.map(line => resolveResult(line)).reduce((a, b) => a + Number(b), 0)
console.log(sum)