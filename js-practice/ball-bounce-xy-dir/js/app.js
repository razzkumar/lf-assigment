var BOX_HEIGHT = 600;
var BOX_WIDTH = 600;

var box = document.getElementById("box");
box.style.width = BOX_WIDTH + "px";
box.style.height = BOX_HEIGHT + "px";
box.style.position = "relative";
box.style.border = "1px solid gray"

function createBall(x, y) {
    var ball = document.createElement("div");
    ball.setAttribute("id", "ball")
    ball.style.backgroundColor = 'red';
    ball.style.width = 50 + "px";
    ball.style.height = 50 + "px";
    ball.style.borderRadius = 50 + "%";
    ball.style.top = 10 + "px";
    ball.style.left = 10 + "px";
    ball.style.position = "absolute";
    ball.style.marginLeft = "-25px";
    box.appendChild(ball);
}

createBall();

var y = 300;
var x = 50;
var isTop = true;
var isLeft = true;

function bounceBall() {
    var ball = document.getElementById("ball");
    if (isTop && isLeft) {
        y++;
        x++;
        ball.style.top = y + "px";
        ball.style.left = x + "px";
        checkCollision();
    } else if (isTop && !isLeft) {
        y++;
        x--;
        ball.style.top = y + "px";
        ball.style.left = x + "px";
        checkCollision();
    } else if (!isTop && isLeft) {
        y--;
        x++;
        ball.style.top = y + "px";
        ball.style.left = x + "px";
        checkCollision();
    } else {
        y--;
        x--;
        ball.style.top = y + "px";
        ball.style.left = x + "px";
        checkCollision();
    }
}

// bounceBall();
setInterval(bounceBall, 1);

function checkCollision() {
    if (y > BOX_HEIGHT - 50) {
        isTop = false;
    } else if (y < 0) {
        isTop = true;
    }

    if (x > BOX_WIDTH - 20) {
        isLeft = false;
    } else if (x < 20) {
        isLeft = true;
    }
}