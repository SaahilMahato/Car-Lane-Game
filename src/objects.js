createPlayer = () => {
    let car = document.createElement('div');
    car.style.position = 'absolute';
    car.style.width = '50px';
    car.style.height = '80px';
    car.style.background = 'red';
    car.style.left = '275px';
    car.style.bottom = '20px';
    return car;
}

createEnemy = (index) => {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.position = 'absolute';
    enemy.style.width = '50px';
    enemy.style.height = '80px';
    enemy.style.background = 'yellow';
    enemy.style.left = index*200+75 + 'px';
    enemy.style.top = '0px';
    return enemy;
}

spawnEnemy = () => {
    let spawnIndex1 = getRandomIntInclusive(0, 2);
    let spawnIndex2 = getRandomIntInclusive(0, 2);
    let enemy1 = createEnemy(spawnIndex1);
    let enemy2 = createEnemy(spawnIndex2);
    gameArea.append(enemy1);
    gameArea.append(enemy2);
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

        if(checkCollision(player, enemy))
            

        curr_top = parseInt(enemy.style.top);
        if (curr_top > max_top) {
            new_top = 0;
            let spawnIndex = getRandomIntInclusive(0, 2);
            enemy.style.left = spawnIndex*200+75 + 'px';
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