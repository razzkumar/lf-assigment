const COLORS = ['#2185C5', '#7ECEFD', '#FF7F66'];


function styleElement(elem, style) {
  let styleKey = Object.keys(style);
  if (styleKey && styleKey.length) {
    styleKey.forEach(function (key) {
      elem.style[key] = style[key];
    })
  }
}

function getRandomNumberFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

// ==================
// ELASTIC COLLISTION
// ==================

function rotate(xVelocity, yVelocity, angle) {
  const rotatedVelocities = {
    x: xVelocity * Math.cos(angle) - yVelocity * Math.sin(angle),
    y: xVelocity * Math.sin(angle) + yVelocity * Math.cos(angle)
  };
  return rotatedVelocities;
}

function resolveCollision(box, otherBox) {
  const xVelocityDiff = box.xVelocity - otherBox.xVelocity;
  const yVelocityDiff = box.yVelocity - otherBox.yVelocity;

  const xDist = otherBox.x - box.x;
  const yDist = otherBox.y - box.y;

  // Prevent accidental overlap of boxs
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding boxs

    const angle = -Math.atan2(otherBox.y - box.y, otherBox.x - box.x);

    // Store mass in var for better readability in collision equation
    const m1 = box.mass;
    const m2 = otherBox.mass;

    // Velocity before equation
    const u1 = rotate(box.xVelocity, box.yVelocity, angle);
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

    // Swap box velocities for realistic bounce effect
    box.xVelocity = vFinal1.x;
    box.yVelocity = vFinal1.y;

    otherBox.xVelocity = vFinal2.x;
    otherBox.yVelocity = vFinal2.y;
  }
}
