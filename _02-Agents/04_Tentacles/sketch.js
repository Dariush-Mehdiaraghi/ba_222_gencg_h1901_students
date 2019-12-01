let center;
let vehicles =[];
let terminators = [];
let extraCanvas;
let tentacles = [];
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
  p5.disableFriendlyErrors = true;
  pixelDensity(2); //Retina

  canv = createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.clear();
  center = createVector(windowWidth/2, windowHeight/2);
  background(0);

  vehicles = [];
  for(i = 0; i<12; i++){
    tentacles.push(new Tentacle(center.x, center.y, 20));
    let target = randPointInR(200, center.x, center.y);
    let toAdd = new Vehicle(center.x, center.y, target.x, target.y)
    toAdd.velocity = createVector(sin(i),cos(i));
    vehicles.push(toAdd)
  }


}




function keyPressed(){
  if (keyCode === 32){ setup();}// 32 = Space
  if (keyCode === 38){

    let actLength = vehicles.length;

    for(i = 0; i<actLength; i++){
      let target = randPointInR(200, center.x, center.y);
      let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y, target.x, target.y);
      //toAdd.velocity = vehicles[i].velocity.mult(random(-1.1,1.1));

      vehicles.push(toAdd);
}
}// 38 = ArrowUp
  if (keyCode === 40){for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].fear += 10;
    }} ; // 40 = ArrowDown
}
function draw() {

  noStroke();
  background(0);
  color(255);
  image(extraCanvas,0,0);
  for (var i = 0; i < vehicles.length; i++) {

    vehic = vehicles[i];
    vehic.flee(vehicles);
  //  vehic.seek(vehicles);
    vehic.update();
    vehic.show();
  }

for (var i = 0; i < tentacles.length; i++) {
  
  tentacles[i].calculateTargetXY(vehic.position);
  tentacles[i].show();
}



}
