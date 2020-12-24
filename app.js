let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = "25px Comic Sans MS";
ctx.fillStyle = "coral";
ctx.textAlign = "center";
ctx.fillText("placeholder", canvas.width/2, canvas.height/2);
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

let bgColor;
let sprite;

// Draw tile canvas
function startTile() {
  myTile.start();
  bgColor = new component(200, 200, "white", 100, 100);
  sprite = new component(100, 100, "skyblue", 100, 100);
}

let myTile = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 200;
    this.canvas.height = 200;
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
  this.color = color;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myTile.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();  }
}

function updateTiles() {
  myTile.clear();
  bgColor = document.getElementById("bg_color").value;
  sprite.angle = document.getElementById("rotate").value;
  sprite.width = document.getElementById("user_size").value;
  sprite.height = document.getElementById("user_size").value;
  sprite.color = document.getElementById("user_color").value;
  sprite.update();
}