class Car {

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
}