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
ctx.font = "25px Comic Sans MS";
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

let sprite;

// Draw tile canvas
function startTile() {
  myTile.start();
  sprite = new component(90, 90, "skyblue", 100, 120);
}

let myTile = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    // Create target for myTile canvas to be drawn
    let target = document.getElementById("target");
    target.insertAdjacentElement("afterbegin", this.canvas);
    this.interval = setInterval(updateTiles, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myTile.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();  }
}

function updateTiles() {
  myTile.clear();
  sprite.angle = document.getElementById("rotate").value;
  sprite.update();
}