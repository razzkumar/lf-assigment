// Objects
function Ball(x, y, radius, color, c) {
  this.x = x;
  this.y = y;

  this.velocity = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5
  }
  this.opacity = 0;
  this.radius = radius;
  this.color = color;
  this.mass = 1;
  this.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.fillStyle = this.color
    c.fill();
    c.restore();
    c.stroke();
    c.closePath()
  }

  this.update = (balls) => {
    this.draw()
    for (let i = 0; i < balls.length; i++) {
      if (this === balls[i]) continue; //skip collison on creation
      if (distance(this.x, this.y, balls[i].x, balls[i].y) - radius * 2 < 0) {
        resolveCollision(this, balls[i])
      }
    }

    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
