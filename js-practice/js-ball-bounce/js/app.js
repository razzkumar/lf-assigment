var BOX_HEIGHT = 600;
var BOX_WIDTH = 600;
var box = document.getElementById("box");
box.style.width = BOX_WIDTH + "px";
box.style.height = BOX_HEIGHT + "px";
box.style.position = "relative";
box.style.border = "1px solid gray"

function createBall() {
    var ball = document.createElement("div");
    ball.setAttribute("id", "ball")
    ball.style.backgroundColor = 'red';
    ball.style.width = 50 + "px";
    ball.style.height = 50 + "px";
    ball.style.borderRadius = 50 + "%";
    ball.style.top = 10 + "px";
    ball.style.position = "absolute";
    ball.style.left = 50 + "%";
    ball.style.marginLeft = "-25px";
    box.appendChild(ball);
}

createBall();

var isTop = true;
var y = 10;

function bounceBall() {
    var ball = document.getElementById("ball");
    if (isTop) {
        y++;
        ball.style.top = y + "px";
        checkCollision();
    } else {
        y--
        ball.style.top = y + "PX";
        checkCollision();
    }
}

setInterval(bounceBall, 1);

function checkCollision() {
    if (y > BOX_HEIGHT - 50) {
        isTop = false;
    } else if (y < 0 + 10) {
        isTop = true;
    }
}