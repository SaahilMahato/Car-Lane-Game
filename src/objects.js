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
    if (Math.random() < 0.5) {
        let spawnIndex = getRandomIntInclusive(0, 2);
        let enemy = createEnemy(spawnIndex);
        gameArea.append(enemy);
    }
}

increaseSpeed = () => {
    speed++;
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

    return !(playerRect.top > enemyRect.bottom ||
        playerRect.bottom < enemyRect.top ||
        playerRect.right < enemyRect.left ||
        playerRect.left > enemyRect.right);
}

gameOver = () => {
    playerAttr.playStatus = false;
    if (playerAttr.score > highScore) highScore = playerAttr.score;
    endScreen.innerText = 'Game Over. Your Score: ' + playerAttr.score + '. High Score: ' + highScore + '. Click this message box to restart';
    score.classList.add('hide');
    score.innerText = 'Score: 0';
    endScreen.classList.remove('hide');

    clearInterval(spawnEnemyInterval);
    clearInterval(increaseSpeedInterval);
}