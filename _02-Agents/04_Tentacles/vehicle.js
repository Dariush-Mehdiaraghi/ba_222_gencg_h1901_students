
class Vehicle {
  constructor(posX, posY, targX, targY, velX, velY) {
    this.destiny = null;
    this.position = createVector(posX, posY);
    this.velocity = createVector(velX, velY);
    this.acceleration = createVector();
    this.maxSpeed = 6;
    this.maxForce = 2;
    this.found = false;
    this.terminator = false;
  //  this.history = [];
    this.arriveR = 5;
    this.fear = 1;
    this.lastPosition = createVector(posX, posY);
}

  applyForce(vecForce){
    this.acceleration = vecForce;
  }
  seek(){
    if (this.destiny !=null) {


      let desired = p5.Vector.sub(this.destiny, this.position);
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
    }
  }
    //sum.div(count);
    sum.setMag(this.maxSpeed)
    // let desired = p5.Vector.sub(this.destiny, this.position);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

  }

  update(){

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    //  this.history.push(createVector(this.position.x, this.position.y));

}
show(){

/*   if(this.terminator){
    stroke(200,255,0)
  }else {
      stroke(255);
  }
*/
fill(255)
circle(this.position.x, this.position.y, 5);

}

}
