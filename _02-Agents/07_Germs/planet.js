class Planet {
 constructor(rad, mass, posx, posy, color) {
   this.mass = mass;
   this.location = createVector(posx, posy);
   this.velocity = createVector();
   this.acceleration = createVector();
   this.radius = rad;
   this.color = color;
   }
   applyForce(vecForce){
     this.acceleration = vecForce;

   }
update(){
  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
   }
attractTo(other){
  let gravity = width/6000000;
  let distanceVec = p5.Vector.sub(other.location, this.location);
  let distance =  p5.Vector.sub(other.location, this.location).mag();

  let force = gravity * ((this.mass * other.mass) / distance * distance); //F =G*((m1*m2)/(d^2))
  this.acceleration.add(distanceVec.setMag(force));
}
flee(other){

  let gravity = width/650000;
  let distanceVec = p5.Vector.sub(other.location, this.location);
  let distance =  p5.Vector.sub(other.location, this.location).mag();
  this.radius = distance*0.1
  if(distance<100) {
  let force = gravity * ((this.mass * other.mass) / distance * distance); //F =G*((m1*m2)/(d^2))

  this.acceleration.add(distanceVec.setMag(force).mult(-1));  }
}
   show(){
   fill(this.color)
     //stroke(sin(frameCount/16)*255,sin(frameCount/32)*10+127,sin(frameCount/31)*10+127);

     circle(this.location.x,this.location.y, this.radius);
  }
}
