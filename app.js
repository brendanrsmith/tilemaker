let bgColor;
let sprite;

// Draw tile canvas
function startTile() {
  myTile.start();
  bigTile.start();
  bgColor = new component(200, 200, "white", 100, 100);
  sprite = new component(100, 100, "skyblue", 100, 100);
}

function gallery() {
  bigTile.start();
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
  // Get the image data out of the context. This means you are getting back one long fucking
  // array of integers width * height * 4 (R,G,B,Alpha). Each set of 4 integers represents
  // a pixel. So a bunch of white shit will look like [255, 255, 255, 255, 255, 255, ...]
  const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  // We then put this data into a blob. A blob is just a raw collection of bytes.
  const blob = new Blob([imageData.data]);
  // We make a  reader which can turn bytes into base64 which we do with readAsDataURL.
  // A base64 string turns bytes into ascii (https://en.wikipedia.org/wiki/Base64#Base64_table)
  // This turns all the 0101010101010 into aBcdkjs28102sd/s8f2... etc. Which is something
  // that we can store
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    // When the reader is done, we can get the result from the reader which is the string.
    // We then make a little object that we will store with JSON. We store the data,
    // as well as the width and height so we can rebuild the image later
    const data = {
      data: reader.result,
      width: canvas.width,
      height: canvas.height
    }
    // Then we turn this object into a string. It'll look something like `{"width":600,"height":600,"data":"aBcdkjs28102sd/s8f2...[forever]"}`;
    // Since it a sring, we can store it in local storage.
    const stringified = JSON.stringify(data);
    let filename = document.getElementById("mosaic").value;
    if (!localStorage.getItem(filename)) {
      localStorage.setItem(filename, stringified);
    } else {
      window.alert("filname already in use");
    }
  } 
}

// To get the data out we just do it all in reverse.
function retrieve(filename) {

  // Get the item from local storage
  const stringified = localStorage.getItem(filename);
  // Turn that JSON object back into a Javascript object. 
  const data = JSON.parse(stringified);

  // At this point data is now an object again that has the width, height, and data properties.
  // The data (on data) property is that long base 64 string, so we'll have fetch turn it
  // back into a blob.

  fetch(data.data)
    // Turn the result, whatever it is into a blob
    .then(res => res.blob())
    // Now its a blob, turn it back into a buffer (basically a just big array of numbers)
    .then((blob) => blob.arrayBuffer())
    .then((arrayBuffer) => {
      // Make the big list of numbers a more specific type of list of numbers that an image data instance
      // wnats. Speciically, a UInt8ClampedArray.
      const uIntArray = new Uint8ClampedArray(arrayBuffer);
      // Now we can reconstruct the image data object
      const newImageData = new ImageData(uIntArray, data.width, data.height);
      // Now at this point you can find an existing canvas and load this image data into, or make a new
      // canvas, or whatever the fuck you are going to do.
    })
}

function updateGallery(filename) {
  //button 'filename' will trigger updateGallery to draw that file to Gallery()
  this.filename = filename
  ctx = bigTile.context;
  let imgData = retrieve(filename);
  bigTile.clear();
  ctx.drawImage(imgData, 0, 0);
}


// tile_it button listener
document.getElementById("myBtn").addEventListener("click", updateBigTiles);

