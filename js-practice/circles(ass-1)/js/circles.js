var BOX_HEIGHT = 600;
var BOX_WIDTH = 600;

var box = document.getElementById("box");

box.style.width = BOX_WIDTH + "px";
box.style.height = BOX_HEIGHT + "px";
box.style.position = "relative";
box.style.border = "1px solid gray"

function createCircle(x, y) {
    var circle = document.createElement("div");
    circle.setAttribute("id", "circle")
    circle.style.backgroundColor = 'red';
    circle.style.width = 20 + "px";
    circle.style.height = 20 + "px";
    circle.style.borderRadius = 50 + "%";
    circle.style.top = y + "px";
    circle.style.position = "absolute";
    circle.style.left = x + "px";
    circle.style.marginLeft = "-25px";
    box.appendChild(circle);
    circle.addEventListener("click", function (e) {
        e.target.parentNode.removeChild(e.target);
    })
}

var points = [{
        x: 100,
        y: 200
    },
    {
        x: 40,
        y: 40
    },
    {
        x: 60,
        y: 40
    },
    {
        x: 60,
        y: 150
    },
    {
        x: 60,
        y: 190
    },
    {
        x: 180,
        y: 200
    },
    {
        x: 160,
        y: 10
    },
    {
        x: 200,
        y: 90
    },
    {
        x: 260,
        y: 70
    },
    {
        x: 360,
        y: 50
    },
];

points.forEach(function (p) {
    createCircle(p.x, p.y)
})