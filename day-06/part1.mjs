import { readFileSync } from "fs"
let swarm = readFileSync("test.txt", "utf-8").split(",").map(Number)
let nextDay = () => {
    let newFish = []
    swarm = [...swarm.map(fish => {
        if (fish == 0) { newFish.push(8); return 6 }
        else return fish - 1
    }), ...newFish]
}
const DAYS = 256
for (let i = 0; i < DAYS; i++) { nextDay() }
console.log(swarm.length)