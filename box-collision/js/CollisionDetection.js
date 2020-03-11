function CollisionDetection(data) {

  this.parentElement = document.querySelector(`#${data.id}`);

  this.boxes = []

  let parentElementStyle = {
    height: "80vh",
    width: "98vw",
    position: "relative",
    margin: "5px auto",
    backgroundColor: "#123",
    border: "2px solid red"
  }

  styleElement(this.parentElement, parentElementStyle);

  this.init = function () {
    for (let b = 0; b < data.numberOfBox; b++) {
      let box = new Box(this.parentElement, data);
      box.init().draw()
      this.boxes.push(box);
    }
    this.animate();
    return this;
  }
  this.animate = function () {
    requestAnimationFrame(this.animate.bind(this))
    this.boxes.forEach(box => {
      box.update(this.boxes)
    })
    return this;
  }

}
