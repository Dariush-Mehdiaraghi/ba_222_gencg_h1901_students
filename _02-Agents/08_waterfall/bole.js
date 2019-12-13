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
            friction: 0.1,
            restitution:0.3
        }
        this.body = Bodies.circle(this.x, this.y, this.rad, this.options);
//  Matter.Body.setVelocity(this.body, {x:random(-3,3),y:random(-1,1)});

        World.add(engine.world, this.body);

    }

    show() {

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        //stroke(255,255,255, 2);

        fill(this.color);
        circle(0, 0, this.rad * 2);
        pop();
        if (this.isClicked) {
            let i = 200;
            this.rad *= sin(i);
            Matter.Body.scale(this.body, sin(i), sin(i));
            i--;
            if (this.rad <= 1) {
                this.isClicked = false;
            }
        }
    }

    applyAForce(x, y) {
        this.body.force = {x: x, y: y}
    }

    handleClick() {
        this.isClicked = true;
    }

    scaleRad(bass, lowMid, mid, highMid, treble) {
        let pos = 0;
        let windowDim = 0;
        if (windowWidth > 600) {
            pos = this.x;
            windowDim = windowWidth;
        } else {
            pos = this.y;
            windowDim = windowHeight;
        }
        if (pos <= (windowDim * 0.2)) {
            this.rad = this.originalRad * map(bass, 0, 255, 0, 2);
            return;
        }
        if (pos <= (windowDim * 0.4) && pos >= (windowDim * 0.2)) {
            this.rad = this.originalRad * map(lowMid, 0, 255, 0, 2);
            return;
        }
        if (pos <= (windowDim * 0.6) && pos >= (windowDim * 0.4)) {
            this.rad = this.originalRad * map(mid, 0, 255, 0, 2);
            return;
        }
        if (pos <= (windowDim * 0.8) && pos >= (windowDim * 0.6)) {
            this.rad = this.originalRad * map(highMid, 0, 255, 0, 2);
            return;
        }
        if (pos <= (windowDim * 1) && pos >= (windowDim * 0.8)) {
            this.rad = this.originalRad * map(treble, 0, 255, 0, 2);
            return;
        }

    }


}
