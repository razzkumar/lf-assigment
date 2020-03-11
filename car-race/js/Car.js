class Car {
  constructor(x, y, width, height, parentElem, isObstracle) {
    this.car = null;
    this.x = x;
    this.y = y;
    this.isObstracle = isObstracle
    this.parentElem = parentElem;
    this.width = width;
    this.height = height;
    this.color = "red"
    this.keyPressCount = getRandomNumberFromRange(0, 2);
    this.x = PLAYER_CAR_POSITION[this.keyPressCount];
    if (isObstracle) {
      this.velocity = Math.random() + 1;
    } else {
      window.addEventListener("keyup", this.handlePlayerCar.bind(this));
    }
    this.carStyle = {
      height: `${this.height}px`,
      width: `${this.width}px`,
      position: "absolute",
      background: `url(${isObstracle?"./img/enemy_car.png":"./img/car.png"})`,
      left: `${this.x}px`,
      backgroundSize: "100% 100%",
      top: `${this.y}px`,
      zIndex: "10"
    };
    this.handlePlayerCar = this.handlePlayerCar.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.detectGameOver = this.detectGameOver.bind(this);
  }
  init() {

    this.car = document.createElement('div');

    styleElement(this.car, this.carStyle);

    this.parentElem && this.parentElem.appendChild(this.car);

    return this;
  }

  updatePosition() {
    styleElement(this.car, {
      left: `${this.x}px`,
      top: `${this.y}px`,
    })
    return this;
  }

  handlePlayerCar(e) {
    if (e.code === "ArrowLeft") {
      if (this.keyPressCount <= 0) {
        this.keyPressCount = 0;
        this.x = PLAYER_CAR_POSITION[0];
      } else {
        this.keyPressCount--;
        this.x = PLAYER_CAR_POSITION[this.keyPressCount];
      }
    } else if (e.code === "ArrowRight") {
      if (this.keyPressCount >= 2) {
        this.keyPressCount = 2;
        this.x = PLAYER_CAR_POSITION[2];
      } else {
        this.keyPressCount++;
        this.x = PLAYER_CAR_POSITION[this.keyPressCount];
      }
    }
    this.updatePosition();
  };

  detectGameOver(obstracleCars) {
    for (let i = 0; i < obstracleCars.length; i++) {
      if (isCollision(this, obstracleCars[i])) {
        return true;
      }
    }
  }

}
