


function setup() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    createCanvas(width, height, WEBGL);
    // pixelDensity(2);


}

let weight = 1;
let noiseFactor = 90;
let resolution = 360;
let gap = 3;
let numberOfCurves = 40;
let speed = 0.04;
let noiseDetail = 0.025;

function draw() {

    noFill();
    strokeWeight(weight);

    let colorGen = new ColorGenerator('#9e2224');
    let complementary = colorGen.getShades(2);
    background("#362022");

    let colors = colorGen.getTints(numberOfCurves, 90);

    createNoisyCircles(width / 2, height / 2, colors);
}

function apply2DTransformations() {
    translate(-width / 2, -height / 2);
}

function createNoisyCircles(centerX, centerY, colors) {
    apply2DTransformations();
    for (j = 0; j < numberOfCurves; j++) {
        beginShape();
        stroke(colors[j % colors.length]);
        curveNoiseFactor = noiseFactor + j;

        for (i = 0; i <= resolution; i++) {
            circlePoint = map(i, 0, resolution, 0, TWO_PI);
            curveRadius = j * gap;

            x = centerX + cos(circlePoint) * curveRadius;
            y = centerY + sin(circlePoint) * curveRadius;

            n = noise(
                x * noiseDetail,
                y * noiseDetail,
                frameCount * speed
            );

            let offsetX = n * cos(circlePoint) * curveNoiseFactor;
            let offsetY = n * sin(circlePoint) * curveNoiseFactor;

            vertex(x + offsetX, y + offsetY);
        }
        endShape();
    }
}

function windowResized() {
    const container = document.body;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    resizeCanvas(newWidth, newHeight);
}