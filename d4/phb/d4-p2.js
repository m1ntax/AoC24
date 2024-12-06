const fs = require('fs');
const input = fs.readFileSync('d4.input', 'utf-8');

const matrix = input.split('\n').map(line => line.split(''));

const findMas = (x, y) => {
    // Do we have any out of bounds
    if (x <= 0 || x >= matrix.length-1 || y <= 0 || y >= matrix[x].length)
        return false
    console.log(x, y)
    let valid = true
    switch (matrix[x - 1][y - 1]) {
        case 'M':
            if (matrix[x + 1][y + 1] != 'S')
                valid = false
            break
        case 'S':
            if (matrix[x + 1][y + 1] != 'M')
                valid = false
            break
        default:
            valid = false
            break
    }
    switch(matrix[x-1][y+1]) {
        case 'M':
            if (matrix[x + 1][y - 1] != 'S')
                valid = false
            break
        case 'S':
            if (matrix[x + 1][y - 1] != 'M')
                valid = false
            break
        default:
            valid = false
            break
    }
    return valid
}

let found = 0
for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
        if (matrix[x][y] === 'A') {
            if(findMas(x, y)) {
                found++
            }
        }
    }
}
console.log("Part 2:", found)