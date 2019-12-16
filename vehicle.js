
class Vehicle {
  constructor(posX, posY, targX, targY, color) {
    this.target = createVector(targX, targY);
    this.position = createVector(posX, posY);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.maxSpeed = 6;
    this.maxForce = 0.09;
    this.fear = 200;
    this.arriveR = 10;
    this.neighborDist = 25;
    this.color = color;
}

  applyForce(vecForce){
    this.acceleration = vecForce;
  }
  seek(){
    let desired = p5.Vector.sub(this.target, this.position);

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
  align(vehicles){
    let sum = createVector();
    let count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      let d = p5.Vector.dist(this.position, vehicles[i].position);
      if (d>0&& this.neighborDist) {
        sum.add(vehicles[i].velocity);
        count++;

      }

    }
    if (count>0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum,this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer)
    }

  }
  cohesion(vehicles){
    let sum = createVector();
    let count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      let d = p5.Vector.dist(this.position, vehicles[i].position);
      if (d>0&& this.neighborDist) {
        sum.add(vehicles[i].position);
        count++;
      }

    }
    if (count>0) {
      sum.div(count);
      //sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum,this.position);

      steer.limit(this.maxForce);
      this.applyForce(steer)
    }

  }
  flee(enemies){

    let sum = createVector();
    let count = 0;
    for (var i = 0; i < enemies.length; i++) {
      let enemy = enemies[i]
      let d = p5.Vector.dist(enemy.position, this.position)
      if((d > 0) && (d <= this.fear)){
        let diff = p5.Vector.sub(this.position, enemy.position);
        diff.normalize();
        diff.div(d)
        sum.add(diff.x,diff.y);
        count++;
    }
  }
    //sum.div(count);
    sum.setMag(this.maxSpeed)
    let desired = p5.Vector.sub(this.target, this.position);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

  }

  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
}
show(){
  fill(this.color);
  circle(this.position.x, this.position.y, this.velocity.mag()*10);
}

}
