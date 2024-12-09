const fs = require('fs');
const input = fs.readFileSync('d7.input', 'utf-8');

// AI generated helper function :)
function generateCombinations(n) { 
    const operators = ['+', '*']
    const results = []
    function helper(current, depth) { 
        if (depth === n) { 
            results.push(current)
            return
        } 
        for (let op of operators) {
            helper(current + op, depth + 1)
        }
    }
    helper([], 0)
    return results
}
const testResult = (result, values) => {
    for(let combination of generateCombinations(values.length - 1)) {
        let calibration = 0
        for(let i = 0; i < combination.length; i++) {
            if(combination[i] === '+') {
                if(calibration == 0) {
                    calibration = values[i] + values[i + 1]
                }else{
                    calibration += values[i + 1]
                }
            }
            if(combination[i] === '*') {
                if(calibration == 0) {
                    calibration = values[i] * values[i + 1]
                }else{
                    calibration *= values[i + 1]
                }
            }
        }
        if(calibration === result) {
            return true
        }
    }  
    return false
}

let p1result = 0

input.split('\n').forEach(line => {
    const result = parseInt(line.split(":")[0])
    const values = line.split(":")[1].trim().split(" ").map(e => parseInt(e))
    if(testResult(result, values)) {
        p1result += result
    }
});
console.log("Part 1:", p1result)