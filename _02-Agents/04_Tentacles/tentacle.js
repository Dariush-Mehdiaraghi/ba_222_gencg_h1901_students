
class Tentacle {
  constructor(x, y, numberOfSegments) {
    this.base = createVector(x,y);
    this.segments = [];
    this.target = createVector();
    this.newTargetIndex = 0;
    this.isSearching = true;
    this.segmentLength = 1
    for (let i = 0; i < numberOfSegments; i++) {
       const segment = new Segment(0,0,this.segmentLength,1);
       this.segments.push(segment);
     }
}
isInRange(pos){
    return pos.dist(this.base)<=this.segmentLength*this.segments.length;
}

calculateTargetXY(particles) {
 const ratio = 0.6;

if (this.isSearching) {
  for (var i = 0; i < particles.length; i++) {
    if(this.isInRange(particles[i].position)&& particles[i].destiny == null && !particles[i].found){ //if has no particle grabbed and one is in range
        particles[i].destiny = this.base;
        this.newTargetIndex = i;
        this.isSearching = false;
        break;
    }
  }
}
if (!this.isSearching) {
  this.target.x = ratio * this.target.x + (1 - ratio) * particles[this.newTargetIndex].position.x;
  this.target.y = ratio * this.target.y + (1 - ratio) * particles[this.newTargetIndex].position.y;

}
if (particles[this.newTargetIndex].position.dist(this.base)<=10) {
   particles[this.newTargetIndex].found = true;
   this.isSearching = true;
   //this.newTargetIndex = 0;
}




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
