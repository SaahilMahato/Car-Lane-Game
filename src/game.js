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

    for (let i=0; i<7; i++) {
        let roadLine = createRoadLine(195, i*128 + 10);
        gameArea.append(roadLine);
    }

    for (let i=0; i<7; i++) {
        let roadLine = createRoadLine(395, i*128 + 10);
        gameArea.append(roadLine);
    }

    player = createPlayer();
    gameArea.append(player);
    playerAttr.x = player.offsetLeft;
}

startScreen.addEventListener('click', startGame);
