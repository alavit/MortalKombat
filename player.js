import { createElement } from "./utils.js";

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
  }

  changeHP = (changeValue) => {
    this.hp -= changeValue;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => document.querySelector(`.player${this.player} .life`);

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  };

  attack = () => {
    console.log(this.name + ' ' + 'Fight...');
  };

  createPlayer = () => {
    const $player = createElement('div', `player${this.player}`);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');
  
    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $img.src = this.img;
  
    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);
  
    return $player;
  };
}

export default Player;
