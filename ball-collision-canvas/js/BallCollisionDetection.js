function BallCollisionDetection(data) {

  this.totalBalls = data.balls;
  this.radius = data.radius;
  this.canvas = document.querySelector('canvas');
  this.context = this.canvas.getContext('2d');
  this.balls = [];
  this.canvas.width = innerWidth;
  this.canvas.height = innerHeight;

  this.mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  }

  const colors = ['#2185C5', '#7ECEFD', '#FF7F66']

  // Event Listeners

  window.addEventListener('resize', () => {
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight
    this.init()
  })


  // Implementation
  this.init = function () {

    for (let i = 0; i < this.totalBalls; i++) {

      let x = randomIntFromRange(this.radius, this.canvas.width - this.radius);
      let y = randomIntFromRange(this.radius, this.canvas.height - this.radius);
      const color = randomColor(colors)
      if (i !== 0) {
        for (let j = 0; j < this.balls.length; j++) {
          if (distance(x, y, this.balls[j].x, this.balls[j].y) - this.radius * 2 < 0) {
            x = randomIntFromRange(this.radius, this.canvas.width - this.radius);
            y = randomIntFromRange(this.radius, this.canvas.height - this.radius);
            j = -1;
          }
        }
      }
      this.balls.push(new Ball(x, y, this.radius, color, this.context))
    }
    return this;
  }

  // Animation Loop
  this.animate = () => {
    requestAnimationFrame(this.animate)

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.balls.forEach(object => {
      object.update(this.balls)
    })
    return this;
  }
}
