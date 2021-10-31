import Player from './player.js';
import {generateLogs} from './logs.js';
import { enemyAttack, playerAttack, detectWinnerAndLoser, showResult } from './fight.js';
import { generateRandomNum } from './utils.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

let player1;
let player2;

class Game {
    getEnemyPlayer = async () => {
      const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
      return body;
    }

    getEnemyAttack = async (playerHit, playerDefence) => {
      const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit: playerHit,
            defence: playerDefence,
        })
    });
        const result = await body.json();
        console.log(result);

        return result;
    }

    start = async () => {
        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = await this.getEnemyPlayer();

        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });

        player2 = new Player({
          ...p2,
          player: 2,
          rootSelector: 'arenas',
      });
      
        player1.createPlayer();
        player2.createPlayer();
        generateLogs('start', player1, player2);

        $formFight.addEventListener('submit', (e) => {
            e.preventDefault();
            const player = playerAttack();
            const fightResult = this.getEnemyAttack(player.hit, player.defence);

            if (player.defence !== fightResult.player2.hit) {
              player1.changeHP(fightResult.player2.value);
              player1.renderHP();
              generateLogs('hit', player2, player1, fightResult.player2.value, player1.hp);
            }
          
            if (fightResult.player2.defence !== player.hit) {
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