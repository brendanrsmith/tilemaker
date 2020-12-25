let bgColor;
let sprite;

// Draw tile canvas
function startTile() {
  myTile.start();
  bigTile.start();
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
    this.interval = setInterval(updateMyTile, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

let bigTile = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    // Create target for big canvas to be drawn
    let main = document.getElementById("bigTile");
    main.insertAdjacentElement("afterbegin", this.canvas);
    // here will be the tile_it button listener to update canvas
    
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

function updateMyTile() {
  myTile.clear();
  bgColor.color = document.getElementById("bgcol").value;
  sprite.angle = document.getElementById("rotate").value;
  sprite.width = document.getElementById("user_size").value;
  sprite.height = document.getElementById("user_size").value;
  sprite.color = document.getElementById("user_color").value;
  bgColor.update();
  sprite.update();
}

function updateBigTiles() {
  ctx = bigTile.context;
  let imgData = document.getElementById("target").getElementsByTagName("canvas")[0];
  let pattern = ctx.createPattern(imgData, "repeat");
  bigTile.clear();
  ctx.rect(0, 0, 600, 600);
  ctx.fillStyle = pattern;
  ctx.fill();
}

function save() {
  let imgData = document.getElementById("bigTile").getElementsByTagName("canvas")[0];
  let filename = document.getElementById("mosaic").value;
  if(!localStorage.getItem(filename)) {
    localStorage.setItem(filename, imgData);
  } else {
    window.alert("filname already in use");
  }
}


// tile_it button listener
document.getElementById("myBtn").addEventListener("click", updateBigTiles);

document.getElementById("save").addEventListener("click", save);

