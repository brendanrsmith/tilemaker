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
ctx.moveTo(75, 20);
ctx.font = "30px Arial";
ctx.strokeText("Hello World", 76, 22);
ctx.lineTo(200, 100);
ctx.stroke()

ctx.globalAlpha = 0.2;
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 75, 50);
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 75, 50);
ctx.fillStyle = "green";
ctx.fillRect(80, 80, 75, 50);