/**
 * This code is really ugly.. I know :D
 */

const fs = require("fs")

const util = {
    toDecimal: (binaryString) =>
        binaryString
            .split("").reverse()
            .map((binary, index) => Number(binary) * Math.pow(2, index))
            .reduce((prev, curr) => prev + curr),

    getComplementary: (binaryString) =>
        binaryString.split("").map(digit => digit === "1" ? "0" : "1").join(""),

    toCountableObject: (digit) => ({
        one: digit === "1" ? 1 : 0,
        zero: digit === "0" ? 1 : 0
    }),

    sumUp: (prev, curr) => {
        prev.forEach((_, idx) => {
            prev[idx].one += curr[idx].one
            prev[idx].zero += curr[idx].zero
        })
        return prev
    },

    getMax: (item) => {
        if (item.one >= item.zero)
            return "1"
        else
            return "0"
    },

    getMin: (item) => {
        if (item.zero <= item.one)
            return "0"
        else
            return "1"
    },

    add: (prev, curr) => {
        prev.one += curr.one
        prev.zero += curr.zero
        return prev
    }

}

const diagnosticReport = fs.readFileSync("./input.txt", "utf8").split("\n")

const calcGammaRate = (diagnosticReport) => {
    const binary =
        diagnosticReport
            .map((binaryString) => binaryString.split("").map(util.toCountableObject))
            .reduce(util.sumUp)
            .map(util.getMax)
            .join("")
    const decimal = util.toDecimal(binary)
    return {
        binary, decimal
    }
}

const calcEpsilonRate = (gammaRate) => {
    const binary = util.getComplementary(gammaRate.binary)
    const decimal = util.toDecimal(binary)
    return {
        binary, decimal
    }
}
const calcPowerConsumption = (gammaRate, epsilonRate) => gammaRate.decimal * epsilonRate.decimal

const gammaRate = calcGammaRate(diagnosticReport)
const epsilonRate = calcEpsilonRate(gammaRate)
const powerConsumption = calcPowerConsumption(gammaRate, epsilonRate)

console.log("gamma rate", gammaRate)
console.log("epsilon rate", epsilonRate)
console.log("power consumption", powerConsumption)

/** Puzzle #2 */

const calcOxygenGeneratorRating = () => {
    const criteria = "max"
    const numberLength = diagnosticReport[0].length
    let list = diagnosticReport
    for (let index = 0; index < numberLength; index++) {
        list = filterByPosition(list, index, criteria)
    }
    return {
        binary: list[0],
        decimal: util.toDecimal(list[0])
    }
}

const calcCO2Scrubber = () => {
    const criteria = "min"
    const numberLength = diagnosticReport[0].length
    let list = diagnosticReport
    for (let index = 0; index < numberLength; index++) {
        list = filterByPosition(list, index, criteria)
    }
    return {
        binary: list[0],
        decimal: util.toDecimal(list[0])
    }
}

const filterByPosition = (items, position, bitCriteria) => {
    if (items.length === 1) {
        return items
    } else {
        let commonBitCount =
            items
                .map(it => util.toCountableObject(it[position]))
                .reduce(util.add, { one: 0, zero: 0 })

        let relevantBit
        if (bitCriteria === "max")
            relevantBit = util.getMax(commonBitCount)
        else if (bitCriteria === "min")
            relevantBit = util.getMin(commonBitCount)
        return items.filter((item) => item[position] === relevantBit)
    }
}

console.log("oxygen generator rating", calcOxygenGeneratorRating())
console.log("co2 scrubber rating", calcCO2Scrubber())
console.log("life support rating", calcOxygenGeneratorRating().decimal * calcCO2Scrubber().decimal)