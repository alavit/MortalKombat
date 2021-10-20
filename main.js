const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice Scepter', 'Kori Blade', 'Ice Hammer'],
  attack: function () {
    console.log(this.name + ' ' + 'Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Liu Kang',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: ['Dragon Sword', 'Nunchaku'],
  attack: function () {
    console.log(this.name + ' ' + 'Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement('div', 'player' + playerObj.player);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = playerObj.hp + '%';
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function changeHP(changeValue) {
  this.hp -= changeValue;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function playerWins(name) {
  const $winsTitle = createElement('div', 'winTitle');
  if (name) {
    $winsTitle.innerText = name + ' wins';
  } else {
    $winsTitle.innerText = 'Draw';
  }

  return $winsTitle;
}

function generateRandomNum(num) {
  return Math.ceil(Math.random() * num);
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);
}

$randomButton.addEventListener('click', function () {
  player1.changeHP(generateRandomNum(20));
  player1.renderHP();

  player2.changeHP(generateRandomNum(20));
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[generateRandomNum(3) - 1];
  const defence = ATTACK[generateRandomNum(3) - 1];

  return {
    value: generateRandomNum(HIT[hit]),
    hit,
    defence,
  }
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = {};
  
  for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = generateRandomNum(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
  }
  console.log('####: attack', attack);
  console.log('####: enemy', enemy);
})