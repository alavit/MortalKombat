const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.buttonWrap .button');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

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
  this.elHP().style.width = `${this.hp}%`;
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);//.replace('[time]', getCurrentTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);

function enemyAttack() {
  const hit = ATTACK[generateRandomNum(3) - 1]; // body part which enemy attacks with (head, body or foot)
  const defence = ATTACK[generateRandomNum(3) - 1]; // body part which enemy defences with (head, body or foot)

  return {
    value: generateRandomNum(HIT[hit]), // random damage by a body part (up to a predefined in HIT object value)
    hit,
    defence,
  }
}

function playerAttack() {
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

  return attack;
}

function detectWinnerAndLoser() {
  let resultObj = {};
  
  if (player1.hp === 0 && player1.hp < player2.hp) {
    resultObj = {
      playerWins: `${player2.name}`,
      playerLoses: `${player1.name}`,
      draw: false 
    };
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    resultObj = {
      playerWins: `${player1.name}`,
      playerLoses: `${player2.name}`,
      draw: false 
    };
  } else if (player1.hp === 0 && player2.hp === 0) {
    resultObj = {
      draw: true 
    };
  }

  return resultObj; 
}

function showResult(resultObj) {
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none';
    createReloadButton();
  }

  if (resultObj.playerWins !== undefined) {
    $arenas.appendChild(playerWins(resultObj.playerWins));
    generateLogs('end');
  } else if (resultObj.draw === true) {
    $arenas.appendChild(playerWins());
    generateLogs('draw');
  }
}

function generateLogs(type, player1, player2, changeValue, hp) {
  let fullText = '';

  switch (type) {
    case 'start':
      fullText = logs[type].replace('[time]', getCurrentTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'end':
      const resultObj = detectWinnerAndLoser();
      fullText = `${logs[type][generateRandomNum(logs[type].length - 1)].replace('[playerWins]', resultObj.playerWins).replace('[playerLose]', resultObj.playerLoses)}`;
      break;
    case 'hit':
      const textHit = `${logs[type][generateRandomNum(logs[type].length - 1)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)} -${changeValue} [${hp}/100]`;
      fullText = `${getCurrentTime()} - ${textHit}`;
      break;
    case 'defence':
      const textDefence = `${logs[type][generateRandomNum(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${changeValue} [${hp}/100]`;
      fullText = `${getCurrentTime()} - ${textDefence}`;
      break;
    case 'draw':
      fullText = logs[type];
      break;
  }

  const el = `<p>${fullText}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
}

function getCurrentTime() {
  const date = new Date();
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`)

  return `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;
}

$formFight.addEventListener('submit', function (e) {
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