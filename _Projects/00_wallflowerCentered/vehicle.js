
class Vehicle {
  constructor(posX, posY, targX, targY, velX, velY) {
    this.target = createVector(targX, targY);
    this.position = createVector(posX, posY);
    this.velocity = createVector(velX, velY);
    this.acceleration = createVector();
    this.maxSpeed = 3;
    this.maxForce = 0.1;
    this.found = false;
    this.terminator = false;
    this.fear = width/15;
    this.arriveR = 40;
}

  applyForce(vecForce){
    this.acceleration = vecForce;
  }
  seek(){

    let desired = p5.Vector.sub(this.target, this.position);

    if(desired.mag() < this.arriveR && desired.mag() > this.arriveR - 2){
      this.found = true;
    }
    else {
      this.found = false;
    }
    if(desired.mag() < this.arriveR){
      let m = map(desired.mag(),0,this.arriveR,0,this.maxSpeed);
      desired.setMag(m);
    }
      else{
        desired.setMag(this.maxSpeed);
      }
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.setMag(this.maxForce);
    this.applyForce(steer);
  }

  flee(enemies){

    let sum = createVector();
    let count = 0;
    for (var i = 0; i < enemies.length; i++) {
      let enemy = enemies[i]
      let d = p5.Vector.dist(enemy.position, this.position)
      if((d > 0) && (d < this.fear)){
        let diff = p5.Vector.sub(this.position, enemy.position);
        diff.normalize();
        diff.div(d)
        sum.add(diff.x,diff.y);
        count++;
    }}
    //sum.div(count);
    sum.setMag(this.maxSpeed)
    let desired = p5.Vector.sub(this.target, this.position);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

  }

  update(){
  // this.seek();
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);



}
show(){
  extraCanv.circle(this.position.x, this.position.y, 3);
  circle(this.position.x, this.position.y, 10);
}

}
