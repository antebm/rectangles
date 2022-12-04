const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');


class Rectangle {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

let rectangles = [];

function spawnRectangles() {
    
    const numberOfRectangles = 5+ Math.random() * 20;

    for(let i; i < numberOfRectangles; i++){
        const size = 4 + Math.random() * 10;
        const x = Math.random() * (innerWidth-size);
        const y = Math.random() * (innerHeight-size);
        const color = 'red';
        const velocity = Math.random*4 + 1;
        rectangles.push(new Rectangle(x,y,size, color, velocity));
    }
    
}

function animate() {
    //nimationId = requestAnimationFrame(animate);
    rectangles.forEach((rectangle, index)=>{
        rectangle.rectangle();
    })
}

animate();
spawnRectangles();
