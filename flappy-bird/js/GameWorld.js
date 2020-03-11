// All style (__Style var) are stored on style.js

class GameWorld {
  constructor(data) {

    this.id = data.id;
    this.speed = 2; // let say 
    this.container = document.querySelector(`#${this.id}`);

    this.startScreen = null;
    this.scoreScreen = null;
    this.map = null;

    this.mapPosition = 0;
    this.animateGameWorld = this.animateGameWorld.bind(this);
    this.score = 0;
    this.pipes = [];
    this.gap = 200;
    this.isGameStarted = false;
    this.gameEnd = false;
    this.highScore = 0;
    this.isHighScore = false;
  }

  // Create game world
  setup() {
    this.highScore = window.localStorage.getItem("highScore");

    styleElement(this.container, containerStyle);

    this.map = document.createElement("div");
    styleElement(this.map, mapStyle);

    this.container.appendChild(this.map);

    // ==CREATING START SCREEN==
    this.startScreen = document.createElement("div");
    styleElement(this.startScreen, startScreenStyle);
    this.startScreen.innerHTML = "<div>Get Ready to Fly</div>"

    let startBtn = document.createElement("button");
    styleElement(startBtn, btnStyle);
    startBtn.innerText = "Start";
    this.startScreen.appendChild(startBtn);

    this.container.appendChild(this.startScreen);


    // START EVENT
    startBtn.addEventListener("click", () => {
      this.isGameStarted = true;
      this.speed = 2;

      if (this.isHighScore) {
        window.localStorage.setItem("highScore", this.score);
        this.isHighScore = false;
      }

      //RESETING position after restart
      if (this.gameEnd) {
        this.bird.velocity = 0;
        this.bird.y = BIRD_HEIGHT;
        this.bird.updatePosition();
        this.resetPipes();
      }
      this.score = 0;
      this.gameEnd = false;

      this.init();
      this.startScreen.style.display = "none";
      this.scoreBoard.innerText = "SCORE : 0"
    })

    // CREATING SCORE BORD
    this.scoreScreen = document.createElement("div");

    styleElement(this.scoreScreen, scoreScreenStyle);
    this.scoreBoard = document.createElement("div");

    styleElement(this.scoreBoard, scoreBoardStyle);
    this.scoreBoard.innerText = "SCORE : 0"

    this.scoreScreen.appendChild(this.scoreBoard);
    this.totalScoreScreen = document.createElement("div");

    // styleElement(this.totalScoreScreen, totlaScoreStyle);
    this.totalScoreScreen.innerText = `HighScore : ${this.highScore}`

    this.scoreScreen.appendChild(this.totalScoreScreen);

    this.container.appendChild(this.scoreScreen);

    // Creating bird
    this.bird = new Bird(this.container);
    this.bird.init();

    for (let i = 1; i <= INNITIAL_OBSTRACLES; i++) {

      // Creating 4 pipes where 2 odd is top even are bottom

      if (i % 2 === 0) {
        // i starts from 1 but pipes index is starts from  0 ,if i is 2 then access previous index value ie of 0 and 2 
        let x2 = this.pipes[i - 2].x
        let y2 = this.pipes[i - 2].y + this.pipes[i - 2].height + this.gap;

        this.pipes.push(new Pipe(x2, y2, PIPE_WIDTH, CONTAINER_HEIGHT, this.container).init());
      } else {
        let x1 = this.pipes.length ? PIPE_WIDTH : CONTAINER_WIDTH / 2
        let y1 = getRandomNumberFromRange(-CONTAINER_HEIGHT + this.gap, -CONTAINER_HEIGHT / 2);
        this.pipes.push(new Pipe(-x1, y1, PIPE_WIDTH, CONTAINER_HEIGHT, this.container, true).init());
      }
    }
    this.init();
  }

  init() {
    if (this.isGameStarted) {
      this.animateGameWorld();
    } else {
      this.startScreen.style.display = "block";
    }
  }

  animateGameWorld() {
    let timer = setInterval(() => {

      this.gameEnd = this.bird.detectGameOver(this.pipes)

      if (this.gameEnd) {
        this.isGameStarted = false;
        clearInterval(timer);
        this.init();
        return;
      }

      if (this.mapPosition >= CONTAINER_WIDTH * 8) {
        this.mapPosition = -MIN_GAP;
      } else {

        this.mapPosition += MAP_POSITION_CHANGE_BY;

        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;

        this.bird.updatePosition();

        // Birds top collision check
        if (this.bird.y > CONTAINER_HEIGHT - BIRD_HEIGHT / 2) {
          this.gameEnd = true;
          clearInterval(timer);
          this.startScreen.style.display = "block";
        }
        // Birds bottom collision check
        if (this.bird.y < BIRD_HEIGHT / 2) {
          this.gameEnd = true;
          clearInterval(timer);
          this.startScreen.style.display = "block";
        }
        this.animatePipes();
      }
      this.map.style.left = `-${this.mapPosition}px`;
    }, ANIMATION_FRAME);
  }

  animatePipes() {

    this.pipes.forEach((pipe, i) => {
      if (pipe.x > CONTAINER_WIDTH) {

        pipe.x = 0;
        let pipeCount = i + 1;

        if (pipeCount % 2 === 0) {
          pipe.y = this.pipes[i - 1].y + this.pipes[i - 1].height + this.gap
        } else {
          pipe.y = getRandomNumberFromRange(-CONTAINER_HEIGHT + this.gap, -(MIN_PIPE_HEIGHT + MIN_GAP));
        }
        if (this.gap >= MIN_GAP) {
          this.gap--;
        }
        if (this.score % SPEED_INCREASE_INTERVAL === 0) {
          this.speed++;
        }
      } else {
        if (this.bird.x === pipe.x) {
          this.score += 0.5; //as two pipe pass at once 
          this.scoreBoard.innerText = `SCORE : ${this.score}`
          let oldHighScore = window.localStorage.getItem("highScore");

          if (this.score > parseInt(oldHighScore)) {
            this.isHighScore = true;
            window.localStorage.setItem("highScore", this.score);
            this.totalScoreScreen.innerText = `HighScore : ${this.score}`
          }

        }
        pipe.x++;
      }
      pipe.updatePosition();
    })
  }

  resetPipes() {
    this.pipes.forEach((pipe, i) => {
      let pipeCount = i + 1;
      if (pipeCount % 2 === 0) {
        pipe.x = pipeCount === 2 ? -PIPE_WIDTH : -CONTAINER_WIDTH / 2
      } else {
        pipe.x = pipeCount === 1 ? -PIPE_WIDTH : -CONTAINER_WIDTH / 2
      }
      pipe.updatePosition();
    })
  }
}