class GameWorld {

  constructor(data) {
    this.data = data;
    this.parentElement = document.querySelector(`#${data.id}`);
    this.ants = [];
  }



  init() {
    let parentElementStyle = {
      height: "80vh",
      width: "80vw",
      position: "relative",
      margin: "5px auto",
      backgroundColor: "#123",
      border: "2px solid red"
    };

    styleElement(this.parentElement, parentElementStyle);
    for (let b = 0; b < this.data.numberOfAnt; b++) {
      let ant = new Ant(this.parentElement, this.data);
      ant.init().draw();
      this.ants.push(ant);
    }
    this.animate();
    return this;
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ants.forEach(ant => {
      ant.update(this.ants);
    })
    return this;
  }
}
