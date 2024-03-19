let windowSize;
let cnv
let cols, rows;
let scale = 20;
let w = 2000;
let h = 600;
var z = [];
let fly = 0;
let rotation = 60;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    var x = (windowWidth-width) / 2;
    var y = (windowHeight-height) / 2;
    cnv.position(x, y);  
    cols = w / scale;
    rows = h / scale;
    for (let x = 0; x < cols; x++) {
        z[x] = [];
        for (let y = 0; y < rows; y++) {
            z[x][y] = 0;
        }
    }
}

function draw() {
  fly -= 0.3;
  let yoff = fly;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      z[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.3;
    }
    yoff += 0.3;
  }
  background(0);
  fill(250);
  translate(width/2, height/2);
  rotateX((rotation*PI)/180);
  translate(-w-100, -h);
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      stroke(150);
      vertex(x*scale, y*scale, z[x][y]);
      vertex(x*scale, (y+1)*scale, z[x][y+1]);
    }
    endShape();
  }
}

window.onresize = function() {
    resizeCanvas(windowWidth, windowHeight);
    cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
}