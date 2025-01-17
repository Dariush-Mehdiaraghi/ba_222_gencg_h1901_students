let center;
let vehicles =[];
let terminators = [];
let video;
let extraCanvas;
let poseNet;
let handHeight;

let isInRange = false;
function randPointInR(radius, pointX, pointY){
  a = random() * 2 * PI;
  r = radius * sqrt(random());
  let point = createVector(r * cos(a), r * sin(a)).add(pointX, pointY);
  return point;
}
function randPointInRing(radius1, radius2, pointX, pointY){
  theta = random(0,360);
  dist = sqrt(random()*(sq(radius1)- sq(radius2))+sq(radius2));
  x =  dist * cos(theta);
  y =  dist * sin(theta);
  let point = createVector(x,y).add(pointX, pointY);
  return point;
}


function setup() {

  /*mic = new p5.AudioIn();
  mic.start(); */
  /*
    var density = displayDensity();
      pixelDensity(density);
      createCanvas(6480 / density, 3840 / density);
      // Capture settings
      fps = 30;
      capturer = new CCapture({ format: 'png', framerate: fps });
      frameRate(fps);
      capturer.start();
      startTime = millis(); //*/



  canv = createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(width, height);
  extraCanvas.clear();
  center = createVector(width/2, height/2);
  background(0);
  vehicles = [];
for(i = 0; i<1; i++){
  let target = randPointInR(200, center.x, center.y);
  let toAdd = new Vehicle(center.x, 0, target.x, target.y)
  toAdd.velocity = createVector(1,4)
  vehicles.push(toAdd)

  }
  noStroke();
}

function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}
function keyPressed(){
  if (key == 's' || key == 'S') saveThumb(650, 350);
  if (keyCode === 32){ setup();}// 32 = Space
  if (keyCode === 38){
    let actLength = vehicles.length;
    for(i = 0; i<actLength; i++){
      let target = randPointInR(200, center.x, center.y);
      let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y, target.x, target.y)
      //toAdd.velocity = vehicles[i].velocity.mult(random(-5,5));
      vehicles.push(toAdd);
    }
  } ; // 38 = ArrowUp
  if (keyCode === 40){for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].fear +=10;
  }} ; // 40 = ArrowDown
}
function draw() {
/*  console.log(mic.getLevel()); //Explosion with sound
  if (mic.getLevel()>0.5){
    let actLength = vehicles.length;
    for(i = 0; i<actLength; i++){
    let target = randPointInR(200, center.x, center.y);
    let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y, target.x, target.y)
    //toAdd.velocity = vehicles[i].velocity.mult(random(-5,5));
    vehicles.push(toAdd)
  }
}*/
/*
var duration = 25;
var t = (millis() - startTime)/1000;

// if we have passed t=duration then end the animation.
if (t > duration) {
noLoop();
console.log('finished recording.');
capturer.stop();
capturer.save();
return;
} */

if (frameCount % 80 == 0 && vehicles.length<300) {


let actLength = vehicles.length;
for(i = 0; i<actLength; i++){
  let target = randPointInR(200, center.x, center.y);
  let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y, target.x, target.y)
  //toAdd.velocity = vehicles[i].velocity.mult(random(-5,5));
  vehicles.push(toAdd);
}
}

  background(0);


  image(extraCanvas,0,0);
  for (var i = 0; i < vehicles.length; i++) {
      vehic = vehicles[i]
    vehic.flee(vehicles);
  //  vehic.seek(vehicles);
    vehic.update();
    vehic.show();
  }
  /*  if(vehic.found){
      nextTarg = randPointInRing(50,200,center.x,center.y);
      terminators.push((new Vehicle(vehic.position.x, vehic.position.y, nextTarg.x, nextTarg.y, vehic.velocity.x, vehic.velocity.y)));
    }
  }


for (var i = terminators.length -1; i >= 0; i--) {
  if(terminators[i].arrived){terminators.splice(1, i)}
}*/
/*
for (var i = 0; i < terminators.length; i++) {
  terminator = terminators[i]
  terminator.flee(vehicles);
  terminator.terminator = true;
  terminator.update();
  terminator.show();
  }



if (terminators.length>50) {
  for (var i = terminators.length - 50; i < terminators.length; i++) {
  let terminator =  terminators[i]
    if(terminator.found){
      nextTar = randPointInR(100, terminator.position.x, terminator.position.y);
      let abweichung = random(-3,3);
      terminators.push((new Vehicle()));
    }
  }
  }
  if (terminators.length>150) {
    for (var i = 0; i < 2; i++) {
      terminators.splice(i, 1)}
}
*/
// end drawing code
/*
// handle saving the frame
console.log('capturing frame');
capturer.capture(document.getElementById('defaultCanvas0'));*/
}
