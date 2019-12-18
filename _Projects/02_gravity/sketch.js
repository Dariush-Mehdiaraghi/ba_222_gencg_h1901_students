let Engine,
    //Render,
    World,
    Bodies;
let circles = [];
let lastScreenPos = {x:null,y:null}
let lastScrollPos = {x:null,y:null}
let xAcelleration = 0;
let direction;
let engine;
let bottom;

let leftBorder;
let rightBorder;
let mostLeftBorder;
let mostRightBorder;
let topBorder;

window.addEventListener("devicemotion", handleMotion, true);
function setup(){
  frameCount = 0;
    Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World;
    Bodies = Matter.Bodies;
    engine = Engine.create();
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
    for (var i = 0; i < windowWidth/20; i++) {
      circles.push(new Bole(random(0,window.width),random(window.height*0.3,window.height*0.5),random(window.width*0.005,window.width*0.02)));
    }

    //  background(0,0,0);
    engine.world.gravity.y = 1;
    //  Engine.run(engine);
    lastScreenPos.x = screenX;
    lastScreenPos.y = screenY;
    lastScrollPos.y = window.pageYOffset;
    startTime = new Date();
    rideDuration = getRideDuration(2);
}


    function keyPressed(){
      if (keyCode === 32) setup() // 32 = Space
      if (key == 's' || key == 'S') saveThumb(650, 350);
      if (keyCode === 38) direction = 'up' ; // 38 = ArrowUp
      if (keyCode === 40) direction = 'down'; // 40 = ArrowDown
      if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
    }
    function saveThumb(w, h) {
      let img = get( width/2-w/2, height/2-h/2, w, h);
      save(img,'thumb.jpg');
    }




    function handleMotion(devicemotion) {
        xAcelleration = Number( (devicemotion.acceleration.x).toFixed(2));
        logDiv.html(xAcelleration);
    }

    function draw(){
      let t = (new Date() - startTime) / 1000;
      stepSize = animate(t, 0, 2, rideDuration, 2.5);
      stepSize = (direction === 'up') ? +stepSize : -stepSize;
    //  console.log(stepSize);
    if (frameCount<1000 && frameCount>200 && frameCount%50==0) {
      for (var i = 0; i < circles.length; i++) {
        circles[i].handleClick()
      }

    }
      Engine.update(engine)
      //background(0,0,0);
      //bottom.show();
      for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        circles[i].applyAForce((screenX-lastScreenPos.x)*0.00001 + xAcelleration,(screenY-lastScreenPos.y - (window.pageYOffset-lastScrollPos.y)/3)*0.00001+stepSize*0.009);
      }
      lastScreenPos.x = screenX;
      lastScreenPos.y = screenY;
      lastScrollPos.y = window.pageYOffset
      }
