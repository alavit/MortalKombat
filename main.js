const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: "Sub-Zero",
  hp: 65,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ice Scepter", "Kori Blade", "Ice Hammer"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

const player2 = {
  player: 2,
  name: "Liu Kang",
  hp: 95,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["Dragon Sword", "Nunchaku"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement("div", 'player'+playerObj.player);
  const $progressBar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = playerObj.hp + "%";
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player'+ player.player +' .life');
    player.hp -= generateRandomNum();
    console.log(player.player+' HP: ' + player.hp);
    $playerLife.style.width = player.hp + '%';

    if (player.hp <= 0) {
        player.hp = 0;
        $playerLife.style.width = player.hp + '%';
    }
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = name + ' wins';

    return $winsTitle;
}

function generateRandomNum() {
    return Math.ceil(Math.random() * 20);
}

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);

    if (player1.hp === 0) {
        //console.log('player 2 wins')
        $randomButton.disabled = true;
        $arenas.appendChild(playerWins(player2.name)); 
    }

    if (player2.hp === 0) {
        //console.log('player 1 wins')
        $randomButton.disabled = true;
        $arenas.appendChild(playerWins(player1.name)); 
    } 
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
