import Ball from './ball'

const ball = Ball(document.getElementById('ball'));


//loop to update at every changed frame
let lastTime
function updateloop(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        //for frame drops
        ball.update(delta);
    }
    lastTime = time;
    window.requestAnimationFrame(updateloop);
}

window.requestAnimationFrame(updateloop);