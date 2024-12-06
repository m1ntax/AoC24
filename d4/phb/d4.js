const fs = require('fs');
const input = fs.readFileSync('d4.input', 'utf-8');
const matrix = input.split('\n').map(line => line.split(''));
const word = "XMAS";
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

const directions = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
  upLeft: [-1, -1],
  upRight: [-1, 1],
  downLeft: [1, -1],
  downRight: [1, 1]
}

let found = 0
function searchWord(array, currentRow, currentCol) {
  let debug = false
  // Start search process if first letter is at current position
  if (array[currentRow][currentCol] === word[0]) {
    // search for the rest of the word in all directions
    for (let dir in directions) {
      let directionHit = true
      for (let i = 1; i < word.length; i++) {
        // Check if we are out of bounds
        if (currentRow + directions[dir][0] * i < 0 || currentRow + directions[dir][0] * i >= array.length ||
            currentCol + directions[dir][1] * i < 0 || currentCol + directions[dir][1] * i >= array[currentRow].length) {
          directionHit = false
          break
        }
        if(array[currentRow + directions[dir][0] * i][currentCol + directions[dir][1] * i] !== word[i]) {
          directionHit = false
          break
        }
      }
      if (directionHit) {
        found++
        // console.log(currentRow, currentCol, dir, found)
      }
    }
  }
  for (let row = 0; row < array.length; row++) {
    let rowStr = '';
    for (let col = 0; col < array[row].length; col++) {
      if (row === currentRow && col === currentCol) {
        rowStr += colors.red + array[row][col] + colors.reset + ' ';
      } else {
        rowStr += array[row][col] + ' ';
      }
    }
    // console.log(rowStr);
  }
  console.log("Found:", found);
}

// Function to process the array with a delay
function processArray(array) {
  let row = 0;
  let col = 0;

  function processNext() {
    if (row < array.length) {
      if (col < array[row].length) {
        console.clear(); // Clear the console for better visualization
        searchWord(array, row, col);
        col++;
        setTimeout(processNext, 1); // Adjust the delay as needed
      } else {
        col = 0;
        row++;
        processNext();
      }
    }
  }

  processNext();
}

processArray(matrix);