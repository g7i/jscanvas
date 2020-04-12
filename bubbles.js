let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

const colors = [
    '#30C5FF',
    '#78E3FD',
    '#D1F5FF',
    '#EEF8FF',
    '#F55D3E',
]

let mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 60;

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
    init();
});

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
        this.dx = (Math.random() - 0.5) * 5;
        this.dy = (Math.random() - 0.5) * 5;
        this.color = colors[randomNumber(0, colors.length)]
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update() {
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.dx = -this.dx;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if (Math.abs(this.x - mouse.x) < 30 && Math.abs(this.y - mouse.y) < 30 && this.radius < maxRadius) {
            this.radius += 2;
        } else if (this.radius > this.minRadius) {
            this.radius -= 2;
        }
        
        this.draw();
    }
}

let circles;
function init() {
    circles = [];
    for (let i = 0; i < 500; i++){
        let radius = (Math.random() * 10) + 5;
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        circles.push(new Circle(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    circles.forEach(circle => {
     circle.update()
    })
  }

init();
animate();