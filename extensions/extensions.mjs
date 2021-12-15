import { readFileSync } from 'fs'

String.prototype.readAsFile = function () { return readFileSync(this.valueOf(), 'utf-8') }

Number.prototype.to = function (number) {
    let begin = this.valueOf()
    let end = number
    let min = Math.min(begin, end)
    let max = Math.max(begin, end)
    function range(start, end) {
        if (start === end) return [start];
        return [start, ...range(start + 1, end)];
    }
    let r = range(min, max)
    if (begin > end) return r.reverse()
    else return r
}

Number.prototype.times = function (fn) {
    return new Array(this.valueOf()).fill(0).map((val, idx) => idx).map(fn)
}

Object.prototype.log = function (...prefix) {
    if (prefix != undefined) console.log(...prefix, this.valueOf())
    else console.log(this.valueOf())
}

Array.prototype.take = function (number) {
    return this.slice(0, number)
}
Array.prototype.first = function () {
    return this[0]
}
Array.prototype.last = function () {
    return this.slice(-1)[0]
}
Array.prototype.rest = function () {
    return this.slice(1)
}