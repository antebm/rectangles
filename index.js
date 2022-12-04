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
let score = 0;

function spawnRectangles() {
    
    const numberOfRectangles = 5 + Math.random() * 20;

    for(let i = 0; i < numberOfRectangles; i++){
        const size = 10 + Math.random() * 20;
        const x = Math.random() * (innerWidth-size);
        const y = Math.random() * (innerHeight-size);
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        rectangles.push(new Rectangle(x,y,size, color, velocity));
    }
    console.log(rectangles)
    
}

let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);
    
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    rectangles.forEach((rectangle, index)=>{
        rectangle.update();

        if(rectangle.x + rectangle.size >= canvas.width || 
            rectangle.x <= 0){
            rectangle.x = rectangle.x - rectangle.velocity.x;
            rectangle.velocity.x = - rectangle.velocity.x * Math.random()*2;
            rectangle.velocity.y = rectangle.velocity.y * Math.random()*2;
        } else if (rectangle.y + rectangle.size >= canvas.height ||
            rectangle.y <=0) {
                rectangle.y = rectangle.y - rectangle.velocity.y;
                rectangle.velocity.x = rectangle.velocity.x * Math.random()*2;
            rectangle.velocity.y = -rectangle.velocity.y * Math.random()*2;
        }
})
}

window.addEventListener('click', (event) => {
    rectangles.forEach((rectangle, index) => {
        if(event.clientX >= rectangle.x && event.clientX <= rectangle.x + rectangle.size 
            && event.clientY >= rectangle.y && event.clientY + rectangle.size) {
                rectangles.splice(index, 1);
                score = score+1;
                scoreEl.innerHTML = score;
            }
    })
});

spawnRectangles();
animate()

