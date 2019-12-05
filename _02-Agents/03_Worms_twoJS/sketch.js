let center;
let vehicles =[];
let terminators = [];
let extraCanvas;
let app;
let graphics;
let inR = 400;
let ouR = 500;

var elem = document.body;
var params = {fullscreen: true, type: Two.Types.webgl };
var two = new Two(params).appendTo(elem);

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
  center = createVector(windowWidth/2, windowHeight/2);

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

two.bind('update', function(frameCount) {
 //console.log("is running");
  if (frameCount % 240 == 0){
    for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].fear += 20;
    }
  }
  if (frameCount % 30 == 0 &&vehicles.length<=500) {
   let actLength = vehicles.length;
   for(i = 0; i<actLength; i++){
      //let target = randPointInR(200, center.x, center.y);
      let toAdd = new Vehicle(vehicles[i].position.x, vehicles[i].position.y);
      //toAdd.velocity = vehicles[i].velocity.mult(random(-1.1,1.1));

      vehicles.push(toAdd);

  }
}
//  background(0);

  for (var i = 0; i < vehicles.length; i++) {
    vehic = vehicles[i]
    vehic.flee(vehicles);
  //  vehic.seek(vehicles);
    vehic.update();
    vehic.show();
  }

}
).play();
