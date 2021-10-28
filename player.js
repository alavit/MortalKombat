export const player1 = {
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
  
export const player2 = {
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

function changeHP(changeValue) {
    this.hp -= changeValue;
  
    if (this.hp <= 0) {
      this.hp = 0;
    }
}
  
function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}
  
function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

const createPlayer = ({player, hp, name, img}) => {
  const $player = createElement('div', `player${player}`);
  const $progressBar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = `${hp}%`;
  $name.innerText = name;
  $img.src = img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  return $player;
};

export {changeHP, elHP, renderHP, createPlayer, createElement};


  