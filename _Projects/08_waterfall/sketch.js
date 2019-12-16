let Engine,
//Render,
World,
Bodies;
let circles = [];
let splashes = [];
let lastScreenPos = {x:null,y:null}
let lastScrollPos = {x:null,y:null}
let xAcelleration = 0;
let direction;
let engine;
let bottom;
let center
let leftBorder;
let rightBorder;
let mostLeftBorder;
let mostRightBorder;
let topBorder;
let colors;
let splashBoleRad;
let splashMag;
let circleRadMinMax;
let stonesCategory = 0x0001,
    circlesCategory = 0x0002;
window.addEventListener("devicemotion", handleMotion, true);
function setup(){

  Engine = Matter.Engine,
  World = Matter.World;
  Bodies = Matter.Bodies;
  engine = Engine.create();
  /*
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(6480 / density, 3840 / density);
  // Capture settings
  fps = 60;
  capturer = new CCapture({ format: 'png', framerate: fps });
  frameRate(fps);
  capturer.start();
  startTime = millis(); //*/
  createCanvas(windowWidth,windowHeight)


  center = createVector(width/2, height/2)
  bottom = null;
  topBorder = null;
  leftBorder = null;
  rightBorder = null;
  mostLeftBorder = null;
  mostRightBorder = null;
  circles = [];
  stones = [];
  splashes = [];
  World.clear(engine.world);
  Engine.clear(engine);

  //bottom = new rigid(windowWidth/2, windowHeight, windowWidth, 200, 1);
  if (width>3000) {                                       //mediaquerys
      circleRadMinMax = {"a":4,"b":8.0}
      splashBoleRad = 5;
      splashMag = 0.00003;
      engine.world.gravity.y = 0.6;
  }
  else{
      circleRadMinMax = {"a":0.5,"b":5.0}
      splashBoleRad = 1.4;
      splashMag = 0.00002;
      engine.world.gravity.y = 0.3;
      //pixelDensity(2);
  }
  for (let i = 0; i < 8; i++) {
      let position = createVector(random(width/3,width/3*2),random(height/3,height))
      let rad = random(width*0.001,width*0.05);
      let overlap
      for (var j = 0; j < stones.length; j++) {
         let otherPosition = createVector(stones[j].x,stones[j].y);
         let otherRad = stones[j].r;
         if (position.dist(otherPosition)<(otherRad+rad)*1.5) {
           overlap = true
         }
      }
      if(!overlap){stones.push(new rigidBole(position.x,position.y, rad))}
    }

  let c1 = ["#575FF2", '#5C73F2', '#6B8DF2', '#82B8D9',"#FFFFF"] //C1
  let c2 = ["#035AA6", '#037F8C', '#038C8C', '#03A696',"#FFFFF"] //C2
  let c3 = ["#D8E8F2", '#012E40', '#011C26', '#2F6073', "#6393A6"] //C3
  let c4 = ["#00D6F2", '#36F0F2', '#1EA8D1', '#0482B3', "#1C6C80"] //C4
  let allColors = [c1,c2,c3,c4]
  colors = allColors[int(random(0,allColors.length))]

  //  Engine.run(engine);
  lastScreenPos.x = screenX;
  lastScreenPos.y = screenY;
  lastScrollPos.y = window.pageYOffset;
  startTime = new Date();
  rideDuration = getRideDuration(2);
  noStroke()
  colorMode(HSB,255);
}

function keyPressed(){
  if (key == 's' || key == 'S') saveThumb(650, 350);
  if (keyCode === 32) setup() // 32 = Space
  if (keyCode === 38) direction = 'up' ; // 38 = ArrowUp
  if (keyCode === 40) direction = 'down'; // 40 = ArrowDown
  if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
}
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}
function handleMotion(devicemotion) {
  xAcelleration = Number( (devicemotion.acceleration.x).toFixed(2));
  logDiv.html(xAcelleration);
}

function draw(){


  /*
  var duration = 24;
  var t = (millis() - startTime)/1000;

  // if we have passed t=duration then end the animation.
  if (t > duration) {
  noLoop();
  console.log('finished recording.');
  capturer.stop();
  capturer.save();
  return;
} //*/
  if (frameRate()>24) {
for (var i = 0; i < 3; i++) {
      circles.push(new Bole(random(width/3,width/3*2),0,random(circleRadMinMax.a,circleRadMinMax.b),colors[int(random(0,colors.length))]));
    }
}
background(0,90);
for (stone of stones) {
  if (frameRate()>40) {
    let collisionList= Matter.Query.collides(stone.body, circles.map(circl => circl.body));
    if (collisionList.length>0) {
      for (let i = 0; i<collisionList.length; i++) {
        collision = collisionList[i];
        let toAdd = new Bole(collision.bodyB.position.x, collision.bodyB.position.y, splashBoleRad, color(255));
        let velVec = createVector(collision.bodyB.velocity.x,collision.bodyB.velocity.y)
        velVec.rotate(radians(random(-45, 45)));
        velVec.mult(splashMag);
        toAdd.body.force.x = velVec.x;
        toAdd.body.force.y = velVec.y;
        splashes.push(toAdd)
      }
    }
  }
  stone.show()
}
/*  let t = (new Date() - startTime) / 1000;
stepSize = animate(t, 0, 2, rideDuration, 2.5);
stepSize = (direction === 'up') ? +stepSize : -stepSize;
console.log(stepSize);
engine.world.gravity.y = stepSize;*/
Engine.update(engine)

for (splash of splashes) {
  splash.show();
}
for (var i = 0; i < circles.length; i++) {
  circles[i].show();
  circles[i].applyAForce((screenX-lastScreenPos.x)*0.00001 + xAcelleration,(screenY-lastScreenPos.y - (window.pageYOffset-lastScrollPos.y)/3)*0.00001);
}
for (var i = 0; i < circles.length; i++) {
  if(circles[i].body.position.y>height){
    World.remove(engine.world, circles[i].body);
    circles.splice(i,1)
  }
}
for (var i = 0; i < splashes.length; i++) {
  if(splashes[i].body.position.y>height){
    World.remove(engine.world, splashes[i].body);
    splashes.splice(i,1)
  }
}
lastScreenPos.x = screenX;
lastScreenPos.y = screenY;
lastScrollPos.y = window.pageYOffset
// end drawing code

/*
// handle saving the frame
console.log('capturing frame');
capturer.capture(document.getElementById('defaultCanvas0'));*/
}
