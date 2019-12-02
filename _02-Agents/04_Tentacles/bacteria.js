
class Bacteria {
  constructor(x, y, numberOfTentacles, radius) {
    this.position = createVector(x,y);
    this.tentacles = [];
    for (var i = 0; i < numberOfTentacles; i++) {
      this.tentacles.push(new Tentacle(this.position.x + sin(i)*20, this.position.y + cos(i)*20, 100));
    }
}

show(vehicles){
  for (var i = 0; i < this.tentacles.length; i++) {

    this.tentacles[i].calculateTargetXY(vehicles);
    this.tentacles[i].show();
  }
}
move(){
  for (var i = 0; i < this.tentacles.length; i++) {
    this.tentacles[i].base.add(0.4,0.4);
  }
}
}
