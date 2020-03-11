class Pipe {
  constructor(x, y, width, height, parentElem, isTop) {

    this.pipes = null;
    this.parentElem = parentElem;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.pipesStyle = {
      height: `${this.height}px`,
      width: `${this.width}px`,
      position: "absolute",
      background: `url('./assets/pipe.png') no-repeat`,
      transform: `${isTop?"rotate(180deg)":"rotate(0deg)"}`,
      right: `${this.x}px`,
      backgroundSize: "100% 100%",
      top: `${this.y}px`,
      zIndex: "10"
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  init() {
    this.pipes = document.createElement('div');
    styleElement(this.pipes, this.pipesStyle);
    this.parentElem && this.parentElem.appendChild(this.pipes);
    return this;
  };

  updatePosition() {
    styleElement(this.pipes, {
      right: `${this.x}px`,
      top: `${this.y}px`,
    })
    return this;
  };
}
