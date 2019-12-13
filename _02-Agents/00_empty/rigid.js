class rigid{
  constructor(x,y,w,h,a){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;
    this.body = Bodies.rectangle(this.x,this.y + this.h/2,this.w,this.h, {isStatic: true});
    World.add(engine.world, this.body);
  }

show(){
  console.log(this.body.position.x,this.body.position.y,this.body.width,this.body.height);
  fill(127);
  push();
  translate(this.body.position.x- this.body.position.x/2, this.body.position.y ); //origin of Rect in matter.js is in the center of the rectangle in p5 ebe nöd
  rect(0,0,this.w,this.h);
  pop();
  }
}
