import { readFileSync } from "fs"
const Swarm = new Array(8).fill(0)
readFileSync("input.txt", "utf-8").split(",").map(Number).forEach(it => Swarm[it]++)
let nextDay = () => {
    let pregnant = Swarm[0]
    Swarm.forEach((_, idx) => { if (idx > 0) Swarm[idx - 1] = Swarm[idx] })
    Swarm[8] = pregnant; Swarm[6] += pregnant
}
const DAYS = 256
for (let i = 0; i < DAYS; i++) { nextDay() }
console.log(Swarm.reduce((prev, curr) => prev + curr))