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

const isCollision = (bird, obstacle) => {
  if (bird.x < obstacle.x + obstacle.width &&
    bird.x + bird.width > obstacle.x &&
    bird.y < obstacle.y + obstacle.height &&
    bird.y + bird.height > obstacle.y) {
    return true;
  } else {
    return false
  }
}
