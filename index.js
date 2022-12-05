const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');
const generatedEl = document.querySelector('#generatedEl');


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

const friction = 0.99;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }


    draw() {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}

let rectangles = [];
let particles = [];
let score = 0;

function spawnRectangles() {
    
    const numberOfRectangles = 5 + Math.random() * 20;

    for(let i = 0; i < numberOfRectangles; i++){
        // const size = 10 + Math.random() * 20;
        const size = 25;
        const x = Math.random() * (innerWidth-size);
        const y = Math.random() * (innerHeight-size);
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        rectangles.push(new Rectangle(x,y,size, color, velocity));
    }
    generatedEl.innerHTML = rectangles.length
    
}

let animationId;

function animate() {
    animationId = requestAnimationFrame(animate);
    
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // hit animation
    particles.forEach((particle, index) => {
        if(particle.alpha < 0) {
            particles.splice(index, 1);
        }
        particle.update();
    })
    
    // redraw rectangles
    rectangles.forEach((rectangle, index)=>{
        rectangle.update();
        
        // velocity change
        if(rectangle.x + rectangle.size >= canvas.width || 
            rectangle.x <= 0){
            rectangle.x = rectangle.x - rectangle.velocity.x;
            rectangle.velocity.x = - rectangle.velocity.x + (Math.random()-0.5)*3;
            rectangle.velocity.y = rectangle.velocity.y + (Math.random()-0.5) *3;
        } else if (rectangle.y + rectangle.size >= canvas.height ||
            rectangle.y <=0) {
                rectangle.y = rectangle.y - rectangle.velocity.y;
                rectangle.velocity.y = - rectangle.velocity.y + (Math.random()-0.5)*3;
            rectangle.velocity.x = rectangle.velocity.x + (Math.random()-0.5) *3;
        }
})
}

function createParticleEffect(x, y, color){
    for ( let i = 0; i < 10; i++) {
        console.log(x)
        particles.push(new Particle(x, y, Math.random()*2, color,{
            x: (Math.random() - 0.5) * 6,
            y: (Math.random() - 0.5) * 6
        }) )
    }
}

window.addEventListener('click', (event) => {
    rectangles.forEach((rectangle, index) => {
        if(event.clientX >= rectangle.x && event.clientX <= rectangle.x + rectangle.size 
            && event.clientY >= rectangle.y && event.clientY + rectangle.size) {
                console.log('hit')
                rectangles.splice(index, 1);
                const x = event.clientX;
                const y = event.clientY;
                createParticleEffect(x, y, rectangle.color);
                score = score+1;
                scoreEl.innerHTML = score;
            }
    })
});

spawnRectangles();
animate()

