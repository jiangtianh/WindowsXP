let boxes = [];
const boxSize = 40;
const spacing = 70;
const minRotationSpeed = 0.005;


function setup() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    createCanvas(width, height, WEBGL);

    const cols = floor(width / spacing);
    const rows = floor(height / spacing);
    const startX = -cols * spacing / 2 + spacing / 2;
    const startZ = -rows * spacing / 2 + spacing / 2;

    for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
            boxes.push({
                x: startX + x * spacing,
                y: startZ + z * spacing,
                z: 0,
                rotX: 0,
                rotY: 0,
                rotSpeedX: minRotationSpeed,
                rotSpeedY: minRotationSpeed,
                hovered: false,
            })
        }
    }
}

function windowResized() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    resizeCanvas(width, height);

    // Recalculate boxes for new dimensions
    boxes = [];
    const cols = floor(width / spacing);
    const rows = floor(height / spacing);
    const startX = -cols * spacing / 2 + spacing / 2;
    const startZ = -rows * spacing / 2 + spacing / 2;

    for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
            boxes.push({
                x: startX + x * spacing,
                y: startZ + z * spacing,
                z: 0,
                rotX: 0,
                rotY: 0,
                rotSpeedX: minRotationSpeed,
                rotSpeedY: minRotationSpeed,
                hovered: false,
            })
        }
    }
}

function draw() {
    background(250, 180, 200);

    let mouseXinWorld = mouseX - width / 2;
    let mouseYinWorld = mouseY - height / 2;


    for (let b of boxes) {

        let d = dist(mouseXinWorld, mouseYinWorld, b.x, b.y);
        b.hovered = d < boxSize * 3;

        if (b.hovered) {
            b.rotSpeedX = 0.05;
            b.rotSpeedY = 0.05;
        } else {
            b.rotSpeedX *= 0.95;
            if (b.rotSpeedX < minRotationSpeed) b.rotSpeedX = minRotationSpeed;
            b.rotSpeedY *= 0.95;
            if (b.rotSpeedY < minRotationSpeed) b.rotSpeedY = minRotationSpeed;
        }

        b.rotX += b.rotSpeedX;
        b.rotY += b.rotSpeedY;


        push(); // Save the current transformation state
        translate(b.x, b.y, b.z);
        rotateX(b.rotX);
        rotateY(b.rotY);

        if (b.hovered) {
            fill(255, 100, 100);
        } else {
            fill(255);
        }

        // noFill();
        box(boxSize);
        pop(); // Restore previous transformation state
    }
}