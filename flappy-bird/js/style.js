let containerStyle = {
  overflow: "hidden",
  margin: "50px auto",
  height: `${CONTAINER_HEIGHT}px`,
  width: `${CONTAINER_WIDTH}px`,
  position: "relative",
  border: "2px solid red",
}

let mapStyle = {
  width: `${MAP_WIDTH}px`,
  height: `${CONTAINER_HEIGHT}px`,
  position: "absolute",
  left: "-120px",
  background: `url("./assets/background.png") repeat-x 100% 100%`,
}

let startScreenStyle = {
  position: "absolute",
  left: "50%",
  top: "40%",
  color: "#fff",
  zIndex: 20,
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  fontSize: "25px",
}

let scoreScreenStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  margin: "20px",
  padding: "10px",
  color: "#fff",
  zIndex: 20,
  textAlign: "center"
}
let scoreBoardStyle = {
  color: "#fff",
  margin: "10px",
  textAlign: "center"
}
let totalScoreStyle = {
  ...scoreBoardStyle
}

let btnStyle = {
  backgroundColor: getRandomColor(),
  color: "white",
  padding: "5px 32px",
  textAlign: "center",
  marginTop: "15px",
  textDecoration: "none",
  fontSize: "16px",
}