let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight - 10;
canvas.width = window.innerWidth - 10;

const colors = [
    '#00bdff',
	'#4d39ce',
	'#088eff',
]

let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

let state = 1;
let bgState = 1;

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
    init();
});

addEventListener("click", function() {
    state = -state;
});

addEventListener("dblclick", function () {
    bgState = -bgState;
});

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function round(s, val) {
    if (s == state) {
        return Math.cos(val);
    }
    return Math.sin(val);
}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colors[randomNumber(0, 3)];
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distance = randomNumber(50, 120);
        this.lastMouse = {
            x: x,
            y: y
        };
    }
        draw (lastPoint) {
            c.beginPath();
            c.strokeStyle = this.color;
            c.lineWidth = this.radius;
            c.moveTo(lastPoint.x, lastPoint.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        };
        update () {
            let lastPoint = {
                x: this.x,
                y: this.y
            };
            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
            this.x = this.lastMouse.x + round(1, this.radians) * this.distance;
            this.y = this.lastMouse.y + round(-1, this.radians) * this.distance;
            this.radians += this.velocity;
            this.draw(lastPoint);
        };
}

let circles = [];
function init() {
    circles = [];
    for (let i = 0; i < 50; i++){
        let radius = randomNumber(0, 7)
        circles.push(new Circle(canvas.width/2, canvas.height/2, radius));
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = bgState === 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    circles.forEach(circle => {
        circle.update()
       })
  }

init();
animate();