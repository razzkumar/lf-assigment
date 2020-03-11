function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 */


// ===============================
// Below this I have to understand
// ===============================

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding balls' x and y velocities after running through
 * an elastic collision reaction equation
 */

function resolveCollision(ball, secondBall) {

  const xVelocityDiff = ball.velocity.x - secondBall.velocity.x;
  const yVelocityDiff = ball.velocity.y - secondBall.velocity.y;

  const xDist = secondBall.x - ball.x;
  const yDist = secondBall.y - ball.y;

  // Prevent accidental overlap of balls
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding balls
    const angle = -Math.atan2(secondBall.y - ball.y, secondBall.x - ball.x);

    // Store mass in var for better readability in collision equation
    const m1 = ball.mass;
    const m2 = secondBall.mass;

    // Velocity before equation
    const u1 = rotate(ball.velocity, angle);
    const u2 = rotate(secondBall.velocity, angle);

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
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap ball velocities for realistic bounce effect
    ball.velocity.x = vFinal1.x;
    ball.velocity.y = vFinal1.y;

    secondBall.velocity.x = vFinal2.x;
    secondBall.velocity.y = vFinal2.y;
  }
}
