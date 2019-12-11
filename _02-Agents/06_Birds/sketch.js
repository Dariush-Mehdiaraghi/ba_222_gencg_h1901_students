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


function setup() {

  /*mic = new p5.AudioIn();
  mic.start(); */

  pixelDensity(1); //Retina

  canv = createCanvas(windowWidth, windowHeight);

  center = createVector(windowWidth/2, windowHeight/2);
  background("#0D0D0D");
  let colors = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ]

  vehicles = [];
for(i = 0; i<400; i++){
  let target = randPointInR(200, center.x, center.y);
  let toAdd = new Vehicle(random()*width, center.y+random(-10,10), target.x, target.y, colors[int(random(0,colors.length-1))])
  //toAdd.velocity = createVector(random(-2,2),random(-2,2))
  vehicles.push(toAdd)

  }
  boundryCanv = new Rectangle(center.x,center.y,width/2,height/2);


  noStroke();
}


function keyPressed(){
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
  let quadTree = new QuadTree(boundryCanv, 5);

  background(0,50);

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
//  quadTree.show();
// console.log(quadTree);

}
