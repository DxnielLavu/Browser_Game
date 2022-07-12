const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//Makes canvas fit the entire screen
canvas.width = window.innerWidth;
canvas.height = innerHeight;

class Character {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill()
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Character(x, y, 30, 'blue')
player.draw()

class Bullet {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill()
    }
}

window.addEventListener('click', (event) => {
    const bullet = new Bullet(
        event.clientX, 
        event.clientY, 
        5, 
        'black',
        null
        )
    })