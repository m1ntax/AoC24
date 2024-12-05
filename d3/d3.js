const fs = require('fs');

const src = fs.readFileSync('phippu.input', 'utf-8');
const rex = /mul\((\d{1,3}),(\d{1,3})\)/g
let solution = 0
while ((match = rex.exec(src)) !== null) {
    solution += parseInt(match[1]) * parseInt(match[2])
}
console.log("Part1:", solution)

// Part2
const rex2 = /don't\(.*?(?:do\(|$)/g
const src2 = src.replaceAll(rex2, '')
solution = 0
while ((match = rex.exec(src2)) !== null) {
    solution += parseInt(match[1]) * parseInt(match[2])
}
console.log("Part2:", solution)