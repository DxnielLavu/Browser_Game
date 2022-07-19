import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const aiPaddle = new Paddle(document.getElementById('ai-paddle'))
const playerScore = document.getElementById('player-score')
const aiScore = document.getElementById('ai-score')


//loop to update at every changed frame
let lastTime
function updateloop(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        //for frame drops
        ball.update(delta, [playerPaddle.hit(), aiPaddle.hit()]);
        aiPaddle.update(delta, ball.y)

        if (ballLost()) lost()
    }
    if (aiScore.textContent >= 2) {
        resetGame()
    }
    lastTime = time;
    window.requestAnimationFrame(updateloop);
}

function resetGame() {
    playerScore.textContent = 0
    aiScore.textContent = 0
    ball.reset();
    aiPaddle.reset();
}

function ballLost() {
    const borderBounce = ball.borderBounce();
    return borderBounce.right >= window.innerWidth || borderBounce.left <= 0;
}

function lost() {
    const borderBounce = ball.borderBounce()
    if (borderBounce.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    } else {
        aiScore.textContent = parseInt(aiScore.textContent) + 1
    }
    ball.reset()
    aiPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(updateloop);