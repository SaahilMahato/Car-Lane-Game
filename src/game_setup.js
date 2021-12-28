/**
 * @returns {HTMLBodyElement} - A div that is the player
 */
createPlayer = () => {
    let player = document.createElement('div');
    player.style.position = 'absolute';
    player.style.width = '100px';
    player.style.height = '100px';
    player.style.left = '250px'; // calculated using width of road
    player.style.bottom = '20px';
    player.style.background = "url('../assets/player.png')";
    player.style.backgroundSize = 'cover';
    return player;
}

/**
 * @returns {HTMLBodyElement} - A div that is the enemy
 */
createEnemy = (index) => {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.position = 'absolute';
    enemy.style.width = '100px';
    enemy.style.height = '100px';
    enemy.style.background = "url('../assets/enemy.png')";
    enemy.style.backgroundSize = 'cover';
    enemy.style.left = index*200 + 50 + 'px'; // calculated using width of road
    enemy.style.top = '0px';
    return enemy;
}

/**
 * @returns {undefined} - spwans enemy at random lane
 */
spawnEnemy = () => {
    if (Math.random() < spawnRate) {
        let spawnIndex = getRandomIntInclusive(0, 2);
        let enemy = createEnemy(spawnIndex);
        gameArea.append(enemy);
    }
}

/**
 * @returns {undefined} - increases speed and enemy spawn rate
 */
increaseSpeed = () => {
    speed++;
    spawnRate += 0.1;
}

/**
 * @returns {HTMLBodyElement} - A div that is a lane separator
 */
createRoadLine = (x, y) => {
    let roadLine = document.createElement('div');
    roadLine.classList.add('road-lines');
    roadLine.style.width = '10px';
    roadLine.style.height = '100px';
    roadLine.style.position = 'absolute';
    roadLine.style.background = 'white';
    roadLine.style.left = x + 'px';
    roadLine.style.top = y + 'px';
    return roadLine;
}

/**
 * @returns {undefined} - Animates lane separators
 */
moveLines = (speed) => {
    let roadLines = document.querySelectorAll('.road-lines');
    let newTop, currTop;
    let maxTop = window.innerHeight;
    roadLines.forEach((roadLine) => {
        currTop = parseInt(roadLine.style.top);
        if (currTop > maxTop)
            newTop = 0;
        else
            newTop = currTop + speed;
        roadLine.style.top = newTop + 'px';
    });
}

/**
 * @returns {undefined} - Animates enemies
 */
moveEnemies = (speed) => {
    let enemies = document.querySelectorAll('.enemy');
    let newTop, currTop;
    let maxTop = window.innerHeight;
    enemies.forEach((enemy) => {

        if(checkCollision(player, enemy))
            gameOver();

        currTop = parseInt(enemy.style.top);
        if (currTop > maxTop) {
            playerAttr.score++;
            score.innerText = "Score: " + playerAttr.score;
            gameArea.removeChild(enemy);
        }
        else
            newTop = currTop + speed;   
        enemy.style.top = newTop + 'px';
    });
}

/**
 * @returns {boolean} - Checks if 2 objects collide
 */
checkCollision = (player, enemy) => {
    playerRect = player.getBoundingClientRect();
    enemyRect = enemy.getBoundingClientRect();

    // +/- 20 to fix hitbox
    return !(playerRect.top + 20 > enemyRect.bottom ||
        playerRect.bottom - 20 < enemyRect.top ||
        playerRect.right < enemyRect.left ||
        playerRect.left > enemyRect.right);
}

/**
 * @returns {undefined} - function that displays the game over screen
 */
gameOver = () => {
    playerAttr.playStatus = false;
    if (playerAttr.score > highScore) highScore = playerAttr.score;
    scoreInfo.innerHTML = 'Game Over<br/>Your Score: ' + playerAttr.score + '<br/>High Score: ' + highScore;
    score.classList.add('hide');
    ammoDisplay.classList.add('hide');
    score.innerText = 'Score: 0';
    ammoDisplay.innerText = 'Ammo: 0';
    endScreen.classList.remove('hide');

    clearInterval(spawnEnemyInterval);
    clearInterval(increaseSpeedInterval);
    clearInterval(spawnAmmoPowerUpInterval);
}

/**
 * @returns {HTMLBodyElement} - A div that is an ammo
 */
fireAmmo = () => {
    let ammo = document.createElement('div');
    ammo.classList.add('ammo');
    ammo.style.position = 'absolute';
    ammo.style.width = '50px';
    ammo.style.height = '50px';
    ammo.style.background = "url('../assets/bullet.png')";
    ammo.style.backgroundSize = 'cover';
    ammo.style.left = playerAttr.lane*200 + 75 + 'px'; // calculated using width of road
    ammo.style.bottom = '120px';
    return ammo;
}

/**
 * @returns {undefined} - Animates Ammos
 */
moveAmmos = (speed) => {
    let ammos = document.querySelectorAll('.ammo');
    let newTop, currTop;
    let min_top = 0;
    let enemies = document.querySelectorAll('.enemy');
    ammos.forEach((ammo) => {

        enemies.forEach((enemy) => {
            if(checkCollision(ammo, enemy)) {
                gameArea.removeChild(enemy);
                gameArea.removeChild(ammo);
            }
        });

        currTop = ammo.getBoundingClientRect().top;
        if (currTop < min_top)
            gameArea.removeChild(ammo);
        else
            newTop = currTop - speed; 
        ammo.style.top = newTop + 'px';
    });
}

/**
 * @returns {HTMLBodyElement} - A div that is an ammo powerup
 */
createAmmoPowerUp = (index) => {
    let ammoPowerUp = document.createElement('div');
    ammoPowerUp.classList.add('ammo-power-up');
    ammoPowerUp.style.position = 'absolute';
    ammoPowerUp.style.width = '50px';
    ammoPowerUp.style.height = '50px';
    ammoPowerUp.style.background = "url('../assets/powerup.svg')";
    ammoPowerUp.style.backgroundSize = 'cover';
    ammoPowerUp.style.left = index*200 + 75 + 'px'; //calulated using width of road
    ammoPowerUp.style.top = '0px';
    return ammoPowerUp;
}

/**
 * @returns {undefined} - Randomly spawns powerup at each lane
 */
spawnAmmoPowerUp = () => {
    if (Math.random() < 0.2) {
        let spawnIndex = getRandomIntInclusive(0, 2);
        let ammoPowerUp = createAmmoPowerUp(spawnIndex);
        gameArea.append(ammoPowerUp);
    }
}

/**
 * @returns {undefined} - Animates ammos
 */
moveAmmoPowerUp = (speed) => {
    let ammoPowerUps = document.querySelectorAll('.ammo-power-up');
    let newTop, currTop;
    let maxTop = window.innerHeight;
    ammoPowerUps.forEach((ammoPowerUp) => {

        if(checkCollision(player, ammoPowerUp)) {
            playerAttr.ammoCount++;
            ammoDisplay.innerText = "Ammo: " + playerAttr.ammoCount;
            gameArea.removeChild(ammoPowerUp);
        }

        currTop = parseInt(ammoPowerUp.style.top);
        if (currTop > maxTop)
            gameArea.removeChild(ammoPowerUp);
        else
            newTop = currTop + speed;   
        ammoPowerUp.style.top = newTop + 'px';
    });
}