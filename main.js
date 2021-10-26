import { player1, player2, createPlayer } from './player.js';
import { generateLogs } from './logs.js';
import { enemyAttack, playerAttack, detectWinnerAndLoser, showResult } from './fight.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value, player1.hp);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('defence', player1, player2, player.value, player2.hp);
  }

  const resultObj = detectWinnerAndLoser();
  showResult(resultObj);
})