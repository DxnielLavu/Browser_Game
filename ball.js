const starting_velocity = 0.3
const increase_velocity = 0.003

//Makes the ball class able to use on other files
export default class Ball {
    constructor(balljs) {
        this.balljs = balljs;
        this.reset()
    }

    //takes value from CSS to usable java number
    get x() {
        return parseFloat(getComputedStyle(this.balljs).getPropertyValue("--x"));
    }

    set x(value) {
        this.balljs.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.balljs).getPropertyValue("--y"));
    }

    set y(value) {
        this.balljs.style.setProperty("--y", value);
    }

    //function for resetting the ball if it hits border
    ballReposition() {
        return this.balljs.getBoundingClientRect()
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            //determines direction
            const heading = randomNumberBetween(0, 2 * Math.PI);
            //converts direction to cords
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = starting_velocity;
    }

    update(paddleRects) {
        this.x += this.direction.x * this.velocity;
        this.y += this.direction.y * this.velocity;
        this.velocity += increase_velocity;
        const borderHit = this.ballReposition()

        if (borderHit.bottom >= window.innerHeight || borderHit.top <= 0) {
            this.direction.y *= -1
        }
        if (paddleRects.some(r => collisionCheck(r, borderHit))) {
            this.direction.x *= -1
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function collisionCheck(rect1, rect2) {
    return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom
        && rect1.bottom >= rect2.top)
}
