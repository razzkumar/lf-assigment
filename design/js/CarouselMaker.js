function CarouselMaker(data) {

    if (screen.width <= parseInt(data.maxWidth)) {
        this.sliderWidth = screen.width;
        this.sliderHeight = Math.floor(screen.width / 1.755);
    } else {
        this.sliderWidth = data.maxWidth || 600;
        this.sliderHeight = Math.floor(data.maxWidth / 1.755);
    }

    this.counter = 1;
    this.container = document.querySelector(`#${data.id}`);
    this.containerWrapper = this.container.parentElement;

    this.slideItems = Array.from(this.container.children);
    this.dotIndicators = [];

    window.addEventListener('resize', e => {
        if (screen.width <= data.maxWidth) {
            this.sliderWidth = screen.width;
            this.sliderHeight = Math.floor(screen.width / 1.755);
            this.styleContainer();
        } else {
            this.sliderWidth = data.maxWidth || 600;
            this.sliderHeight = Math.floor(data.maxWidth / 1.755);
            this.styleContainer();
        }
    })

    // Styling this.container Wrapper 
    this.styleContainer = () => {
        styleElement(this.containerWrapper, {
            width: `${this.sliderWidth}px`,
            position: "relative",
            overflow: "hidden",
            clear: "both",
            margin: "10px auto",
            height: `${this.sliderHeight}px`,
        });

        styleElement(this.container, {
            clear: "both",
            float: "left",
            width: `${(this.slideItems.length+2)*this.sliderWidth}px`,
            height: `${this.sliderHeight}px`,
            transform: 'translateX(' + (-this.sliderWidth * this.counter) + 'px)'
        })
        let slideItemStyle = {
            width: `${this.sliderWidth}px`,
            height: `${this.sliderHeight}px`,
            float: "left"
        }

        this.slideItems.forEach(item => {
            styleElement(item, slideItemStyle)
        });

    }
    this.init = () => {

        this.styleContainer();

        //Adding first image  on last  for loopimg effect
        let slideItemStyle = {
            width: `${this.sliderWidth}px`,
            height: `${this.sliderHeight}px`,
            float: "left"
        }

        let firstFakeImg = this.slideItems[0].cloneNode();
        let lastFakeImg = this.slideItems[this.slideItems.length - 1].cloneNode(true);

        firstFakeImg.setAttribute("id", "firstItemClone");

        styleElement(firstFakeImg, slideItemStyle);

        this.container.appendChild(firstFakeImg);

        this.slideItems.push(firstFakeImg);
        lastFakeImg.setAttribute("id", "lastItemClone")
        styleElement(lastFakeImg, slideItemStyle)
        this.container.insertBefore(lastFakeImg, this.slideItems[0])
        this.slideItems.unshift(lastFakeImg);

        let nextBtnStyle = {
            background: "none",
            outline: "none",
            border: "none",
            width: "50px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 0,
            zIndex: 5,
            width: "6.52173%",
            height: "11.44565%",
            background: 'url("img/icon/next.png") no-repeat 100%',
            backgroundSize: "100% 100%"
        };

        let prevBtnStyle = {
            background: "none",
            outline: "none",
            border: "none",
            width: "50px",
            position: "absolute",
            transform: "translateY(-50%)",
            top: "50%",
            zIndex: 5,
            width: "6.52173%",
            height: "11.44565%",
            left: 0,
            background: 'url("img/icon/prev.png") no-repeat',
            backgroundSize: "100% 100%"
        }

        let nextBtn = createAndAppendElement(this.containerWrapper, "button", nextBtnStyle)
        // nextBtn.innerText = "Next";

        let prevBtn = createAndAppendElement(this.containerWrapper, "button", prevBtnStyle)
        // prevBtn.innerText = "Prev";

        nextBtn.addEventListener("click", () => {

            // value of counter is greater then total number of slider do nothing

            if (this.counter > this.slideItems.length - 2) return;

            this.dotIndicators.forEach((indicator) => {
                indicator.style.backgroundColor = "white";
                indicator.style.transform = "scale(1,1)";
            });

            let index = this.counter >= this.slideItems.length - 2 ? 0 : this.counter;
            this.dotIndicators[index].style.backgroundColor = "#b39edc"
            this.dotIndicators[index].style.transform = "scale(2,2)"

            this.container.style.transition = "transform 0.5s ease-in-out";
            this.counter++;
            this.container.style.transform = 'translateX(' + (-this.sliderWidth * this.counter) + 'px)';
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
            this.dotIndicators[index].style.backgroundColor = "#b39edc"
            this.dotIndicators[index].style.transform = "scale(2,2)"

            this.container.style.transition = "transform 0.5s ease-in-out";
            this.counter--;
            this.container.style.transform = 'translateX(' + (-this.sliderWidth * this.counter) + 'px)';
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
                this.container.style.transform = 'translateX(' + (-this.sliderWidth * this.counter) + 'px)';
            }

            if (this.slideItems[this.counter].id === "firstItemClone") {
                this.container.style.transition = "none";
                this.counter = this.slideItems.length - this.counter;
                this.container.style.transform = 'translateX(' + (-this.sliderWidth * this.counter) + 'px)';
            }
        })

        // CREATE DOT WRAPPER
        let dotWrapperStyle = {
            clear: "both",
            position: "absolute",
            bottom: "5%",
            left: "50%",
            padding: "0 10px",
            transform: "translateX(-50%)",
        }

        let dotWrapper = createAndAppendElement(this.containerWrapper, "div", dotWrapperStyle);

        for (let i = 0; i < this.slideItems.length - 2; i++) {
            let dotIndicatorstyle = {
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                float: "left",
                margin: "5px",
                pointer: "cursor",
                backgroundColor: i === 0 ? "#b39edc" : "white",
                transform: i === 0 ? "scale(2,2)" : "scale(1,1)"
            }
            let dot = createAndAppendElement(dotWrapper, "div", dotIndicatorstyle);
            dot.addEventListener("click", () => {

                this.container.style.transition = "transform 0.5s ease-in-out";
                this.container.style.transform = 'translateX(' + (-this.sliderWidth * (i + 1)) + 'px)';
                this.counter = i + 1;

                this.dotIndicators.forEach((indicator) => {
                    indicator.style.backgroundColor = "white";
                    indicator.style.transform = "scale(1,1)";
                });

                this.dotIndicators[i].style.backgroundColor = "#b39edc"
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

// ------------------
//--------utils------
// ------------------
function styleElement(elem, style) {
    let styleKey = Object.keys(style);
    if (styleKey && styleKey.length) {
        styleKey.forEach(key => {
            elem.style[key] = style[key]
        })
    }
}

function createAndAppendElement(parentElem, elementType, style) {
    let elem = document.createElement(elementType);
    // styling element
    styleElement(elem, style);
    parentElem.appendChild(elem);
    return elem;

}