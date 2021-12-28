const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const endScreen = document.querySelector('.endScreen');

const playerAttr = {
    laneDistance: 200,
    x: 0,
    lane: 1,
    score: 0,
    ammoCount: 1,
    playStatus: false
};

let highScore = 0;

let speed = 1;

let player;

let spawnEnemyInterval;
let increaseSpeedInterval;

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
    if (e.key === 'ArrowUp' || e.key === 'w') {
        if (playerAttr.ammoCount > 0) {
            console.log('ammofired');
            gameArea.appendChild(fireAmmo());
            playerAttr.ammoCount--;
        }
    }
}

document.addEventListener('keydown', userInputHandler);

const gamePlay = () => {

    if (playerAttr.playStatus) {
        player.animate([
            {left : playerAttr.x + 'px'}
        ], {
            duration: 1000,
            iterations: 1,
            fill: 'forwards'
        });

        moveLines(speed);
        moveEnemies(speed);

        window.requestAnimationFrame(gamePlay);
    }
}

const startGame = (e) => {
    e.preventDefault();
    gameArea.classList.remove('hide');
    score.classList.remove('hide');
    startScreen.classList.add('hide');
    endScreen.classList.add('hide');
    gameArea.innerHTML = '';

    playerAttr.x = 0;
    playerAttr.lane = 1;
    playerAttr.score = 0;
    speed = 1;

    playerAttr.playStatus = true;

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

    spawnEnemyInterval = setInterval(spawnEnemy, 800);
    increaseSpeedInterval = setInterval(increaseSpeed, 10000);
}

startScreen.addEventListener('click', startGame);
endScreen.addEventListener('click', startGame);