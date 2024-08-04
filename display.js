/* DOM MANIPULATION AND EVENTS */
function displayDOM(doc) {
  // Cache DOM elements
  let table = doc.querySelector('#board');
  let msgEl = doc.querySelector('#msg');
  let statsEl = doc.querySelector('#stats');
  let form = doc.querySelector('#player-form')
  let inputs = form.querySelectorAll('input[type="text"]');
  let startBtn = form.querySelector('#start-without-names');
  let dialog = doc.querySelector('dialog');

  // Render board to DOM
  const renderBoard = (board) => {
    table.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const tr = doc.createElement('tr');
      for (let j = 0; j < 3; j++) {
        const td = doc.createElement('td');
        td.textContent = board[i][j].getValue();
        td.addEventListener('click', () => handleAddToken(i, j));
        if (td.textContent === '') {
          td.addEventListener('mouseover', handleMouseOver);
          td.addEventListener('mouseout', handleMouseOut);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  };

  // Render provided msg to DOM
  const renderMessage = (msg) => (msgEl.textContent = msg);

  // Render stats to DOM
  const renderStats = (stats) => {
    statsEl.innerHTML = '';
    let html = `<h3 style='text-align: center;'>STATS</h3><div>`;
    stats.forEach(
      (stat) => (html += `<div><strong>${stat.name}</strong></div> <div>Score: ${stat.score}</div>`)
    );
    html += '</div>';
    statsEl.innerHTML = html;
  };

  // Event handlers
  const handleAddToken = (row, col) => {
    game.playRound(row, col);
  };
  const handleGameReset = () => {
    game.resetGame();
  };
  const handleMouseOver = (e) => {
    e.currentTarget.innerText = game.getCurrentPlayer();
    e.currentTarget.style.color = 'grey';
  }
  const handleMouseOut = (e) => e.currentTarget.innerText = '';
  doc.querySelector('#reset').addEventListener('click', handleGameReset);

  // Player form submit event handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    game.init(inputs[0].value, inputs[1].value);
    dialog.close();
    inputs[0].value = '';
    inputs[1].value = '';
  });

  // Game start without player names
  startBtn.addEventListener('click', () => {
    game.init();
    dialog.close();
  });

  // Disable buttons for round win
  const playerWin = (coords) => {
    console.log(coords);
    coords.forEach(coord => table.children[coord[0]].children[coord[1]].style.backgroundColor = 'lightgreen');
  }

  return {
    renderBoard,
    renderMessage,
    renderStats,
    playerWin
  };
}
