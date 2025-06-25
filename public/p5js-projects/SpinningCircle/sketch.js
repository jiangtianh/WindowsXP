let x; let y; let angle = 0;
let x2; let y2;
let r = 300;
let circleD = 35;
let shiftingAngle = [];
let numAxis = 12;
let x2s = [];
let y2s = [];

function setup() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    createCanvas(width, height);
    angleMode(DEGREES);

    for (let i = 0; i < numAxis; i++) {
        shiftingAngle.push(i * 90 / numAxis);
    }
}


function draw() {
    background(224, 192, 203);
    stroke(255, 100);

    x = r * cos(angle);
    y = r * sin(angle);

    translate(width / 2, height / 2);
    noFill();


    ellipse(0, 0, r * 2, r * 2);

    fill(0);
    // ellipse(x, y, 20, 20);

    fill(255);

    for (let i = 0; i < numAxis; i++) {
        x2s[i] = r * cos(angle + shiftingAngle[i]);
        y2s[i] = r * sin(angle + shiftingAngle[i]);

        push();
        rotate(-shiftingAngle[i]);
        line(-r, 0, r, 0);
        line(0, -r, 0, r);
        ellipse(x2s[i], 0, circleD * 0.7, circleD);
        ellipse(0, y2s[i], circleD, circleD * 0.7);
        pop();
    }

    angle += 1;
    if (angle === 360) {
        angle = 0;
    }
}

function windowResized() {
    const container = document.body;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    resizeCanvas(newWidth, newHeight);
}