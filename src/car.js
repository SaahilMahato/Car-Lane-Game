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

createRoadLine = (x, y) => {
    let roadLine = document.createElement('div');
    roadLine.style.width = '10px';
    roadLine.style.height = '100px';
    roadLine.style.position = 'absolute';
    roadLine.style.background = 'white';
    roadLine.style.left = x + 'px';
    roadLine.style.top = y + 'px';
    return roadLine;
}