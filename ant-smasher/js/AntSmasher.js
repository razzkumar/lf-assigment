class Ant {

  constructor(parentElem, data) {
    this.data = data;
    this.parentElem = parentElem;
    // width = height ant is square for now
    this.height = getRandomNumberFromRange(this.data.boxMinWidth, this.data.boxMinMaxtWidth);
    this.width = this.height;

    this.x = getRandomNumberFromRange(0, this.parentElem.clientWidth - this.height);
    this.x = getRandomNumberFromRange(0, this.parentElem.clientWidth - this.height);
    this.y = getRandomNumberFromRange(0, this.parentElem.clientHeight - this.height);
    this.color = getRandomColor();

    // To make negative diection
    this.xVelocity = (Math.random() - 0.5) * 2;
    this.yVelocity = (Math.random() - 0.5) * 2;
    this.ant = null;
    this.mass = 1;
    this.isKilled = false;

    this.antStyle = {
      height: `${this.height}px`,
      width: `${this.height}px`,
      position: "absolute",
      backgroundImage: "url('../img/animated-ant-right.gif')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "100% 100%",
    };
  }


  // transform: rotate(-50 deg);

  init() {
    this.ant = document.createElement('div');
    // styling ant
    styleElement(this.ant, this.antStyle);
    this.ant.addEventListener("click", deadAntHandler.bind(this));
    this.parentElem && this.parentElem.appendChild(this.ant);
    return this;
  }


  update(ants) {
    // Change ant image with direction
    if (this.xVelocity > 0 && this.yVelocity < 0 && !this.isKilled) {
      this.antStyle.transform = "rotateY(-180deg)";
    }

    this.draw();

    for (let i = 0; i < ants.length; i++) {

      if (this === ants[i]) continue; //skip comparing same ant

      if (isCollision(this, ants[i]) && !this.isKilled) {
        resolveCollision(this, ants[i]);
      }
    }

    if ((this.x <= 0 || this.x >= this.parentElem.clientWidth - this.width) && !this.isKilled) {
      this.xVelocity = -this.xVelocity
    }
    if ((this.y <= 0 || this.y >= this.parentElem.clientHeight - this.height) && !this.isKilled) {
      this.yVelocity = -this.yVelocity;
    }

    if (!this.isKilled) {
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    }
    return this;
  }

  // Create ant in DOM
  draw() {
    styleElement(this.ant, {
      ...this.antStyle,
      left: `${this.x}px`,
      top: `${this.y}px`,
    })
    return this;
  }

}


function deadAntHandler() {
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.isKilled = true;
  this.antStyle = {
    ...this.antStyle,
    backgroundImage: "url('../img/dead ant.png')",
  };
  this.draw();
  if (this.timeOut) {
    clearTimeout(this.timeOut);
  }
  this.timeOut = setTimeout(() => {
    this.parentElem.removeChild(this.ant);
  }, 1500);

}
