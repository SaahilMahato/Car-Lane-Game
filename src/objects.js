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

createEnemy = (x) => {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.position = 'absolute';
    enemy.style.width = '50px';
    enemy.style.height = '80px';
    enemy.style.background = 'yellow';
    enemy.style.left = x + 'px';
    enemy.style.top = '0px';
    return enemy;
}

spawnEnemy = () => {
    let spawnIndices = [75, 275, 475];
    let spawnIndex = spawnIndices[getRandomIntInclusive(0, 2)];
    let enemy = createEnemy(spawnIndex);
    gameArea.append(enemy);
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
    })
}

moveEnemies = (speed) => {
    let enemies = document.querySelectorAll('.enemy');
    let curr_top;
    enemies.forEach((enemy) => {
        curr_top = parseInt(enemy.style.top);
        new_top = curr_top + speed;
        enemy.style.top = new_top + 'px';
    })
}