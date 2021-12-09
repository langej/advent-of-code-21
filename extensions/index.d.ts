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

interface Array {
  take: (number: number) => any[]
}
