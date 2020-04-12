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
var gravity = 0.2;
var friction = 0.9;

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
        this.dx = randomNumber(-4, 4);
        this.dy = randomNumber(-2, 2);
        this.radius = this.minRadius = radius;
        this.color = colors[randomNumber(0, colors.length)]
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
    update() {
        if (this.y + this.dy > canvas.height - this.radius) {
            this.dy = -this.dy * friction;
            this.dx = this.dx * friction;
        } else {
			this.dy += gravity;
        }
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }
        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }
}

let circles;
function init() {
    circles = [];
    for (let i = 0; i < 500; i++){
        let radius = randomNumber(8, 20);
        let x = randomNumber(radius, canvas.width-radius);
        let y = randomNumber(radius, canvas.height-radius);
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