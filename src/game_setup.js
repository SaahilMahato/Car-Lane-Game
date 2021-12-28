createPlayer = () => {
    let player = document.createElement('div');
    player.style.position = 'absolute';
    player.style.width = '100px';
    player.style.height = '100px';
    player.style.left = '250px';
    player.style.bottom = '20px';
    player.style.background = "url('../assets/player.png')";
    player.style.backgroundSize = 'cover';
    return player;
}

createEnemy = (index) => {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.position = 'absolute';
    enemy.style.width = '100px';
    enemy.style.height = '100px';
    enemy.style.background = "url('../assets/enemy.png')";
    enemy.style.backgroundSize = 'cover';
    enemy.style.left = index*200 + 50 + 'px';
    enemy.style.top = '0px';
    return enemy;
}

spawnEnemy = () => {
    if (Math.random() < spawnRate) {
        let spawnIndex = getRandomIntInclusive(0, 2);
        let enemy = createEnemy(spawnIndex);
        gameArea.append(enemy);
    }
}

increaseSpeed = () => {
    speed++;
    spawnRate += 0.1;
}

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

moveLines = (speed) => {
    let roadLines = document.querySelectorAll('.road-lines');
    let new_top, curr_top;
    let max_top = window.innerHeight;
    roadLines.forEach((roadLine) => {
        curr_top = parseInt(roadLine.style.top);
        if (curr_top > max_top)
            new_top = 0;
        else
            new_top = curr_top + speed;
        roadLine.style.top = new_top + 'px';
    });
}

moveEnemies = (speed) => {
    let enemies = document.querySelectorAll('.enemy');
    let new_top, curr_top;
    let max_top = window.innerHeight;
    enemies.forEach((enemy) => {

        if(checkCollision(player, enemy)) {
            gameOver();
        }

        curr_top = parseInt(enemy.style.top);
        if (curr_top > max_top) {
            playerAttr.score++;
            score.innerText = "Score: " + playerAttr.score;
            gameArea.removeChild(enemy);
        }
        else
            new_top = curr_top + speed;   
        enemy.style.top = new_top + 'px';
    });
}

checkCollision = (player, enemy) => {
    playerRect = player.getBoundingClientRect();
    enemyRect = enemy.getBoundingClientRect();

    // +/- 20 to fix hitbox
    return !(playerRect.top + 20 > enemyRect.bottom ||
        playerRect.bottom - 20 < enemyRect.top ||
        playerRect.right < enemyRect.left ||
        playerRect.left > enemyRect.right);
}

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

fireAmmo = () => {
    let ammo = document.createElement('div');
    ammo.classList.add('ammo');
    ammo.style.position = 'absolute';
    ammo.style.width = '50px';
    ammo.style.height = '50px';
    ammo.style.background = "url('../assets/bullet.png')";
    ammo.style.backgroundSize = 'cover';
    ammo.style.left = playerAttr.lane*200 + 75 + 'px';
    ammo.style.bottom = '120px';
    return ammo;
}

moveAmmos = (speed) => {
    let ammos = document.querySelectorAll('.ammo');
    let new_top, curr_top;
    let min_top = 0;
    let enemies = document.querySelectorAll('.enemy');
    ammos.forEach((ammo) => {

        enemies.forEach((enemy) => {
            if(checkCollision(ammo, enemy)) {
                gameArea.removeChild(enemy);
                gameArea.removeChild(ammo);
            }
        });

        curr_top = ammo.getBoundingClientRect().top;
        if (curr_top < min_top)
            gameArea.removeChild(ammo);
        else
            new_top = curr_top - speed; 
        ammo.style.top = new_top + 'px';
    });
}

createAmmoPowerUp = (index) => {
    let ammoPowerUp = document.createElement('div');
    ammoPowerUp.classList.add('ammo-power-up');
    ammoPowerUp.style.position = 'absolute';
    ammoPowerUp.style.width = '50px';
    ammoPowerUp.style.height = '50px';
    ammoPowerUp.style.background = "url('../assets/powerup.svg')";
    ammoPowerUp.style.backgroundSize = 'cover';
    ammoPowerUp.style.left = index*200 + 75 + 'px';
    ammoPowerUp.style.top = '0px';
    return ammoPowerUp;
}

spawnAmmoPowerUp = () => {
    if (Math.random() < 0.2) {
        let spawnIndex = getRandomIntInclusive(0, 2);
        let ammoPowerUp = createAmmoPowerUp(spawnIndex);
        gameArea.append(ammoPowerUp);
    }
}

moveAmmoPowerUp = (speed) => {
    let ammoPowerUps = document.querySelectorAll('.ammo-power-up');
    let new_top, curr_top;
    let max_top = window.innerHeight;
    ammoPowerUps.forEach((ammoPowerUp) => {

        if(checkCollision(player, ammoPowerUp)) {
            playerAttr.ammoCount++;
            ammoDisplay.innerText = "Ammo: " + playerAttr.ammoCount;
            gameArea.removeChild(ammoPowerUp);
        }

        curr_top = parseInt(ammoPowerUp.style.top);
        if (curr_top > max_top)
            gameArea.removeChild(ammoPowerUp);
        else
            new_top = curr_top + speed;   
        ammoPowerUp.style.top = new_top + 'px';
    });
}