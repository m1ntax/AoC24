const fs = require('fs');
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
};

const input = fs.readFileSync('d6.input', 'utf-8');
const matrix = input.split('\n').map(line => line.split(''));

const moveDirections = {
    '^': [-1, 0],
    'v': [1, 0],
    '>': [0, 1],
    '<': [0, -1]
}

const printMap = () => {
    console.clear();
    for (let x = 0; x < matrix.length; x++) {
        row = ''
        for (let y = 0; y < matrix[x].length; y++) {
            switch (matrix[x][y]) {
                case '.':
                    row += matrix[x][y]
                    break
                case '#':
                    row += colors.blue + matrix[x][y] + colors.reset
                    break
                case '^':
                    row += colors.red + matrix[x][y] + colors.reset
                    break
                case 'v':
                    row += colors.red + matrix[x][y] + colors.reset
                    break
                case '>':
                    row += colors.red + matrix[x][y] + colors.reset
                    break
                case '<':
                    row += colors.red + matrix[x][y] + colors.reset
                    break
                default:
                    // Guards color
                    row += colors.yellow + matrix[x][y] + colors.reset
                    break
            }
        }
        console.log(row)
    }
}

const getGuardPosition = () => {
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] === '^' || matrix[x][y] === 'v' || matrix[x][y] === '>' || matrix[x][y] === '<') {
                return [x, y, matrix[x][y]]
            }
        }
    }
}
const getGuardNextPosition = (guard) => {
    return matrix[guard[0] + moveDirections[guard[2]][0]][guard[1] + moveDirections[guard[2]][1]]
}

const countDistinctPositions = () => {
    let count = 0
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] === 'X') {
                count++
            }
        }
    }
    return count
}

// Game Loop
printMap();
let guard = getGuardPosition();
const tick = () => {
    // Calulate next position and check if guard would be out of bounds then the simulation is over
    if (guard[0] + moveDirections[guard[2]][0] < 0 || guard[0] + moveDirections[guard[2]][0] >= matrix.length ||
        guard[1] + moveDirections[guard[2]][1] < 0 || guard[1] + moveDirections[guard[2]][1] >= matrix[0].length) {
        matrix[guard[0]][guard[1]] = 'X'
        printMap();
        const count = countDistinctPositions();
        console.log("Part 1:", count);
        return;
    }
    const nextPosition = getGuardNextPosition(guard);
    switch (nextPosition) {
        case '.':
            matrix[guard[0]][guard[1]] = 'X'
            matrix[guard[0] + moveDirections[guard[2]][0]][guard[1] + moveDirections[guard[2]][1]] = guard[2]
            guard = [guard[0] + moveDirections[guard[2]][0], guard[1] + moveDirections[guard[2]][1], guard[2]]
            break
        case '#':
            matrix[guard[0]][guard[1]] = 'X'
            // Turn guard right
            switch (guard[2]) {
                case '^':
                    guard[2] = '>'
                    break
                case 'v':
                    guard[2] = '<'
                    break
                case '>':
                    guard[2] = 'v'
                    break
                case '<':
                    guard[2] = '^'
                    break
            }
            guard = [guard[0] + moveDirections[guard[2]][0], guard[1] + moveDirections[guard[2]][1], guard[2]]
            matrix[guard[0]][guard[1]] = guard[2]
            break
        case 'X':
            matrix[guard[0]][guard[1]] = 'X'
            matrix[guard[0] + moveDirections[guard[2]][0]][guard[1] + moveDirections[guard[2]][1]] = guard[2]
            guard = [guard[0] + moveDirections[guard[2]][0], guard[1] + moveDirections[guard[2]][1], guard[2]]
            break
    }
    printMap();
    setTimeout(tick, 1)
}
tick();