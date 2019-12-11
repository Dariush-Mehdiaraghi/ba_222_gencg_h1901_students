let center;
let vehicles =[];
let terminators = [];
let extraCanvas;
let app;
let graphics;
let inR = 400;
let ouR = 500;


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
  createCanvas(windowWidth,windowHeight);
//  /*
  var density = displayDensity();
    pixelDensity(density);
    createCanvas(6480 / density, 3840 / density);
    // Capture settings
    fps = 60;
    capturer = new CCapture({ format: 'png', framerate: fps });
    frameRate(fps);
    capturer.start();
    startTime = millis(); //*/

  p5.disableFriendlyErrors = true;
  //center = createVector(0, 0); //center in GL
  center = createVector(width/2, height/2); //center in Canvas

  noStroke();

  vehicles = [];
  for(i = 0; i<12; i++){
    let target = randPointInR(200, center.x, center.y);
    let toAdd = new Vehicle(center.x, center.y, target.x, target.y)
    toAdd.velocity = createVector(sin(i),cos(i));

    vehicles.push(toAdd)
  }
  background(0);
}

function keyPressed(){
  if (keyCode === 32){ setup();}// 32 = Space
  if (keyCode === 38){


}// 38 = ArrowUp
  if (keyCode === 40){}; // 40 = ArrowDown
}

function draw(){
  var duration = 5;
var t = (millis() - startTime)/1000;

// if we have passed t=duration then end the animation.
if (t > duration) {
  noLoop();
  console.log('finished recording.');
  capturer.stop();
  capturer.save();
  return;
}

   //console.log("is running");
    if (frameCount % 240 == 0){
      for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].fear += 30;
      }
    }
    if (frameCount % 30 == 0 &&vehicles.length<=300) {
     let actLength = vehicles.length;
     for(i = 0; i<actLength; i++){
        //let target = randPointInR(200, center.x, center.y);
        let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y);
        //toAdd.velocity = vehicles[i].velocity.mult(random(-1.1,1.1));
        vehicles.push(toAdd);
    }
  }


    for (var i = 0; i < vehicles.length; i++) {
      vehic = vehicles[i]
      vehic.flee(vehicles);
    //  vehic.seek(vehicles);
      vehic.update();
      vehic.show();
    }
    // end drawing code

    // handle saving the frame
    console.log('capturing frame');
    capturer.capture(document.getElementById('defaultCanvas0'));
}
