const fs = require('fs');
const input = fs.readFileSync('d7.input', 'utf-8');

// AI generated helper function :)
function generateCombinations(n) { 
    const operators = ['+', '*', '|']
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
            if(combination[i] === '|') {
                if(calibration == 0) {
                    calibration = parseInt('' + values[i] + values[i + 1])
                }else{
                    calibration = parseInt('' + calibration + values[i + 1])
                }
            }
        }
        // console.log(result, values, combination)
        if(calibration === result) {
            return true
        }
    }  
    return false
}


let p2result = 0

input.split('\n').forEach(line => {
    const result = parseInt(line.split(":")[0])
    const values = line.split(":")[1].trim().split(" ").map(e => parseInt(e))
    // console.log(result, values, generateCombinations(values.length - 1))
    if(testResult(result, values)) {
        p2result += result
    }
});
console.log("Part 2:", p2result)