// DOM elements
const score = document.querySelector('.score-display');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.game-area');
const endScreen = document.querySelector('.end-screen');
const ammoDisplay = document.querySelector('.ammo-display');
const scoreInfo = document.querySelector('.score-info');

// stores information about the player
const playerAttr = {
    laneDistance: 200,
    x: 0,
    lane: 1,
    score: 0,
    ammoCount: 0,
    playStatus: false
};

// global variables of the game
let highScore = 0;
let speed = 1;
let spawnRate = 0.5;
let player;
let spawnEnemyInterval;
let increaseSpeedInterval;
let spawnAmmoPowerUpInterval;

/**
 * @returns {undefined} - checks which key is pressed and performs the action
 */
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
            gameArea.appendChild(fireAmmo());
            playerAttr.ammoCount--;
            ammoDisplay.innerText = "Ammo: " + playerAttr.ammoCount;
        }
    }
}

// add input handler to DOM
document.addEventListener('keydown', userInputHandler);

/**
 * @returns {undefined} - Runs the game
 */
const gameLoop = () => {
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
        moveAmmos(speed);
        moveAmmoPowerUp(speed);

        window.requestAnimationFrame(gameLoop);
    }
}

/**
 * @returns {undefined} - Starts the game
 */
const startGame = (e) => {
    e.preventDefault();

    // hides and shows HTML elements of the DOM when game starts
    gameArea.classList.remove('hide');
    score.classList.remove('hide');
    ammoDisplay.classList.remove('hide');
    startScreen.classList.add('hide');
    endScreen.classList.add('hide');
    gameArea.innerHTML = '';

    // resets player status 
    playerAttr.x = 0;
    playerAttr.lane = 1;
    playerAttr.score = 0;
    playerAttr.ammoCount = 0;
    speed = 1;
    playerAttr.playStatus = true;

    // starts frames
    window.requestAnimationFrame(gameLoop);

    // spawns first line of lane separators
    for (let i=0; i<7; i++) {
        let roadLine = createRoadLine(195, i*128 + 10);
        gameArea.append(roadLine);
    }

    // spawns second line of lane separators
    for (let i=0; i<7; i++) {
        let roadLine = createRoadLine(395, i*128 + 10);
        gameArea.append(roadLine);
    }

    // spawns player
    player = createPlayer();
    gameArea.append(player);
    playerAttr.x = player.offsetLeft;

    // sets intervals to perform periodic functions in the game
    spawnEnemyInterval = setInterval(spawnEnemy, 1500);
    increaseSpeedInterval = setInterval(increaseSpeed, 30000);
    spawnAmmoPowerUpInterval = setInterval(spawnAmmoPowerUp, 2000);
}
