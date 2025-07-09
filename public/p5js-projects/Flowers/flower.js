class Flower {
    constructor(idx, r, pts, f_amp, period, speed) {
        this.idx = idx;
        this.x = [];
        this.y = [];
        this.r = r;
        this.pts = pts;

        this.f_radius = 0;
        this.f_amp = f_amp;
        this.period = period;

        this.speed = speed;
        this.rot = 0;
    }

    display() {
        push();
        beginShape();
        if (this.idx % 2 === 0) {
            fill(240, 240, 238);
        } else {
            fill(218, 161, 80);
        }

        for (let i = 0; i < this.pts; i++) {
            let angle = i / this.pts * 360;
            this.f_radius = this.f_amp * cos(angle * this.period);
            this.x[i] = (this.r + this.f_radius) * cos(angle + this.rot);
            this.y[i] = (this.r + this.f_radius) * sin(angle + this.rot);

            vertex(this.x[i], this.y[i]);
        }

        endShape(CLOSE);
        pop();
        this.rot += this.speed;
    }
}