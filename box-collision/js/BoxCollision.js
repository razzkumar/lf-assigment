function Box(parentElem, data) {

  // width = height box is square for now
  this.height = getRandomNumberFromRange(data.boxMinWidth, data.boxMinMaxtWidth);
  //  this.height = 30; 
  this.width = this.height;
  this.x = getRandomNumberFromRange(0, parentElem.clientWidth - this.height);
  this.x = getRandomNumberFromRange(0, parentElem.clientWidth - this.height);
  this.y = getRandomNumberFromRange(0, parentElem.clientHeight - this.height);
  this.color = getRandomColor();

  // To make negative diection
  this.xVelocity = (Math.random() - 0.5) * 5;
  this.yVelocity = (Math.random() - 0.5) * 5;
  this.box = null;
  this.mass = 1;

  let boxStyle = {
    height: `${this.height}px`,
    width: `${this.height}px`,
    position: "absolute",
    backgroundColor: `${this.color}`
  }

  this.init = () => {
    this.box = document.createElement('div');
    // styling box
    styleElement(this.box, boxStyle);

    parentElem && parentElem.appendChild(this.box);

    return this;
  }

  this.update = (boxes) => {
    this.draw();

    for (let i = 0; i < boxes.length; i++) {

      if (this === boxes[i]) continue; //skip comparing same box

      if (this.isCollision(this, boxes[i])) {
        resolveCollision(this, boxes[i]);
        this.box.style.backgroundColor = "white";
      }
    }

    if (this.x <= 0 || this.x >= parentElem.clientWidth - this.width) {
      this.xVelocity = -this.xVelocity
      this.box.style.backgroundColor = "white";
    }
    if (this.y <= 0 || this.y >= parentElem.clientHeight - this.height) {
      this.box.style.backgroundColor = "white";
      this.yVelocity = -this.yVelocity;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    return this;
  }

  this.draw = () => {

    styleElement(this.box, {
      ...boxStyle,
      left: `${this.x}px`,
      top: `${this.y}px`,
    })
    return this;
  }

  // AABB Collision detection 
  this.isCollision = (rect1, rect2) => {
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      return true;
    } else {
      return false
    }
  }


}
