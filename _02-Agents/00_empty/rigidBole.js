class rigidBole{
  constructor(x,y,r,a){
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.options = {
        friction: 0,
        isStatic: true
    }
    this.body = Bodies.circle(this.x, this.y, this.r, this.options);
    World.add(engine.world, this.body);
  }

show(){

  fill(127);
  push();
  translate(this.body.position.x, this.body.position.y);
  rotate(this.body.angle);
  //stroke(255,255,255, 2);
noFill()
  stroke(255)
  strokeWeight(3)
  circle(0, 0, this.r * 2);//origin of Rect in matter.js is in the center of the rectangle in p5 ebe nöd

  pop();
  }
}
