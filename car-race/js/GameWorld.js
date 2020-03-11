const CONTAINER_HEIGHT = 650;
const CONTAINER_WIDTH = 420;
const CAR_HEIGHT = 80;
const CAR_WIDTH = 50;
const INNITIAL_OBSTRACLES = 3;
const MIN_GAP_BEETWEEN_CAR = 110;
const ROAD_HEIGHT = CONTAINER_HEIGHT * 10;


class GameWorld {
  constructor(data) {
    this.id = data.id;
    this.speed = 2.5;
    this.container = document.querySelector(`#${this.id}`);
    this.startScreen = null;
    this.road = null;
    this.scoreScreen = null;

    this.roadPosition = 10; //-10px top (viewport vanda bahira)  
    this.animate = this.animate.bind(this);
    this.score = 0;
    this.obstracleCars = [];
    this.playerCar = null;
    this.isGameStarted = false;
    this.gameEnd = false;
  }

  // Create game word

  setup() {

    let containerStyle = {
      overflow: "hidden",
      margin: "5px auto",
      height: `${CONTAINER_HEIGHT}px`,
      width: `${CONTAINER_WIDTH}px`,
      position: "relative",
      border: "2px solid red",
    }
    styleElement(this.container, containerStyle);

    // ==CREATING START SCREEN==

    this.startScreen = document.createElement("div");

    let startScreenStyle = {
      position: "absolute",
      left: "50%",
      top: "50%",
      margin: "20px",
      color: "#fff",
      zIndex: 20,
      textAlign: "center",
      transform: "translate(-50%, -50%)",
      display: "none"
    }

    styleElement(this.startScreen, startScreenStyle);

    this.startScreen.innerHTML = "<div>Let's Get Ready for Race</div>"
    let startBtn = document.createElement("button");

    startBtn.addEventListener("click", () => {
      this.isGameStarted = true;
      this.speed = 2.5;

      if (this.gameEnd) {
        this.score = 0;
        this.obstracleCars.forEach((car, i) => {
          if (i % 2 === 0) {
            car.y = -CONTAINER_HEIGHT / 2;
          } else {
            car.y = -CAR_HEIGHT;
            car.x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
          }
          car.updatePosition();
        });
      }

      this.road.style.background = "gray url('./img/3-lane-dash.png') repeat-y";
      this.gameEnd = false;
      this.init();
      this.startScreen.style.display = "none";
      this.scoreScreen.innerText = "SCORE : 0";
    })

    startBtn.innerText = "Start";
    this.startScreen.appendChild(startBtn);

    this.container.appendChild(this.startScreen);

    // CREATING SCORE BORD

    this.scoreScreen = document.createElement("div");

    let scoreScreenStyle = {
      position: "absolute",
      right: 0,
      top: 0,
      margin: "20px",
      padding: "10px",
      color: "#fff",
      zIndex: 20,
      textAlign: "center",
      //  transform: "translate(-50%, -50%)",
      //  display: "none"
    }

    styleElement(this.scoreScreen, scoreScreenStyle);
    this.scoreScreen.innerText = "SCORE : 0"

    this.container.appendChild(this.scoreScreen);


    // MAKING ROAD
    if (!this.road) {
      let roadStyle = {
        height: `${ROAD_HEIGHT}px`,
        width: `${CONTAINER_WIDTH}px`,
        position: "absolute",
        background: "lightgray",
      }

      this.road = document.createElement("div");
      styleElement(this.road, roadStyle);
      this.container.appendChild(this.road);
    }


    // Player's car

    let x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
    let y = this.container.clientHeight - CAR_HEIGHT;
    this.playerCar = new Car(x, y, CAR_WIDTH, CAR_HEIGHT, this.container).init();

    if (this.obstracleCars && this.obstracleCars.length <= 0) {
      for (let i = 0; i < INNITIAL_OBSTRACLES; i++) {
        let obcar = this.createObstracle(i + 1);
        this.obstracleCars.push(obcar);
      }
    }

    this.init();
  }

  init() {
    if (this.isGameStarted) {

      this.animate();
      this.animateObstracles();
    } else {
      this.startScreen.style.display = "block";
      // this.
    }

  }

  animate() {
    let timer = setInterval(() => {
      this.gameEnd = this.playerCar.detectGameOver(this.obstracleCars);
      if (this.gameEnd) {
        this.isGameStarted = false;
        clearInterval(timer);
        this.init();
        return;
      }

      if (this.roadPosition >= CONTAINER_HEIGHT * 8) {
        this.count++;
        this.roadPosition = -10;
      } else {
        this.roadPosition = this.roadPosition + this.speed;
        this.animateObstracles()
      }
      this.road.style.bottom = `-${this.roadPosition}px`;
    }, 10)
  }

  animateObstracles() {

    this.obstracleCars.forEach(car => {

      // Change position of car after bottom

      if (car.y > CONTAINER_HEIGHT) {

        car.y = getRandomNumberFromRange(-CONTAINER_HEIGHT, 0);
        let otherCar = this.obstracleCars.filter(allCar => allCar !== car);

        car.x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];

        for (let i = 0; i < otherCar.length; i++) {
          if (isCollision(car, otherCar[i])) {
            if (i % 2 === 0) {
              car.y = getRandomNumberFromRange(-CONTAINER_HEIGHT, 0) - CAR_HEIGHT - MIN_GAP_BEETWEEN_CAR;
            } else {
              car.y = getRandomNumberFromRange(-CONTAINER_HEIGHT, 0);
            }
            car.x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
            car.updatePosition();
          }
        }

        car.velocity = Math.random() + this.speed;

        this.score++;
        if (this.score % 10 === 0) {
          this.speed++;
          this.road.style.backgroundColor = getRandomColor()
        }
        this.scoreScreen.innerText = `SCORE : ${this.score}`

      } else {

        car.y = car.y + car.velocity;
        let otherCar = this.obstracleCars.filter(allCar => allCar !== car);

        for (let i = 0; i < otherCar.length; i++) {
          if (isCollision(car, otherCar[i])) {
            car.y = getRandomNumberFromRange(-CONTAINER_HEIGHT, -CAR_HEIGHT);
            car.x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
            car.updatePosition();
          }
        }
      }
      car.updatePosition();
    });
  }

  createObstracle(counter) {
    let x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
    let y = counter % 2 === 0 ?
      getRandomNumberFromRange(-CONTAINER_HEIGHT / 2, -CAR_HEIGHT) - MIN_GAP_BEETWEEN_CAR :
      getRandomNumberFromRange(-CONTAINER_HEIGHT / 2, -CAR_HEIGHT);

    let newCar = new Car(x, y, CAR_WIDTH, CAR_HEIGHT, this.container, true).init();
    if (this.obstracleCars.length > 1) {
      for (let j = 0; j < this.obstracleCars.length; j++) {
        if (isCollision(newCar, this.obstracleCars[j]) || (newCar.x === this.obstracleCars[j].x && newCar.y - this.obstracleCars[j].y < CAR_HEIGHT + MIN_GAP_BEETWEEN_CAR)) {
          newCar.y = +CAR_WIDTH + 5;
          newCar.x = PLAYER_CAR_POSITION[getRandomNumberFromRange(0, 2)];
          newCar.updatePosition();
          j--;
        }
      }
    };
    return newCar;
  }
}
