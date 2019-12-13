let center;
let vehicles =[];
let terminators = [];
let video;

let poseNet;
let handHeight;

let boundryCanv
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

function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

function setup() {
  ///*
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(6480 / density, 3840 / density);
  // Capture settings
  fps = 60;
  capturer = new CCapture({ format: 'png', framerate: fps });
  frameRate(fps);
  capturer.start();
  startTime = millis(); //*/


  //canv = createCanvas(windowWidth, windowHeight);

  center = createVector(width/2, height/2);
  background("#012623");
  // let colors = ["#D90416", '#F2059F', '#030BA6', '#03A6A6', "#F29F05"] //C1
  //  let colors = ["#403B21", '#D9AD5B', '#BF472C', '#D9695F'] //C2
  let colors = ['#F28D9F', '#BF7582', '#8C686E', '#012623', '#024034'] //C3
  //let colors = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50'] //C4

  vehicles = [];
  for(i = 0; i<500; i++){
    let target = randPointInR(200, center.x, center.y);
    let toAdd = new Vehicle(random()*width, center.y+random(-10,10), target.x, target.y, colors[int(random(0,colors.length))])
    //toAdd.velocity = createVector(random(-2,2),random(-2,2))
    vehicles.push(toAdd)

  }
  boundryCanv = new Rectangle(center.x,center.y,width/2,height/2);


  noStroke();
}


function keyPressed(){
  if (key == 's' || key == 'S') saveThumb(650, 350);
  if (keyCode === 32){ setup();}// 32 = Space
  if (keyCode === 38){
    let actLength = vehicles.length;
    for(i = 0; i<actLength; i++){

      let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y)
      //toAdd.velocity = vehicles[i].velocity.mult(random(-5,5));
      vehicles.push(toAdd);
    }
  } ; // 38 = ArrowUp
  if (keyCode === 40){for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].fear +=10;
  }} ; // 40 = ArrowDown
}
function draw() {
//  /*
  var duration = 30;
  var t = (millis() - startTime)/1000;

  // if we have passed t=duration then end the animation.
  if (t > duration) {
  noLoop();
  console.log('finished recording.');
  capturer.stop();
  capturer.save();
  return;
} //*/
let quadTree = new QuadTree(boundryCanv, 9);
//background(0,90)
background(1,38,35,90)
//background(38,38,38,90);//C2



for (let vehic of vehicles) {
  let point = new Point(vehic.position.x,vehic.position.y,vehic)
  quadTree.insert(point);
  let range = new Circle(vehic.position.x,vehic.position.y,vehic.fear)

  let others = quadTree.query(range);
  //console.log(others);
  vehic.flee(others);
  vehic.update();

  vehic.cohesion(others);
  vehic.update();

  vehic.align(others);
  vehic.update();

  vehic.seek();
  vehic.update();

  vehic.show();
}
//quadTree.show();
// console.log(quadTree);
// end drawing code


// handle saving the frame
console.log('capturing frame');
capturer.capture(document.getElementById('defaultCanvas0'));

}
