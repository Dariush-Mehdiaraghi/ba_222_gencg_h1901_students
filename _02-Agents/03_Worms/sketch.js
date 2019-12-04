let center;
let vehicles =[];
let terminators = [];
let extraCanvas;

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
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  p5.disableFriendlyErrors = true;
  pixelDensity(1); //Retina

  canv = createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.clear();
  center = createVector(windowWidth/2, windowHeight/2);
  background(0);

  vehicles = [];
  for(i = 0; i<12; i++){
    let target = randPointInR(200, center.x, center.y);
    let toAdd = new Vehicle(center.x, center.y, target.x, target.y)
    toAdd.velocity = createVector(sin(i),cos(i));

    vehicles.push(toAdd)
  }
}




function keyPressed(){
  if (keyCode === 32){ setup();}// 32 = Space
  if (keyCode === 38){


}// 38 = ArrowUp
  if (keyCode === 40){}; // 40 = ArrowDown
}
function draw() {
  if (frameCount % 240 == 0){
    for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].fear += 20;
    }
  }
  if (frameCount % 30 == 0 &&vehicles.length<=400) {

    let actLength = vehicles.length;
    for(i = 0; i<actLength; i++){
      let target = randPointInR(200, center.x, center.y);
      let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y, target.x, target.y);
      //toAdd.velocity = vehicles[i].velocity.mult(random(-1.1,1.1));

      vehicles.push(toAdd);

  }}
  noStroke();
//  background(0);


  image(extraCanvas,0,0);
  for (var i = 0; i < vehicles.length; i++) {
    vehic = vehicles[i]
    vehic.flee(vehicles);
  //  vehic.seek(vehicles);
    vehic.update();
    vehic.show();
  }

}
