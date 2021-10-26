import { generateRandomNum } from "./utils.js";
import { $arenas, $formFight } from "./main.js";
import { player1, player2, createElement } from "./player.js";
import { generateLogs } from "./logs.js";

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const playerWins = (name) => {
  const $winsTitle = createElement('div', 'winTitle');
  if (name) {
    $winsTitle.innerText = `${name} wins`;
  } else {
    $winsTitle.innerText = 'Draw';
  }

  return $winsTitle;
};

const enemyAttack = () => {
  const hit = ATTACK[generateRandomNum(3) - 1]; // body part which enemy attacks with (head, body or foot)
  const defence = ATTACK[generateRandomNum(3) - 1]; // body part which enemy defences with (head, body or foot)

  return {
    value: generateRandomNum(HIT[hit]), // random damage by a body part (up to a predefined in HIT object value)
    hit,
    defence,
  };
};

const playerAttack = () => {
  const attack = {};

  for (let item of $formFight) {
    let { checked, name, value } = item;
    if (checked && name === 'hit') {
      attack.value = generateRandomNum(HIT[value]);
      attack.hit = value;
    }

    if (checked && name === 'defence') {
      attack.defence = value;
    }

    item.checked = false;
  }

  return attack;
};

const detectWinnerAndLoser = () => {
  let resultObj = {};

  if (player1.hp === 0 && player1.hp < player2.hp) {
    resultObj = {
      playerWins: `${player2.name}`,
      playerLoses: `${player1.name}`,
      draw: false,
    };
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    resultObj = {
      playerWins: `${player1.name}`,
      playerLoses: `${player2.name}`,
      draw: false,
    };
  } else if (player1.hp === 0 && player2.hp === 0) {
    resultObj = {
      draw: true,
    };
  }

  return resultObj;
};

const showResult = (resultObj) => {
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none';
    createReloadButton();
  }

  if (resultObj.playerWins !== undefined) {
    $arenas.appendChild(playerWins(resultObj.playerWins));
    generateLogs('end', undefined, undefined, undefined, undefined, resultObj);
  } else if (resultObj.draw === true) {
    $arenas.appendChild(playerWins());
    generateLogs('draw');
  }
};

const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });

  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);
};

export {enemyAttack, playerAttack, detectWinnerAndLoser, showResult}
