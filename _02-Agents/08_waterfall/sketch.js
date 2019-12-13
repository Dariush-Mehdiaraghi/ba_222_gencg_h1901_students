let Engine,
    //Render,
    World,
    Bodies;
let circles = [];
let splashes = [];
let lastScreenPos = {x:null,y:null}
let lastScrollPos = {x:null,y:null}
let xAcelleration = 0;
let direction;
let engine;
let bottom;
let center
let leftBorder;
let rightBorder;
let mostLeftBorder;
let mostRightBorder;
let topBorder;
    let colors
window.addEventListener("devicemotion", handleMotion, true);
function setup(){

    Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World;
    Bodies = Matter.Bodies;
    engine = Engine.create();
    createCanvas(windowWidth,windowHeight);
  center = createVector(width/2, height/2)
    bottom = null;
    topBorder = null;
    leftBorder = null;
    rightBorder = null;
    mostLeftBorder = null;
    mostRightBorder = null;
    circles = [];
    stones = [];
    splashes = [];
    World.clear(engine.world);
    Engine.clear(engine);

    //bottom = new rigid(windowWidth/2, windowHeight, windowWidth, 200, 1);

    for (let i = 0; i < width/1000; i++) {
      stones.push(new rigidBole(random(width/3,width/3*2),random(0.6,1)*height,random(width*0.001,width*0.05)))
    }

    pixelDensity(1);

     colors = ["#575FF2", '#5C73F2', '#6B8DF2', '#82B8D9',"#FFFFF"] //C1

    engine.world.gravity.y = 1;
    //  Engine.run(engine);
    lastScreenPos.x = screenX;
    lastScreenPos.y = screenY;
    lastScrollPos.y = window.pageYOffset;
    startTime = new Date();
    rideDuration = getRideDuration(2);
}

    function mousePressed(){
      for (var i = 0; i < circles.length; i++) {
        circles[i].handleClick();
      }
    }
    function keyPressed(){
      if (key == 's' || key == 'S') saveThumb(650, 350);
      if (keyCode === 32) setup() // 32 = Space
      if (keyCode === 38) direction = 'up' ; // 38 = ArrowUp
      if (keyCode === 40) direction = 'down'; // 40 = ArrowDown
      if (keyCode >= 48 && keyCode <= 57) rideDuration = getRideDuration(toInt(key)) // 48...57 = Digits
    }
    function saveThumb(w, h) {
      let img = get( width/2-w/2, height/2-h/2, w, h);
      save(img,'thumb.jpg');
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
      for (var i = 0; i < 2; i++) {
        circles.push(new Bole(random(width/3,width/3*2),0,random(window.width*0.0005,window.width*0.002),colors[int(random(0,colors.length))]));
      }
       background(0, 50);
    for (stone of stones) {
    /*  let collisionList= Matter.Query.collides(stone.body, circles.map(circl => circl.body));
      if (collisionList.length>0) {
        for (let i = 0; i<collisionList.length; i= i+10) {
          collision = collisionList[i];
          let toAdd = new Bole(collision.bodyB.position.x, collision.bodyB.position.y, 5, color(255));
          let velVec = createVector(collision.bodyB.velocity.x,collision.bodyB.velocity.y)
                          velVec.rotate(radians(random(-45, 45)));
                          velVec.mult(random(0.0008, 0.0018));
                          toAdd.body.force.x = velVec.x;
                          toAdd.body.force.y = velVec.y;

          splashes.push(toAdd)
        }
      }*/
      stone.show()
    }
    /*  let t = (new Date() - startTime) / 1000;
      stepSize = animate(t, 0, 2, rideDuration, 2.5);
      stepSize = (direction === 'up') ? +stepSize : -stepSize;
      console.log(stepSize);
  engine.world.gravity.y = stepSize;*/
      Engine.update(engine)

      for (splash of splashes) {
        splash.show();
      }
      for (var i = 0; i < circles.length; i++) {
        circles[i].show();
        circles[i].applyAForce((screenX-lastScreenPos.x)*0.00001 + xAcelleration,(screenY-lastScreenPos.y - (window.pageYOffset-lastScrollPos.y)/3)*0.00001);
      }
      for (var i = 0; i < circles.length; i++) {
        if(circles[i].body.position.y>height){
          World.remove(engine.world, circles[i].body);
          circles.splice(i,1)
        }
      }
      for (var i = 0; i < splashes.length; i++) {
        if(splashes[i].body.position.y>height){
          World.remove(engine.world, splashes[i].body);
          splashes.splice(i,1)
        }
      }
      lastScreenPos.x = screenX;
      lastScreenPos.y = screenY;
      lastScrollPos.y = window.pageYOffset
      }
