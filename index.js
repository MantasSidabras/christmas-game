const debug = false;
let screen = 'end';
const startPos = -20;
var y = startPos;
var x = 200;
var speed = 3;
var score = 0;
const acceleration = 0.3;

const item = {
    width: 32,
    height: 32,
};

const sprite = {
    width: 100,
    height: 50,
};

const colider = {
    width: 50,
    height: 50,
};

const Color = {
    red: [230, 10, 10],
    green: [10, 230, 10],
};

let penguinImg;
let sled;
let bg;
let house_bg;
let end_bg;
let items = [];
let fontXmass;

function preload() {
    penguinImg = loadImage('assets/penguin.png');
    items = ['gift_1', 'gift_2', 'star', 'Candy_cane'].map(name => loadImage(`assets/icons/${name}.png`));
    bg = loadImage('assets/snow_bg.png');
    penguinImg = loadImage('assets/penguin_2.png');
    sled = loadImage('assets/sled.png');
    house_bg = loadImage('assets/house.jpeg');
    end_bg = loadImage('assets/end.png');
    fontXmass = loadFont('assets/Mountains_of_Christmas/MountainsofChristmas-Bold.ttf');
}

function setup() {
    createCanvas(600, 400);
    textFont(fontXmass);
}

function draw() {
    switch (screen) {
        case 'game': {
            gameOn();
            break;
        }
        case 'end': {
            endScreen();
            break;
        }
        default: {
            lobby();
        }
    }
}

let gift = null;

function lobby() {
    background(house_bg);
    image(penguinImg, 200, 230, 200, 100);

    push();
    fill(50, 50, 180);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 10, 200, 50, 10);
    textAlign(CENTER);
    textSize(24);
    fill(...Color.red);
    textStyle(BOLD);
    text('PLAY', width / 2, height / 2);
    pop();
}

function setRect() {
    const rectFill = color(245, 10, 10);
    rectFill.setAlpha(50);
    fill(rectFill);
}

function gameOverlay() {
    const rectFill = color(160);
    rectFill.setAlpha(50);
    fill(rectFill);
    noStroke();
    rect(0, 0, width, height);
}

function gameOn() {
    if (y == startPos) {
        pickRandom();
    }

    background(bg);
    push();
    gameOverlay();
    pop();

    drawScore();
    textSize(20);
    drawGift();
    drawPlayer();
    y += speed;
    if (y > height) {
        screen = 'end';
    }
    collision();
}

function overlayBg() {
    const rectFill = color(160);
    rectFill.setAlpha(120);
    fill(rectFill);
    noStroke();
    rect(0, 0, width, height);
}

function drawScore() {
    push();
    fill(0, 0, 0);
    textAlign(LEFT);
    text('score: ' + score, 30, 20);
    pop();
}

function drawGift() {
    image(gift, x - item.width / 2, y, item.width, item.height);
    if (debug) {
        setRect();
        rect(x - item.width / 2, y, item.width, item.height);
    }
}

function drawPlayer() {
    image(sled, mouseX - sprite.width / 2, height - sprite.height + 3, sprite.width, sprite.height);
    image(penguinImg, mouseX - sprite.width / 2, height - sprite.height - 20, sprite.width, sprite.height);
    if (debug) {
        setRect();
        rect(mouseX - colider.width / 2, height - colider.height, colider.width, colider.height);
    }
}

function collision() {
    if (
        y > height - colider.height - item.height &&
        x - item.width / 2 < mouseX + colider.width / 2 &&
        x + item.width / 2 > mouseX - colider.width / 2
    ) {
        y = -20;
        speed += acceleration;
        score += 1;
    }
}

function pickRandom() {
    x = random(20, width - 20);
    const rand = Math.floor(Math.random() * items.length);
    gift = items[rand];
}

function endScreen() {
    background(end_bg);
    overlayBg();
    push();
    fill(0, 0, 0);
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 10);
    text('SCORE: ', width / 2, height / 2 + 24);
    fill(...Color.green);
    text(score, width / 2 + 68, height / 2 + 24);

    fill(50, 50, 180);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 60, 200, 50, 10);
    fill(230, 10, 10);
    text('PLAY AGAIN', width / 2, height / 2 + 70);
    pop();
}

function mousePressed() {
    if (screen == 'lobby') {
        screen = 'game';
    }
    if (screen == 'end') {
        screen = 'lobby';
        reset();
    }
}

function reset() {
    score = 0;
    speed = 2;
    y = -20;
}
