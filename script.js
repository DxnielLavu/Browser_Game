import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const aiPaddle = new Paddle(document.getElementById('ai-paddle'))
const playerScore = document.getElementById('player-score')
const aiScore = document.getElementById('ai-score')
const buttonClick = document.getElementById('restartButton')
const resultElem = document.getElementById("result")

//loop to update at every changed frame
let lastTime
function updateloop(time) {
    if (lastTime != null) {
        //for frame drops
        ball.update([playerPaddle.rect(), aiPaddle.rect()]);
        aiPaddle.update(ball.y)

        if (ballLost()) lost()
    }
    if (aiScore.textContent >= 5 || playerScore.textContent >= 5) {
        winCheck()
        return updateloop
    }
    lastTime = time;
    window.requestAnimationFrame(updateloop);
}

//From https://stackoverflow.com/questions/27508025/html-javascript-how-can-i-make-a-button-appear-in-a-function
function buttonAppear() {
    document.getElementById("restartButton").innerHTML = '<button id="restartButton">Restart Game</button>';
}

buttonClick.addEventListener("click", () => {
    resetScore()
    resultElem.innerText = '';
    document.getElementById("restartButton").innerHTML = '';
    window.requestAnimationFrame(updateloop);
})

function winCheck() {
    if (aiScore.textContent >= 5) {
        resultElem.innerText = "AI Wins!"
        buttonAppear()
    }
    if (playerScore.textContent >= 5) {
        resultElem.innerText = "Player Wins!"
        buttonAppear()
    }
}

function resetScore() {
    playerScore.textContent = 0
    aiScore.textContent = 0
    ball.reset();
    aiPaddle.reset();
}

function ballLost() {
    const borderBounce = ball.ballReposition();
    return borderBounce.right >= window.innerWidth || borderBounce.left <= 0;
}

function lost() {
    const borderBounce = ball.ballReposition()
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