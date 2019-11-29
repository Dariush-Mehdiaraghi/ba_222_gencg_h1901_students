var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
let circles = [];
let lastScreenPos = {x:null,y:null}
let lastScrollPos = {x:null,y:null}
let xAcelleration = 0;
    // create an engine
var engine = Engine.create();
let bottom;

let leftBorder;
let rightBorder;
let mostLeftBorder;
let mostRightBorder;
let topBorder;

window.addEventListener("devicemotion", handleMotion, true);
function setup(){
    createCanvas(windowWidth,windowHeight*1.3);
    bottom = null;
    topBorder = null;
    leftBorder = null;
    rightBorder = null;
    mostLeftBorder = null;
    mostRightBorder = null;
    circles = [];
    World.clear(engine.world);
   Engine.clear(engine);

    bottom = new rigid(windowWidth/2, windowHeight, windowWidth, 200, 1);
    topBorder = new rigid(windowWidth/2, -2, windowWidth, 2, 1);
    leftBorder = new rigid(windowWidth/3, 0, 2, windowHeight, 1);
    rightBorder = new rigid(windowWidth*2/3, 0, 2, windowHeight, 1);
    mostLeftBorder = new rigid(0, 0, 2, windowHeight, 1);
    mostRightBorder = new rigid(windowWidth, 0, 2, windowHeight, 1);

    pixelDensity(1);
    for (var i = 0; i < windowWidth/30; i++) {
      circles.push(new Bole(random(0,window.width),random(window.height*0.3,window.height*0.5),random(window.width*0.005,window.width*0.02)));
    }

    //  background(0,0,0);
    engine.world.gravity.y = 0.02;
    //  Engine.run(engine);
    lastScreenPos.x = screenX;
    lastScreenPos.y = screenY;
    lastScrollPos.y = window.pageYOffset;
    }

    function mousePressed(){
      for (var i = 0; i < circles.length; i++) {
        circles[i].handleClick();
      }
    }
    function keyPressed(){
      if (keyCode === 32) setup() // 32 = Space
      if (keyCode === 38) for (var i = 0; i < circles.length; i++) {circles[i].applyAForce(0,windowWidth*0.0008)}; // 38 = ArrowUp
      if (keyCode === 40) for (var i = 0; i < circles.length; i++) {circles[i].applyAForce(0,-windowWidth*0.0008)}; // 40 = ArrowDown
    }
    function windowResized(){
        if (windowWidth>500){
      resizeCanvas(windowWidth, windowHeight*1.3);
        }

    }
    function handleMotion(devicemotion) {
        xAcelleration = Number( (devicemotion.acceleration.x).toFixed(2));
        logDiv.html(xAcelleration);
    }

    function draw(){
      Engine.update(engine)
      //background(0,0,0);
      //bottom.show();
      for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        circles[i].applyAForce((screenX-lastScreenPos.x)*0.00001 + xAcelleration,(screenY-lastScreenPos.y - (window.pageYOffset-lastScrollPos.y)/3)*0.00001);
      }
      lastScreenPos.x = screenX;
      lastScreenPos.y = screenY;
      lastScrollPos.y = window.pageYOffset
      }