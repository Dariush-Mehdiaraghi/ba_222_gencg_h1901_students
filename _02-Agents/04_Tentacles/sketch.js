let center;
let vehicles =[];
let bacterias = [];
let terminators = [];
let extraCanvas;
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
  center = createVector(windowWidth/2, windowHeight/2);
  background(0);

  vehicles = [];
  bacterias = [];
  bacterias.push(new Bacteria(center.x, center.y, 6, 50))
  for(i = 0; i<80; i++){

    let toAdd = new Vehicle(random(0,windowWidth), random(0,windowHeight))

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
      toAdd.acceleration = createVector(10,20);

      vehicles.push(toAdd);
}
}// 38 = ArrowUp
  if (keyCode === 40){
    for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].fear += 10;
    }
  } ; // 40 = ArrowDown
}
function draw() {

  noStroke();
  background(0);
  color(255);
  for (var i = 0; i < vehicles.length; i++) {
      vehic = vehicles[i];

      vehic.seek();
      vehic.update();
      vehic.show();
  }
  for (var i = 0; i < bacterias.length; i++) {

    //bacterias[i].seek();
    bacterias[i].update();
    bacterias[i].show(vehicles);
  }





}
