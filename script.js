import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const aiPaddle = new Paddle(document.getElementById('ai-paddle'))


//loop to update at every changed frame
let lastTime
function updateloop(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        //for frame drops
        //ball.update(delta);
    }
    lastTime = time;
    window.requestAnimationFrame(updateloop);
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(updateloop);