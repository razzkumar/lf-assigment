const COLORS = ['#2185C5', '#7ECEFD', '#FF7F66', '#123'];
const PLAYER_CAR_POSITION = [40, 180, 320];


const styleElement = (elem, style) => {
  let styleKey = Object.keys(style);
  if (styleKey && styleKey.length) {
    styleKey.forEach(function (key) {
      elem.style[key] = style[key];
    })
  }
}

const getRandomNumberFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

const isCollision = (rect1, rect2) => {
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    return true;
  } else {
    return false
  }
}
