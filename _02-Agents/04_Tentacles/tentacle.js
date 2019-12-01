
class Tentacle {
  constructor(x, y, numberOfSegments) {
    this.base = createVector(x,y);
    this.segments = [];
    this.target = createVector(1,2);
    for (let i = 0; i < numberOfSegments; i++) {
       const segment = new Segment(0,0,3,1);
       this.segments.push(segment);
     }
}

calculateTargetXY(newTrgt) {
 const ratio = 0.2;
 this.target.x = ratio * this.target.x + (1 - ratio) * newTrgt.x;
 this.target.y = ratio * this.target.y + (1 - ratio) * newTrgt.y;
}

show(){

  // Make segments follow their target
  for (let i = 0; i < this.segments.length; i++) {
    const x = i === 0 ? this.target.x : this.segments[i-1].a.x;
    const y = i === 0 ? this.target.y : this.segments[i-1].a.y;
    this.segments[i].follow(x, y);
    this.segments[i].update();
  }

  // Fix the segments to the base and display them
  for (let i = this.segments.length - 1; i >= 0; i--) {
    const pos = i === this.segments.length - 1 ? this.base : this.segments[i + 1].b
    this.segments[i].setA(pos.x, pos.y)
    this.segments[i].show(i / this.segments.length)
  }
}

}
