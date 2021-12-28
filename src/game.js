const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

const playerAttr = {
    laneDistance: 200,
    x: 0,
    lane: 1,
};

let speed = 1;

let player;

const userInputHandler = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        if (playerAttr.lane > 0) {
            playerAttr.x -= playerAttr.laneDistance;
            playerAttr.lane--;
        }
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        if (playerAttr.lane < 2) {
            playerAttr.x += playerAttr.laneDistance;
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

    moveLines(speed);
    moveEnemies(speed);

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


    setInterval(() => {
        spawnEnemy();
    },2000);
}

startScreen.addEventListener('click', startGame);
