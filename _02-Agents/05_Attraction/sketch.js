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

center = createVector(windowWidth/2, windowHeight/2); //center point of viewport
canv = createCanvas(windowWidth*2, windowHeight*2);
for (var i = 0; i < 20; i++) {
  let toAdd =   new Planet(windowWidth/20, 10, center.x+random(0,windowWidth), center.y+random(0,windowHeight));
  toAdd.velocity=createVector(-1,2);
  particles.push(toAdd);
}

sun =     new Planet(100, 10, center.x, center.y);

}

function draw() {

for(let i=0; i< particles.length; i++){
  particles[i].radius = cos(frameCount/200)*20;
  particles[i].attractTo(sun);
                 //P2P Checkbox
/*  for(let j=0; j< particles.length; j++){
console.log(    particles[i].location );
      if(i!=j){particles[i].attractTo(particles[j]);} //attract i to every other Particle in the array
    }*/

  particles[i].update();
  particles[i].show();
}
}
