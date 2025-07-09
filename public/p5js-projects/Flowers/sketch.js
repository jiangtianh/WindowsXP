let flowers = [];
let num = 31;


function setup() {
    const container = document.body;
    const width = container.clientWidth;
    const height = container.clientHeight;
    createCanvas(width, height);
    angleMode(DEGREES);


    for (let i = 0; i < num; i++) {
        let amp = num - i - 1;

        flowers[i] = new Flower(i, 300 - i * 10, 300, amp, 12, (i + 1) * 0.1);
    }
}

function draw() {
    background(251, 198, 207);
    translate(width / 2, height / 2);

    for (let i = 0; i < num; i++) {
        flowers[i].display();
    }
}

function windowResized() {
    const container = document.body;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    resizeCanvas(newWidth, newHeight);
}