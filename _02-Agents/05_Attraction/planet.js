class Planet {
 constructor(rad, mass, posx, posy) {
   this.mass = mass;
   this.location = createVector(posx, posy);
   this.velocity = createVector();
   this.acceleration = createVector();
   this.radius = rad;
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
  let gravity = 0.0005;
  let distanceVec = p5.Vector.sub(other.location, this.location);
  let distance =  p5.Vector.sub(other.location, this.location).mag();
  let force = gravity * ((this.mass * other.mass) / distance * distance); //F =G*((m1*m2)/(d^2))
  this.acceleration.add(distanceVec.setMag(force));
}
   show(){

     fill(255);
     circle(this.location.x,this.location.y,10);
  }
}
