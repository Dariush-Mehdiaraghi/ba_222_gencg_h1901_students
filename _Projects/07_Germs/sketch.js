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
  /*
  var density = displayDensity();
  pixelDensity(density);
  createCanvas(6480 / density, 3840 / density);
  // Capture settings
  fps = 30;
  capturer = new CCapture({ format: 'png', framerate: fps });
  frameRate(fps);
  capturer.start();
  startTime = millis(); //*/

 //let colors = ["#D90416", '#F2059F', '#030BA6', '#03A6A6', "#F29F05"] //C1
 let colors = ["#403B21", '#D9AD5B', '#BF472C', '#D9695F'] //C2
canv = createCanvas(windowWidth, windowHeight);
center = createVector(width/2, height/2); //center point of viewport

for (var i = 0; i <500; i++) {
  let toAdd =   new Planet(windowWidth/10, 4, center.x+windowWidth/10, center.y+random(-100,100),colors[int(random(0,colors.length-1))]);
  toAdd.velocity=createVector(random(-2,2),random(-1,1));
  particles.push(toAdd);
}

sun =     new Planet(100, 10, windowWidth/2, center.y,colors[int(random(0,colors.length-1))]);
sun2 =     new Planet(width/30, 20, windowWidth/3, center.y,color(0));
sun2.velocity= createVector(-5,-3)
background(0);

}
function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}
function draw() {
  /*
    var duration = 25;
    var t = (millis() - startTime)/1000;

    // if we have passed t=duration then end the animation.
    if (t > duration) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  } //*/

sun2.attractTo(sun);
sun2.update()
sun2.show()
for(let i=0; i< particles.length; i++){
  //particles[i].radius = cos(frameCount/100)*windowWidth/100;
  particles[i].attractTo(sun);
  particles[i].flee(sun2);

                 //P2P Checkbox
/*  for(let j=0; j< particles.length; j++){
console.log(    particles[i].location );
      if(i!=j){particles[i].attractTo(particles[j]);} //attract i to every other Particle in the array
    }*/

  particles[i].update();
  particles[i].show();
}
// end drawing code


// handle saving the frame
/*console.log('capturing frame');
capturer.capture(document.getElementById('defaultCanvas0'));*/
}
