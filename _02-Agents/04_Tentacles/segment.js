
class Segment {
  constructor(x, y, length, angle) {
    this.a = createVector(x, y)
    this.b = createVector(x, y)
    this.length = length
    this.angle = angle
    this.calculateB()
  }

  follow(targetX, targetY) {
    const target = createVector(targetX, targetY)
    const direction = p5.Vector.sub(target, this.a)
    this.angle = direction.heading()

    direction.setMag(this.length)
    direction.mult(-1)
    this.a = p5.Vector.add(target, direction)
  }

  setA(x, y) {
    this.a.set(x, y)
    this.calculateB()
  }

  calculateB() {
    const dx = this.length * cos(this.angle)
    const dy = this.length * sin(this.angle)
    this.b.set(this.a.x + dx, this.a.y + dy)
  }

  update() {
    this.calculateB()
  }

  show(i) {
    stroke(255)
    strokeWeight(i * 4 + 2)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}
