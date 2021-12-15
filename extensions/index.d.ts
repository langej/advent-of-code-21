interface String {
    readAsFile: () => string
}

interface Number {
    to: (num: number) => number[]
    times: (fn: (val, idx: number, array: []) => any) => any
}

interface Object {
    log: (...prefix: any[]) => void
}

interface Array<T> {
    take: (number: number) => T[]
    first: () => T | undefined
    last: () => T | undefined
    rest: () => T[]
}
