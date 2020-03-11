var COLORS = ["red", "green", "blue"];

var box = document.createElement("div");
var BOX_HEIGHT = 400;
var BOX_WIDTH = 400;
box.style.width = BOX_WIDTH + "px";
box.style.height = BOX_HEIGHT + "px";
box.style.backgroundColor = COLORS[0];

box.addEventListener("click", changeColor);
document.body.appendChild(box);


var index = 0;

function changeColor() {
    if (index >= COLORS.length - 1) {
        index = 0;
    } else {
        index++;
    }
    box.style.backgroundColor = COLORS[index];
}