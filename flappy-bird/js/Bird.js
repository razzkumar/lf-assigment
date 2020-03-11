class Bird {

  constructor(parentElem) {
    this.bird = null;
    this.parentElem = parentElem;
    this.updatePosition = this.updatePosition.bind(this);
    this.detectGameOver = this.detectGameOver.bind(this);
    this.y = BIRD_HEIGHT;
    this.x = CONTAINER_WIDTH / 2;
    this.gravity = 0.1;
    this.upForce = 10;
    this.velocity = 0;
    this.height = BIRD_HEIGHT
    this.width = BIRD_WIDTH

    this.birdStyle = {
      height: `${this.height}px`,
      width: `${this.width}px`,
      position: "absolute",
      backgroundImage: `url("./assets/bird.png")`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repate",
      left: `${this.x}px`,
      top: `${this.y}px`,
      transform: "translate(-50%, -50%)",
      zIndex: "10"
    };
  }

  init() {

    window.addEventListener("keyup", this.handlePlay.bind(this));

    this.bird = document.createElement('div');
    styleElement(this.bird, this.birdStyle);
    this.parentElem && this.parentElem.appendChild(this.bird);
    return this;

  }
  // Kill a bird after restart
  kill() {
    this.parentElem && this.parentElem.removeChild(this.bird);
    return this;
  }

  updatePosition() {
    styleElement(this.bird, {
      top: `${this.y}px`,
    })
    return this;
  }

  handlePlay(e) {
    if (e.code === "Space") {
      this.y += -this.upForce;
      this.velocity = -3
    }
    this.updatePosition();
  }

  detectGameOver(pipes) {
    for (let i = 0; i < pipes.length; i++) {
      // isCollision is in utils.js
      if (isCollision(this, pipes[i])) {
        return true;
      }
    }
  }
}