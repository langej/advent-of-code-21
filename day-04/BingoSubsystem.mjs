import { readFileSync } from "fs"

const BingoBoard = function ({ inputrows }) {
    let rows = inputrows.map( row => row.map(num => ({number: num, marked: false})))
    let stream

    let id = "id" + Math.random()  // super bad random id generator ;)

    const checkRows = () =>
        rows
            .map(row =>
                row.reduce((prev, curr) =>
                    prev && curr.marked
                , true)
            )
            .reduce((prev, curr) => prev || curr)

    const checkColumns = () => {
        let bingo = false
        for (let col = 0; col < rows.length; col++) {
            let colBingo = true
            for (let row = 0; row < rows.length; row++) {
                colBingo = colBingo && rows[row][col].marked
            }
            bingo = bingo || colBingo
        }
        return bingo
    }

    const checkForBingo = (latestNum) => {
        const rowBingo = checkRows()
        const colBingo = checkColumns()
        if (rowBingo || colBingo) {
            // stream.stopStream() // puzzle #1
            stream.unsubscribe(id) // puzzle #2
            calcResult(latestNum)
        }
    }

    const markNumber = (num) => {
        rows.forEach((row, rowIdx) => {
            row.forEach((col, colIdx) => {
                if (col.number === num) {
                    rows[rowIdx][colIdx].marked = true
                }
            })
        })
    }

    const startListening = (p_stream) => {
        stream = p_stream
        stream.subscribe(id, (num) => {
            markNumber(num)
            checkForBingo(num)
        })
    }

    const calcResult = (latestNum) => {
        const unmarkedSum =
            rows.flat()
                .filter(num => num.marked === false)
                .reduce((prev, curr) => prev + curr.number, 0)
        const multiplied = unmarkedSum * latestNum
        console.log("\nBINGO!")
        console.log("======")
        console.log(toString())
        console.log(`=> result: ${unmarkedSum} * ${latestNum} = ${multiplied}\n`)
    }

    const toString = () => {
        return rows.map(row =>
            row.map(col => {
                if (col.marked) return "X"
                else return "_"
            }).join(" ")
        ).join("\n")
    }

    return {
        startListening
    }
}

const BingoStream = function () {

    let continueStream = true
    
    let subscribers = []

    const subscribe = (id, callback) => {
        subscribers.push({id, callback})
    }
    const unsubscribe = (id) => {
        subscribers.splice(subscribers.findIndex(sub => sub.id === id), 1)
    }

    const startStream = (input) => {
        input.forEach(num => {
            if (continueStream === true) {
                const subs = [...subscribers]
                subs.forEach(sub => sub.callback(num))
            }
        })
    }

    const stopStream = () => {
        continueStream = false
        console.log("stopped the stream")
    }
    return {
        subscribe, unsubscribe, startStream, stopStream
    }
}

export const BingoSubsystem = (function () {

    const startBingoGame = () => {
        const input = generateBingoInput()
        const stream = BingoStream()
        input.bingoBoards.forEach(board => board.startListening(stream))
        stream.startStream(input.bingoNumbers)
    }

    const generateBingoInput = () => {
        const filecontent = readFileSync('./data/input.txt', 'utf8')
        let lines = filecontent.split('\n')

        const bingoNumbers = lines.shift().split(",").map(Number)
        
        const bingoBoards = []
        lines = lines.filter(line => line !== "")
        for (let index = 0; index < lines.length; index += 5) {
            const rows =
                lines
                    .slice(index, index + 5)
                    .map((line) => line.split(" ")
                        .filter(num => num !== "")
                        .map(num => Number(num)))
            bingoBoards.push(BingoBoard({ inputrows: rows }))
        }

        return {
            bingoNumbers,
            bingoBoards
        }
    }

    return {
        startBingoGame
    }
})()