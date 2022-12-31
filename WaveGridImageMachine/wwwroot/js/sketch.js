// get inputs from bin
let currentBin = "1";



// make image
let MODE = 1 // 1: Wireframe; 2: Cubes; 3: Spheres; 4: Toruses;

let FLUIDITY = 0.95 // 0 < x < 1 TIP: 1 means no loss in time
let SPEED = 0.1 // 0 < x < 1 WARNING! High values make the simulation unstable
const INTERACTION_STRENGTH = -50 // How muck force is given to a clicked point
const MIN_AMMOUNT = 50 // Ammount of points on the shorter side of the grid

let BaseColor = '#33B8FF';
let OtherColor = '#42f4eb';
BaseColor = "#" + Math.floor(Math.random()*16777215).toString(16);
OtherColor = "#" + Math.floor(Math.random()*16777215).toString(16);
let unmoved = 0;
let overmoved = 0;

//const ASPECT_RATIO = window.innerWidth / window.innerHeight *.8
const size = 1080;
const height = size, width = size;
const ASPECT_RATIO = height / width;

const GRID_HEIGHT = (ASPECT_RATIO > 1) ? MIN_AMMOUNT : Math.floor(MIN_AMMOUNT / ASPECT_RATIO)
const GRID_WIDTH = (ASPECT_RATIO > 1) ? Math.floor(MIN_AMMOUNT * ASPECT_RATIO) : MIN_AMMOUNT

const POINT_MARGIN = Math.min(width, height) / Math.min(GRID_HEIGHT, GRID_WIDTH);

const points = [];

let capture = true;
const capturer = CCapture({format:'png',name:`${currentBin}bin`});
let NUM_FRAMES = 110; //estimate, will go over if still movement
const TotalSupply = 5;
let shapeSize = 0;
let shapeSize2 = 0;
let colorMultiplier = 0;


let randA = Math.floor(Math.random() * 4) + 1;
MODE = randA;
let randB = Math.floor(Math.random() * (30 - 5) + 5);
//let randB = Math.floor(Math.random() * (30 - 5) + 5) * 6;
shapeSize = randB;
let randC = Math.floor(Math.random() * (100000 - 1000) + 5);
colorMultiplier = randC;
SPEED = genRand(.01, .2, 2);
//SPEED = 0.3;

function genRand(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

let img;
function preload(){
  //img = loadImage("./ArtCollections/12.png");
}

function setup () {
  createCanvas(width*1.4, height*1.4, WEBGL);

  for (let x = 0; x < GRID_WIDTH; x++) {
    points.push([]);
    for (let y = 0; y < GRID_HEIGHT; y++) {
      points[x].push(new Point());
    }
  }
}

function draw () {
  if (capture && frameCount==1) capturer.start();

  //update
  calculate();
  interact();
  step();

  //draw
  background('#000000');

  rotateX(PI * -0.20);
  translate(0, -height / 10);
  translate(-width / 2 + POINT_MARGIN / 2, -height / 2 + POINT_MARGIN / 2);

  //rotateZ(frameCount * -0.20);
  camera(0, 0, 0, 0, 0, 20 + sin(frameCount * 100) * 10, 0, 1, 0);

  switch (MODE) {
    case 1: drawWireframe();
      break;
    case 2: drawCubes();
      break;
    case 3: drawSpheres();
      break;
    case 4: drawToruses();
      break;
  }

  if (capture) {
    capturer.capture( canvas ); // if capture is 'true', save the frame
    if ((frameCount > 100 && unmoved > 10) || (frameCount > 100 && overmoved > 100)){ //stop and save after NUM_FRAMES
      console.log("finishing...");
      console.log(unmoved);
      capturer.stop(); 
      capturer.save(); 
      frameCount = 0;
      noLoop(); 

      var data = {
        key: 'value'
      };
      let content = JSON.stringify(data);
      var fileName = currentBin + '.json';
      let nextBin = '1';

      downloadToFile(content, fileName, 'text/json');
      //window.location.href = `http://localhost:8000/${nextBin}.json`;
    }
  }
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(a.href);
};

function interact () {
  if(frameCount < 100) {
    let on = true;
    var probabilitilized = new Probability({
      p: '20%',
      f: function () {
        on = true;
      }
    }, {
      p: '80%',
      f: function () {
        on = false;
      }
    });
    probabilitilized();

    if (on) {
      let randX = Math.random() * (innerWidth - MIN_AMMOUNT) + MIN_AMMOUNT;
      let randY = Math.random() * (innerHeight - MIN_AMMOUNT) + MIN_AMMOUNT;
      let x = Math.floor(randX / POINT_MARGIN)
      let y = Math.floor(randY / POINT_MARGIN)
      //x = randX;
      //y = randY;
      if (x >= 0 && y >= 0 && x < GRID_WIDTH && y < GRID_HEIGHT) {
        let interactionStrength;
        var probabilitilized = new Probability({
          p: '35%',
          f: function () {
            interactionStrength = -10;
          }
        }, {
          p: '25%',
          f: function () {
            interactionStrength = -20;
          }
        }, {
          p: '20%',
          f: function () {
            interactionStrength = -30;
          }
        }, {
          p: '15%',
          f: function () {
            interactionStrength = -40;
          }
        }, {
          p: '4%',
          f: function () {
            interactionStrength = -50;
          }
        }, {
          p: '1%',
          f: function () {
            interactionStrength = -200;
          }
        });
        probabilitilized();

        points[x][y].nextVal = interactionStrength;
        points[x][y].force = 0;
      }
    }
  }
}

function calculate () {
  let movement = 0;
  let outOfBounds = 0;
  points.forEach(function (col, x) {
    col.forEach(function (point, y) {
      let left = points[x - 1] ? points[x - 1][y].val : null
      let right = points[x + 1] ? points[x + 1][y].val : null
      let up = points[x][y - 1] ? points[x][y - 1].val : null
      let down = points[x][y + 1] ? points[x][y + 1].val : null

      let tl = !!(left && up) ? points[x - 1][y - 1].val : null
      let tr = !!(right && up) ? points[x + 1][y - 1].val : null
      let bl = !!(left && down) ? points[x - 1][y + 1].val : null
      let br = !!(right && down) ? points[x + 1][y + 1].val : null

      let adj = left + right + up + down + ((tl + tr + bl + br)*.29)
      if(adj < -0.001 || adj > 0.001) {
        movement++;
        if(adj < -300 || adj > 300) {
          outOfBounds++;
        }
      }
      console.log(adj);
      point.update(adj*.776)
    });
  });
  if (movement > 14) {
    unmoved = 0;
  } else {
    unmoved++;
  }
  if(outOfBounds > 100) {
    overmoved++;
  } else {
    overmoved = 0;
  }
}

function step () {
  points.forEach(function (col) {
    col.forEach(function (point) {
      point.step()
    })
  })
}

function drawCubes () {
  push();
  points.forEach(function(col, x) {
    col.forEach(function (point, y) {
      translate(0, 0, point.val);
      //texture(img);
      fill(incrementColor(OtherColor, points[x][y].val*colorMultiplier));
      //ambientLight(60, 60, 60);
      //pointLight(255, 255, 255, width, 0, 50);
      //specularMaterial(100);
      //translate(-25, 0, 0);
      //shininess(1);
      box(shapeSize)
      translate(0, 0, -point.val);
      translate(0, POINT_MARGIN);
    });
    translate(POINT_MARGIN, 0);
    translate(0, -POINT_MARGIN * col.length);
  });
  pop();
}

function drawSpheres () {
  push();
  points.forEach(function(col, x) {
    col.forEach(function (point, y) {
      translate(0, 0, point.val);
      //texture(img);
      fill(incrementColor(OtherColor, points[x][y].val*colorMultiplier));
      sphere(shapeSize);
      translate(0, 0, -point.val);
      translate(0, POINT_MARGIN);
    });
    translate(POINT_MARGIN, 0);
    translate(0, -POINT_MARGIN * col.length);
  });
  pop();
}

function drawToruses () {
  push();
  points.forEach(function(col, x) {
    col.forEach(function (point, y) {
      translate(0, 0, point.val);
      //texture(img);
      fill(incrementColor(OtherColor, points[x][y].val*colorMultiplier));
      torus(shapeSize, shapeSize2);
      translate(0, 0, -point.val);
      translate(0, POINT_MARGIN);
    });
    translate(POINT_MARGIN, 0);
    translate(0, -POINT_MARGIN * col.length);
  });
  pop();
}



function drawWireframe () {
  fill(BaseColor);
  for (let x = 0; x < GRID_WIDTH - 1; x++) {
    beginShape();
    for (let y = 0; y < GRID_HEIGHT - 1; y++) {
      let scl = 5;
      //if(points[x][y]?.color != undefined) {
      //  fill(points[x][y].color);
      //}
      fill(incrementColor(OtherColor, points[x][y].val*colorMultiplier));
      vertex(x * POINT_MARGIN, y * POINT_MARGIN, points[x][y].val * scl);
      vertex((x + 1) *  POINT_MARGIN, y * POINT_MARGIN, points[x + 1][y].val * scl);
      vertex(x * POINT_MARGIN, (y + 1) * POINT_MARGIN, points[x][y + 1].val * scl);
      vertex(x * POINT_MARGIN, y * POINT_MARGIN, points[x][y].val * scl);
      fill(OtherColor);
    }
    endShape();
  }
}

var incrementColor = function(color, step){
  var colorToInt = parseInt(color.substr(1), 16),
    nstep = parseInt(step);
  if(!isNaN(colorToInt) && !isNaN(nstep)){
    colorToInt += nstep;
    var ncolor = colorToInt.toString(16);
    try {
      ncolor = '#' + (new Array(7-ncolor.length).join(0)) + ncolor;
    } catch (e) {
      console.log(e);
      ncolor = '#FFFFFF';
    }
    if(/^#[0-9a-f]{6}$/i.test(ncolor)){
      return ncolor;
    }
  }
  return color;
};

class Point {
  constructor () {
    this.val = 0
    this.nextVal = 0
    this.force = 0
  }
  update (adj) {
    adj = adj ? adj : 0
    this.force -= this.val
    this.force += ((adj / 2) - this.val)
    this.nextVal += this.force * SPEED * (frameCount/100) * 2;
    this.force *= FLUIDITY
  }
  step () {
    this.val = this.nextVal
  }
}
