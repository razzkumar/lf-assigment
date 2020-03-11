function CarouselMaker(data) {
  if (screen.width <= parseInt(data.width)) {
    this.CONTENT_WIDTH = screen.width;
    this.CONTENT_HEIGHT = screen.width * 2 / 3;
  } else {
    this.CONTENT_WIDTH = data.width || 600;
    this.CONTENT_HEIGHT = data.height || 400;
  }
  let _this = this;
  window.addEventListener('resize', function () {
    if (screen.width <= data.width) {
      _this.CONTENT_WIDTH = screen.width;
      _this.CONTENT_HEIGHT = screen.width * 3 / 2;
    }
  })

  // this.slideWidth = 0;
  // this.index = 0;
  this.counter = 1;
  this.container = document.querySelector(`#${data.id}`);
  this.containerWrapper = this.container.parentElement;
  this.slideItems = Array.from(this.container.children);
  this.dotIndicators = [];

  // Styling this.container Wrapper 
  styleElement(this.containerWrapper, {
    width: `${this.CONTENT_WIDTH}px`,
    position: "relative",
    overflow: "hidden",
    clear: "both",
    margin: "10px auto",
    height: `${this.CONTENT_HEIGHT}px`,
  });

  styleElement(this.container, {
    clear: "both",
    float: "left",
    width: `${(this.slideItems.length+2)*this.CONTENT_WIDTH}px`,
    height: `${this.CONTENT_HEIGHT}px`,
    transform: 'translateX(' + (-this.CONTENT_WIDTH * this.counter) + 'px)'
  })

  this.init = function () {

    let slideItemStyle = {
      width: `${this.CONTENT_WIDTH}px`,
      height: `${this.CONTENT_HEIGHT}px`,
      float: "left"
    }

    this.slideItems.forEach(item => {
      styleElement(item, slideItemStyle)
    });

    //Adding first image  on last  for loopimg effect

    let firstFakeImg = this.slideItems[0].cloneNode();
    let lastFakeImg = this.slideItems[this.slideItems.length - 1].cloneNode(true);

    firstFakeImg.setAttribute("id", "firstItemClone")
    styleElement(firstFakeImg, slideItemStyle);
    this.container.appendChild(firstFakeImg);

    this.slideItems.push(firstFakeImg);

    lastFakeImg.setAttribute("id", "lastItemClone")
    styleElement(lastFakeImg, slideItemStyle)
    this.container.insertBefore(lastFakeImg, this.slideItems[0])
    this.slideItems.unshift(lastFakeImg);

    // this.totalWidth = (this.slideItems.length + 1) * this.CONTENT_WIDTH;

    let nextBtnStyle = {
      width: "50px",
      position: "absolute",
      top: `${this.CONTENT_HEIGHT / 2}px`,
      left: `${this.CONTENT_WIDTH-50}px`,
      zIndex: 5,
    };

    let prevBtnStyle = {
      ...nextBtnStyle,
      left: 0
    }

    let nextBtn = createAndAppendElement(this.containerWrapper, "button", nextBtnStyle)
    nextBtn.innerText = "Next";

    let prevBtn = createAndAppendElement(this.containerWrapper, "button", prevBtnStyle)
    prevBtn.innerText = "Prev";

    nextBtn.addEventListener("click", () => {

      if (this.counter > this.slideItems.length - 2) return;

      this.dotIndicators.forEach((indicator) => {
        indicator.style.backgroundColor = "white";
        indicator.style.transform = "scale(1,1)";
      })
      let index = this.counter >= this.slideItems.length - 2 ? 0 : this.counter;
      this.dotIndicators[index].style.backgroundColor = "green"
      this.dotIndicators[index].style.transform = "scale(2,2)"

      this.container.style.transition = "transform 0.5s ease-in-out";
      this.counter++;
      this.container.style.transform = 'translateX(' + (-this.CONTENT_WIDTH * this.counter) + 'px)';
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      this.timeOut = setTimeout(() => {
        nextBtn.click();
      }, data.delay)

    });

    prevBtn.addEventListener("click", () => {
      if (this.counter <= 0) return;

      this.dotIndicators.forEach((indicator) => {
        indicator.style.backgroundColor = "white";
        indicator.style.transform = "scale(1,1)";
      })

      let index = this.counter === 1 ? this.slideItems.length - 3 : this.counter - 2;
      this.dotIndicators[index].style.backgroundColor = "green"
      this.dotIndicators[index].style.transform = "scale(2,2)"

      this.container.style.transition = "transform 0.5s ease-in-out";
      this.counter--;
      this.container.style.transform = 'translateX(' + (-this.CONTENT_WIDTH * this.counter) + 'px)';
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      this.timeOut = setTimeout(() => {
        prevBtn.click();
      }, data.delay)
    });

    this.container.addEventListener("transitionend", () => {
      if (this.slideItems[this.counter].id === "lastItemClone") {

        this.container.style.transition = "none";
        this.counter = this.slideItems.length - 2;
        this.container.style.transform = 'translateX(' + (-this.CONTENT_WIDTH * this.counter) + 'px)';

      }

      if (this.slideItems[this.counter].id === "firstItemClone") {

        this.container.style.transition = "none";
        this.counter = this.slideItems.length - this.counter;
        this.container.style.transform = 'translateX(' + (-this.CONTENT_WIDTH * this.counter) + 'px)';

      }
    })

    // CREATE DOT WRAPPER
    let dotWrapperStyle = {
      clear: "both",
      position: "absolute",
      bottom: "20px",
      left: `${this.CONTENT_WIDTH/2}px`,
      marginLeft: `-${(this.slideItems.length*10)/2}px`
    }

    let dotWrapper = createAndAppendElement(this.containerWrapper, "div", dotWrapperStyle);

    for (let i = 0; i < this.slideItems.length - 2; i++) {
      let dotIndicatorstyle = {
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        float: "left",
        margin: "5px",
        pointer: "cursor",
        backgroundColor: i === 0 ? "green" : "white",
        transform: i === 0 ? "scale(2,2)" : "scale(1,1)"
      }
      let dot = createAndAppendElement(dotWrapper, "div", dotIndicatorstyle);
      dot.addEventListener("click", () => {

        this.container.style.transition = "transform 0.5s ease-in-out";
        this.container.style.transform = 'translateX(' + (-this.CONTENT_WIDTH * (i + 1)) + 'px)';
        this.counter = i + 1;

        this.dotIndicators.forEach((indicator) => {
          indicator.style.backgroundColor = "white";
          indicator.style.transform = "scale(1,1)";
        })
        this.dotIndicators[i].style.backgroundColor = "green"
        this.dotIndicators[i].style.transform = "scale(2,2)"

        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          nextBtn.click();
        }, data.delay + 1000 || 2000)
      })
      this.dotIndicators.push(dot);

    }

    this.timeOut = setTimeout(() => {
      if (data.dir === "left") {
        prevBtn.click();
      } else {
        nextBtn.click();
      }
    }, data.delay || 1000);

  }
}
