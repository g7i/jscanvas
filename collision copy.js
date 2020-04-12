let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight - 10;
canvas.width = window.innerWidth - 10;

const colors = [
    '#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
]

let mouse = {
    x: undefined,
    y: undefined
}

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
    init();
});

function getDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = this.minRadius = radius;
        this.color = color
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update() {
        this.draw();
    }
}

let circleBig, circleSmall;
function init() {
        circleBig = new Circle(canvas.width/2, canvas.height/2, 80, colors[3]);
        circleSmall = new Circle(mouse.x, mouse.y, 30, colors[0]);
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    circleBig.update()
    circleSmall.x = mouse.x;
    circleSmall.y = mouse.y;
    circleSmall.update();
    if (getDistance(circleSmall.x, circleBig.x, circleSmall.y, circleBig.y) < circleSmall.radius + circleBig.radius) {
        circleBig.color = colors[0];
    } else {
        circleBig.color = colors[3];
    }
}

init();
animate();