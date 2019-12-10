let point1 = 0;
let point2 = 0;
let particles = [];
let center;
let lfo;
let myFont;

function preload() {
myFont = loadFont('FjallaOne-Regular.ttf');
}


function setup() {
pixelDensity(1); //Retina
smooth();

center = createVector(windowWidth/2, windowHeight/2); //center point of viewport
canv = createCanvas(windowWidth, windowHeight);
for (var i = 0; i < 2000; i++) {
  let toAdd =   new Planet(windowWidth/20, 10, center.x+windowWidth/10, center.y+random(0,100));
  toAdd.velocity=createVector(random(-2,2),random(-1,1));
  particles.push(toAdd);
}

sun =     new Planet(100, 10, windowWidth/2, center.y);
sun2 =     new Planet(100, 10, windowWidth/3*2, center.y);
background(0);
}
function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}s
function draw() {
  //  background(0,20);
    sun.mass= sin(frameCount/100)*25+20;


for(let i=0; i< particles.length; i++){
  particles[i].radius = cos(frameCount/90)*windowWidth/100;


  particles[i].attractTo(sun);
  particles[i].attractTo(sun2);
                 //P2P Checkbox
/*  for(let j=0; j< particles.length; j++){
console.log(    particles[i].location );
      if(i!=j){particles[i].attractTo(particles[j]);} //attract i to every other Particle in the array
    }*/

  particles[i].update();
  particles[i].show();
}
}
