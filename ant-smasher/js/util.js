const COLORS = ['#2185C5', '#7ECEFD', '#FF7F66'];


const styleElement = (elem, style) => {

  let styleKey = Object.keys(style);

  if (styleKey && styleKey.length) {
    styleKey.forEach((key) => {
      elem.style[key] = style[key];
    })
  }

}

const getRandomNumberFromRange = (min, max) => {

  return Math.floor(Math.random() * (max - min + 1) + min)

}


const getRandomColor = () => {

  return COLORS[Math.floor(Math.random() * COLORS.length)]

}

// AABB Collision detection 
const isCollision = (rect1, rect2) => {
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
    return true;
  } else {
    return false;
  }
}


// ==================
// ELASTIC COLLISTION
// ==================

const rotate = (xVelocity, yVelocity, angle) => {

  const rotatedVelocities = {

    x: xVelocity * Math.cos(angle) - yVelocity * Math.sin(angle),
    y: xVelocity * Math.sin(angle) + yVelocity * Math.cos(angle)

  };
  return rotatedVelocities;
}

const resolveCollision = (ant, otherBox) => {

  const xVelocityDiff = ant.xVelocity - otherBox.xVelocity;
  const yVelocityDiff = ant.yVelocity - otherBox.yVelocity;

  const xDist = otherBox.x - ant.x;
  const yDist = otherBox.y - ant.y;

  // Prevent accidental overlap of boxs
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding boxs

    const angle = -Math.atan2(otherBox.y - ant.y, otherBox.x - ant.x);

    // Store mass in var for better readability in collision equation
    const m1 = ant.mass;
    const m2 = otherBox.mass;

    // Velocity before equation
    const u1 = rotate(ant.xVelocity, ant.yVelocity, angle);
    const u2 = rotate(otherBox.xVelocity, otherBox.yVelocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.x, v1.y, -angle);
    const vFinal2 = rotate(v2.x, v2.y, -angle);

    // Swap ant velocities for realistic bounce effect
    ant.xVelocity = vFinal1.x;
    ant.yVelocity = vFinal1.y;

    otherBox.xVelocity = vFinal2.x;
    otherBox.yVelocity = vFinal2.y;
  }
}
