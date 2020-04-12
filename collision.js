import resolveCollision from './utility.js';

let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight - 10;
canvas.width = window.innerWidth - 10;

const colors = [
    '#30C5FF',
    '#00FF00',
    '#FFFF00',
    '#00FFFF',
    '#F55D3E',
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
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = this.minRadius = radius;
        this.velocity = {
            x : randomNumber(-3, 3),
            y : randomNumber(-2, 2),
        }
        this.mass = 1;
        this.color = colors[randomNumber(0, colors.length)]
        this.opacity = 0;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
    update = items => {

        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (Math.abs(this.x - mouse.x) < 150 && Math.abs(this.y - mouse.y) < 30) {
            if (this.opacity < 0.5) {
                this.opacity += 0.1;
            }
            if (this.radius < this.minRadius + 10) {
                this.radius += 2;
            }
        } else {
            if (this.opacity > 0) {
                this.opacity -= 0.1;
                this.opacity = Math.max(0, this.opacity);
            }
            if (this.radius > this.minRadius) {
                this.radius -= 2;
            }
        }

        items.forEach(item => {
            if (item !== this) {
                if (getDistance(this.x, item.x, this.y, item.y) - (this.radius+item.radius) < 0) {
                    resolveCollision(this, item);
                }
            }
        });

        this.draw();
    }
}

let circles;
function init() {
    circles = [];
    const num = Math.floor(canvas.width / 20);
    for (let i = 0; i < num; i++){
        let radius = randomNumber(15, 40);
        let x = randomNumber(radius, canvas.width-radius);
        let y = randomNumber(radius, canvas.height - radius);
        
        if (i !== 0) {
            for (let j = 0; j < circles.length; j++) {
                if (getDistance(x, circles[j].x, y, circles[j].y) - (radius+circles[j].radius) < 0) {
                    x = randomNumber(radius, canvas.width-radius);
                    y = randomNumber(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }

        circles.push(new Circle(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    circles.forEach(circle => {
        circle.update(circles)
       })
  }

init();
animate();