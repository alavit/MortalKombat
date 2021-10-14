const player1 = {
    name: 'Sub-Zero',
    hp: 90, 
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade', 'Ice Hammer'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

const player2 = {
    name: 'Liu Kang',
    hp: 70, 
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['Dragon Sword', 'Nunchaku'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...');
    }
};

function createPlayer(playerClass, player) {
 const $player = document.createElement('div');
 $player.classList.add(playerClass);

 const $progressBar = document.createElement('div');
 $progressBar.classList.add('progressbar');

 const $life = document.createElement('div');
 $life.style.width = player.hp + '%';
 $life.classList.add('life');

 const $name = document.createElement('div');
 $name.classList.add('name');
 $name.innerText = player.name;

 const $character = document.createElement('div');
 $character.classList.add('character');

 const $img = document.createElement('img');
 $img.src = player.img;

 $player.appendChild($progressBar);
 $player.appendChild($character);
 $progressBar.appendChild($life);
 $progressBar.appendChild($name);
 $character.appendChild($img);

 const $arenas = document.querySelector('div.arenas');
 $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
