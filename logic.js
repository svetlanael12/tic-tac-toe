let players = ['x', 'o'];
let activePlayer;
let clicks;
let board;
let count;

function generationBoard(count) {
  board = [];

  for (let i = 0; i < count; i++) {
    board[i] = [];
    for (let k = 0; k < count; k++) {
      board[i][k] = '';
    }
  }

  return board;
}

function startGame() {
  let btnSize = document.getElementsByClassName('button-size');

  modalEl.classList.remove('hidden');

  header.style.color = '#000';
  header.textContent = `Выберите размер поля`;

  for (let b of btnSize) {
    b.addEventListener('click', function () {
      //отрисовка поля в зависимости от выбранного размера
      count = b.value;
      generationBoard(count);
      renderBoard(board);
      activePlayer = 0;
      clicks = 0;
      modalEl.classList.add('hidden');
    });
  }
}

function click(row, col) {
  let player = players[activePlayer];
  let win = 0;
  let num = board.length;

  board[row][col] = player;

  renderBoard(board);

  //ничья

  if (clicks < count*count-1) clicks++;
  else {
    clicks = 0;
    return Draw();
  }

  //диагональ
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === player) {
      win++
    };
  }
  if (win === num) {
    clicks = 0;
    return showWinner(activePlayer);
  }

  //обратная диагональ
  win = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i][(board.length - 1) - i] === player) {
      win++;
    };
  }
  if (win === num) {
    clicks = 0;
    return showWinner(activePlayer);
  }

  //горизонталь
  win = 0;

  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board.length; k++) {
      if (board[i][k] === player) {
        win++;
      }
    }
    if (win === num) {
      clicks = 0;
      return showWinner(activePlayer);
    }
    win = 0;
  }

  //вертикаль
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board.length; k++) {
      if (board[k][i] === player) {
        win++;
      }
    }
    if (win === num) {
      clicks = 0;
      return showWinner(activePlayer);
    }
    win = 0;
  }

  activePlayer = (activePlayer + 1) % 2;
}
