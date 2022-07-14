const starting_velocity = 0.025

//Makes the ball class able to use on other files
export default class Ball {
    constructor(balljs) {
        this.balljs = balljs;
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

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            //determines direction
            const heading = randomNumberBetween(0, 2 * Math.PI);
            //converts direction to cords
            this.direction = { x: Math.cos(heading), y: Math.cos(heading) };
        }
        this.velocity = starting_velocity
    }

    update(delta) {
        this.x += this.direction * this.velocity * delta
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}