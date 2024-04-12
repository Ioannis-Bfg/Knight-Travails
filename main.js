const knight = [
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
];
// All L shaped moves that the knight can do from a position

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // add one square
  addSquare(square) {
    if (!this.adjacencyList[square]) {
      this.adjacencyList[square] = { neighbors: [], visited: false };
    }
  }
}

function createBoard() {
  const chessGraph = new Graph();

  // fill up the board with squares
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = [i, j];
      chessGraph.addSquare(square);
    }
  }
  return chessGraph;
}

function getValidMoves(square) {
  const [row, col] = square;
  const validMoves = [];

  for (const [x, y] of knight) {
    // generate coordinates for possible moves
    const tempRow = row + x;
    const tempCol = col + y;

    //check if out of bounds
    if (tempRow >= 0 && tempRow < 8 && tempCol >= 0 && tempCol < 8) {
      validMoves.push([tempRow, tempCol]);
    }
  }

  return validMoves;
}

function knightMoves(start, target) {
  const chessGraph = createBoard();
  const queue = [[start, []]];
  // queue to save the path if it is the correct one;

  while (queue.length > 0) {
    const [square, path] = queue.shift();
    const [row, col] = square;

    // Target check
    if (row === target[0] && col === target[1]) {
      //pretty print the result
      let moveCount = path.length;
      console.log(`=> You made it in ${moveCount} moves! Here is your path:`);
      for (let i = 0; i < path.length; i++) {
        console.log(path[i]);
      }
      console.log(target);
      return;
    }

    // Visit check
    if (chessGraph.adjacencyList[square].visited) {
      continue;
    }

    chessGraph.adjacencyList[square].visited = true;

    // Next valid moves from current
    const moves = getValidMoves(square);
    for (const move of moves) {
      queue.push([move, path.concat([square])]);
    }
  }

  return null; // Error or target not reached ( which can't happen easily)
}

knightMoves([0, 0], [7, 7]);
