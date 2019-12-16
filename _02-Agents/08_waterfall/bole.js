class Bole {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.originalRad = radius;
        this.color = color;
        this.restitution = 0.8;
        this.isClicked = false;
        this.options = {
            friction: 0.5,
            restitution:0.7,
            frictionStatic:0,
            collisionFilter: {
               group: -1 //would remove collision on each other
           }
        }
        this.body = Bodies.circle(this.x, this.y, this.rad, this.options);
        // Matter.Body.setVelocity(this.body, {x:random(-3,3),y:random(-1,1)});
        World.add(engine.world, this.body);

    }

    show() {

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        fill(this.color);
        circle(0, 0, this.rad);
        pop();

    }

    applyAForce(x, y) {
        this.body.force = {x: x, y: y}
    }

}
