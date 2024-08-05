/* GAME CONTROLLER/ENTRTY POINT */
const game = (function () {
  // Create board and display objects
  const board = GameBoard();
  const display = displayDOM(document);
  const stats = Stats();

  let gameOver = false;

  // Define player name variables
  let playerNames = [];

  // Define players and their moves
  const players = ["X", "O"];
  let currentPlayer = players[0];

  // Switch player's turn
  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    display.renderMessage(
      `Player ${
        playerNames[players.indexOf(currentPlayer)] || currentPlayer
      }'s TURN!`
    );
  };

  // Current player getter
  const getCurrentPlayer = () => currentPlayer;

  // Play a round for current player
  const playRound = (row, col) => {
    if (gameOver) return;
    try {
      console.log(`Playing new round: Player${currentPlayer}'s turn...`);
      board.addToken(row, col, currentPlayer);
      board.displayBoard();
      display.renderBoard(board.getBoard());
      const { win, coords } = board.checkForWin(currentPlayer);
      if (win) {
        winRound(coords);
      } else if (board.checkForTie()) {
        tieRound();
      } else {
        switchTurn();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Player win
  const winRound = (coords) => {
    console.log(`Player ${currentPlayer} WON!`);
    gameOver = true;
    display.renderMessage(
      `Player ${
        playerNames[players.indexOf(currentPlayer)] || currentPlayer
      } WON!`
    );
    stats.increaseScore(players.indexOf(currentPlayer));
    display.renderStats(stats.getStats());
    display.playerWin(coords);
    // setTimeout(resetGame, 5000);
  };
  // Players tie
  const tieRound = () => {
    console.log(`TIE!`);
    gameOver = true;
    display.renderMessage(`TIE!`);
  };
  // Reset board and render it
  const resetGame = () => {
    board.resetBoard();
    display.renderBoard(board.getBoard());
    gameOver = false;
    switchTurn();
  };

  // Initialize the game
  const init = (playerOne, playerTwo) => {
    if (playerOne && playerTwo) {
      stats.setPlayerNames(playerOne, playerTwo);
      playerNames = [playerOne, playerTwo];
    }

    // Initial render and msg
    display.renderBoard(board.getBoard());
    display.renderMessage(
      `Player ${
        playerNames[players.indexOf(currentPlayer)] || currentPlayer
      }'s TURN!`
    );
    display.renderStats(stats.getStats());
  };

  return {
    playRound,
    getCurrentPlayer,
    resetGame,
    init,
  };
})();
