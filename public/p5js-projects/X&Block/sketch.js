let blocks = [];
let size = 10;
let offset = 4;
let cols; let rows;

function setup() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;

    createCanvas(width, height);
    rectMode(CENTER);
    angleMode(DEGREES);

    cols = width / size;
    rows = height / size;

    for (let i = 0; i < cols; i++) {
        blocks.push([]);
        for (let j = 0; j < rows; j++) {
            blocks[i].push(new Block(i * size, j * size));
        }
    }

}

function draw() {
    background(0);
    frameRate(60);
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            blocks[i][j].move();
            blocks[i][j].display();

        }
    }
}

function windowResized() {
    const container = document.body;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    resizeCanvas(newWidth, newHeight);
    cols = newWidth / size;
    rows = newHeight / size;
    blocks = [];
    for (let i = 0; i < cols; i++) {
        blocks.push([]);
        for (let j = 0; j < rows; j++) {
            blocks[i].push(new Block(i * size, j * size));
        }
    }
}