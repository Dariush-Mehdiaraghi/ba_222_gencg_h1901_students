
class Bacteria {
  constructor(x, y, numberOfTentacles, radius) {
    this.position = createVector(x,y);
    this.direction = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
     this.radius = radius;
    this.maxSpeed = 1;
    this.tentacles = [];
    for (var i = 0; i < numberOfTentacles; i++) {
      this.tentacles.push(new Tentacle(this.position.x + sin(i)*this.radius, this.position.y + cos(i)*this.radius, windowWidth/20));
    }
}

show(vehicles){
  strokeWeight(10)
  stroke(255,127,123);
  //fill(255,127,123);
  circle(this.position.x,this.position.y, this.radius*2)
  for (var i = 0; i < this.tentacles.length; i++) {
    this.tentacles[i].calculateTargetXY(vehicles);
    this.tentacles[i].show();
  }
}
applyForce(vecForce){
  this.acceleration = vecForce;
}
seek(){
  let desired = createVector();
  for (var i = 0; i < this.tentacles.length; i++) {
    if (!this.tentacles[i].isSearching) {
        desired.add(p5.Vector.sub(this.tentacles[i].target,this.position));
    }

  }
  desired.setMag(this.maxSpeed);
  console.log(desired + this.velocity);
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.setMag(1);

  this.applyForce(steer);
}

update(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  for (var i = 0; i < this.tentacles.length; i++) {
    this.tentacles[i].base = createVector(this.position.x + sin(i)*this.radius, this.position.y + cos(i)*this.radius);
  }
}
}
