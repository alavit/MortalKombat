import Player from './player.js';
import {generateLogs} from './logs.js';
import { enemyAttack, playerAttack, detectWinnerAndLoser, showResult } from './fight.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

class Game {
    
    start = () => {
        const player1 = new Player({
            player: 1,
            name: 'Sub-Zero',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        })
          
        const player2 = new Player({
            player: 2,
            name: 'Liu Kang',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
        })

        $arenas.appendChild(player1.createPlayer());
        $arenas.appendChild(player2.createPlayer());
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
          
            const resultObj = detectWinnerAndLoser(player1, player2);
            showResult(player1, player2, resultObj);
          })
    }
}

export default Game;