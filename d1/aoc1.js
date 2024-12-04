const fs = require('fs')

let input = fs.readFileSync('aoc1.input', 'utf8')

let left = []
let right = []
input.split('\n').forEach((l) => {
    left.push(parseInt(l.split('   ')[0]))
    right.push(parseInt(l.split('   ')[1]))
})
left.sort((a, b) => a - b)
right.sort((a, b) => a - b)


// Part 1
let sum = 0
for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i])
}
console.log("Part 1:", sum)

// Part 2
let sum2 = 0
for (let i = 0; i < left.length; i++) {
    sum2 += left[i] * right.filter(e => e === left[i]).length
}
console.log("Part 2:", sum2)