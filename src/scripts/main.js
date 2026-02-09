'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const boardEl = document.querySelector('.game-field');
const scoreEl = document.querySelector('.game-score');
const startBtn = document.querySelector('.button-start');
const msgWin = document.querySelector('.message-win');
const msgLose = document.querySelector('.message-lose');
const msgStart = document.querySelector('.message-start');

function render() {
  // оновлюємо рахунок
  scoreEl.textContent = game.getScore();

  // оновлюємо плитки
  const cells = boardEl.querySelectorAll('.field-cell');
  const flatBoard = game.getState().flat();

  cells.forEach((cell, i) => {
    const value = flatBoard[i];

    cell.textContent = value !== 0 ? value : '';
    cell.className = 'field-cell';

    if (value !== 0) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  // оновлюємо повідомлення
  msgWin.classList.toggle('hidden', game.getStatus() !== 'win');
  msgLose.classList.toggle('hidden', game.getStatus() !== 'lose');
  msgStart.classList.toggle('hidden', game.getStatus() === 'playing');
}

// кнопка Start / Restart
startBtn.addEventListener('click', () => {
  game.restart();
  render();
});

// клавіші
document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  render();
});
