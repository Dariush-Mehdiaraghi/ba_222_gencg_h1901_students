let center;
let vehicles =[];
let terminators = [];

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


  pixelDensity(2); //Retina

 //center point of viewport
  canv = createCanvas(windowWidth, windowHeight);
  center = createVector(windowWidth/2, windowHeight/2);
  background(0);

/*
   textFont(myFont);
   textSize(160);
   fill(255);
   noStroke();
   let fontPoints = myFont.textToPoints('BEAUTIFUL MATH',center.x-520,center.y+300);
   for(i = 0; i< fontPoints.length; i++){
     tree.leaves.push(new Leaf(1, fontPoints[i].x, fontPoints[i].y));
   }
*/
for(i = 0; i<300; i++){

  let target = randPointInR(200, center.x, center.y);
  let toAdd = new Vehicle(center.x, center.y, target.x, target.y)
  toAdd.velocity = createVector(random(-1,1),random(-10,5))
  vehicles.push(toAdd)

}
}

function draw() {

  background(0);
  color(255);

  for (var i = 0; i < vehicles.length; i++) {
      vehic = vehicles[i]
    vehic.flee(vehicles);
  //  vehic.seek(vehicles);
    vehic.update();
    vehic.show();
    if(vehic.found){
      nextTarg = randPointInRing(50,200,center.x,center.y);
      terminators.push((new Vehicle(vehic.position.x, vehic.position.y, nextTarg.x, nextTarg.y, vehic.velocity.x, vehic.velocity.y)));
    }
  }


/*for (var i = terminators.length -1; i >= 0; i--) {
  if(terminators[i].arrived){terminators.splice(1, i)}
}*/

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
}
