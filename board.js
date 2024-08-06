/* GAME BOARD */
function GameBoard() {
  const board = [];

  // Board getter
  const getBoard = () => board;

  // Creating 2D array
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(Cell());
      }
    }
    console.log("**** NEW BOARD ****");
    // Initial board display
    displayBoard();
  };

  // Displays the board in console
  const displayBoard = () => {
    const boardMap = board.map((row) => row.map((col) => col.getValue()));
    console.log(boardMap);
  };

  // Adds player token to specified row/col
  const addToken = (row, col, token) => {
    // Out of bound check
    if (row > 2 || row < 0 || col > 2 || col < 0) {
      throw new Error("Out of bounds!");
    }

    // Set new value if cell value is 0
    if (!board[row][col].getValue()) {
      board[row][col].setValue(token);
    } else {
      throw new Error("Cell already filled!");
    }
  };

  // Check for win
  const checkForWin = (player) => {
    let coords = [];

    // Check horizontally
    for (let i = 0; i < 3; i++) {
      let win = true;
      for (let j = 0; j < 3; j++) {
        if (board[i][j].getValue() !== player) {
          win = false;
        }
        coords.push([i, j]);
      }
      if (win) return { win: true, coords: coords };
      coords = [];
    }

    // Check vertically
    coords = [];
    for (let i = 0; i < 3; i++) {
      let win = true;
      for (let j = 0; j < 3; j++) {
        if (board[j][i].getValue() !== player) {
          win = false;
        }
        coords.push([j, i]);
      }
      if (win) return { win: true, coords: coords };
      coords = [];
    }

    // Check diagonally
    coords = [];
    for (let i = 0; i < 3; i++) {
      if (board[i][i].getValue() !== player) {
        break;
      }
      coords.push([i, i]);
      if (i === 2) return { win: true, coords: coords };
    }
    coords = [];
    for (let i = 0; i < 3; i++) {
      if (board[i][2 - i].getValue() !== player) {
        break;
      }
      coords.push([i, 2 - i]);
      if (i === 2) return { win: true, coords: coords };
    }
    return { win: false, coords: [] };
  };

  // Check if board is completely filled (tie)
  const checkForTie = () => {
    let tie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[j][i].getValue()) {
          tie = false;
        }
      }
    }
    return tie;
  };

  // Initial board reset
  resetBoard();

  return {
    displayBoard,
    addToken,
    checkForWin,
    checkForTie,
    resetBoard,
    getBoard,
  };
}

/* CELL */
function Cell() {
  let value = "";

  // Value geter
  const setValue = (val) => (value = val);

  // Value setter
  const getValue = () => value;

  return {
    setValue,
    getValue,
  };
}
