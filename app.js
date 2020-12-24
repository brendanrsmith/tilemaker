const box = document.getElementById("box");
box.addEventListener("click", () => {
  if (box.style.backgroundColor != "blue") {
      box.style.backgroundColor = "blue";
  } else {
    box.style.backgroundColor = "orange";
  }
});

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "coral";
ctx.textAlign = "center";
ctx.fillText("Hello World", canvas.width/2, canvas.height/2);