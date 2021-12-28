const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

const playerAttr = {
    speed: 200,
    x: 0,
    lane: 1,
};

let player;

const userInputHandler = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        if (playerAttr.lane > 0) {
            playerAttr.x -= playerAttr.speed;
            playerAttr.lane--;
        }
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        if (playerAttr.lane < 2) {
            playerAttr.x += playerAttr.speed;
            playerAttr.lane++;
        }
    }
}

document.addEventListener('keydown', userInputHandler);

const gamePlay = () => {
    player.animate([
        {left : playerAttr.x + 'px'}
    ], {
        duration: 500,
        iterations: 1,
        fill: 'forwards'
    });
    window.requestAnimationFrame(gamePlay);
}

const startGame = (e) => {
    e.preventDefault();
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    window.requestAnimationFrame(gamePlay);

    player = new Car().createPlayer();
    gameArea.append(player);
    playerAttr.x = player.offsetLeft;

    let roadLine = document.createElement('div');
    roadLine.classList.add('lines');
    gameArea.append(roadLine);
}

startScreen.addEventListener('click', startGame);
