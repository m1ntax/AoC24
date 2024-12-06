const fs = require('fs')
let input = fs.readFileSync('d2.input', 'utf8')

const checkSafeness = (levels) => {
    const ascending = JSON.parse(JSON.stringify(levels)).sort((a, b) => a - b)
    const decending = JSON.parse(JSON.stringify(levels)).sort((a, b) => b - a)
    if (JSON.stringify(levels) != JSON.stringify(ascending) && JSON.stringify(levels) != JSON.stringify(decending)) {
        return false
    } else {
        for (let i = 0; i < levels.length; i++) {
            let distance = Math.abs(levels[i] - levels[i + 1])
            if (distance < 1 || distance > 3) {
                return false
            }
        }
    }
    return true
}

// Part I
let safeCount = 0
input.split('\n').forEach((l) => {
    let levels = l.split(' ').map(e => parseInt(e))
    if (checkSafeness(levels)) {
        safeCount++
    }
})
console.log("Part 1:", safeCount)

// Part II
let safeCount2 = 0
input.split('\n').forEach((l) => {
    let levels = l.split(' ').map(e => parseInt(e))
    // First test line as it is
    if (checkSafeness(levels)) {
        safeCount2++
        return
    } else {
        // Otherwise test again by removing one element after other
        for (let i = 0; i < levels.length; i++) {
            let temp = JSON.parse(JSON.stringify(levels))
            temp.splice(i, 1)
            if (checkSafeness(temp)) {
                safeCount2++
                return
            }
        }
    }
    // console.log(levels, false)
})
console.log("Part 2:", safeCount2)