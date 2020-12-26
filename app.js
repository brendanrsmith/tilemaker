let bgColor;
let sprite;
let storage = window.localStorage;

// Draw tile canvas
function startTile() {
  myTile.start();
  bigTile.start();
  bgColor = new component(200, 200, "white", 100, 100);
  sprite = new component(100, 100, "skyblue", 100, 100);
}

function gallery() {
  bigTile.start();
  let target = document.getElementById("list_files");
  for (let i = storage.length - 1; i >= 0; i--) {
    let filename = storage.key(i);
    let node = document.createElement("button");                 
    node.innerText = filename;
    node.addEventListener("click", () => updateGallery(filename));
    node.setAttribute("class", "galleryButton");                            
    document.getElementById("list_files").appendChild(node);
    }   
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
  const canvas = document.getElementById("bigTile").getElementsByTagName("canvas")[0];
  const canvasContext = canvas.getContext("2d");
  // Get the image data out of the context. 
  const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  // Put this data into a blob.
  const blob = new Blob([imageData.data]);
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    const data = {
      data: reader.result,
      width: canvas.width,
      height: canvas.height
    }
    const stringified = JSON.stringify(data);
    let filename = document.getElementById("mosaic").value;
    if (!filename) {
      window.alert("please enter a filename");
    } else if (!localStorage.getItem(filename)) {
      localStorage.setItem(filename, stringified);
    } else {
      window.alert("filname already in use");
    }
  } 
}

function retrieve(filename, callback) {

  // Get the item from local storage
  const stringified = localStorage.getItem(filename);
  // Turn that JSON object back into a Javascript object. 
  const data = JSON.parse(stringified);

  fetch(data.data)
    // Turn the result into a blob
    .then(res => res.blob())
    // Now its a blob, turn it back into a buffer
    .then((blob) => blob.arrayBuffer())
    .then((arrayBuffer) => {
      const uIntArray = new Uint8ClampedArray(arrayBuffer);
      // Now we can reconstruct the image data object
      const newImageData = new ImageData(uIntArray, data.width, data.height);
      callback(newImageData);
    })
}


function updateGallery(filename) {
  // button 'filename' will trigger updateGallery to draw that file to Gallery()
  ctx = bigTile.context;
  retrieve(filename, (imageData) => {
      bigTile.clear();
      ctx.putImageData(imageData, 0, 0)
      console.log(filename);
  });
}


// tile_it button listener
document.getElementById("myBtn").addEventListener("click", updateBigTiles);

