import Ball from './ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const aiPaddle = new Paddle(document.getElementById('ai-paddle'))
const playerScore = document.getElementById('player-score')
const aiScore = document.getElementById('ai-score')
const buttonClick = document.getElementById('restartButton')
const resultElem = document.getElementById("result")

function updateloop() {
    ball.update([playerPaddle.rect(), aiPaddle.rect()]);
    aiPaddle.update(ball.y)
    if (ballLost()) whoScores()
    if (aiScore.textContent >= 3 || playerScore.textContent >= 3) {
        winCheck()
        return updateloop
    }
    window.requestAnimationFrame(updateloop);
}


//From https://stackoverflow.com/questions/27508025/html-javascript-how-can-i-make-a-button-appear-in-a-function
function buttonAppear() {
    document.getElementById("restartButton").innerHTML =
        '<button id="restartButton">Restart Game</button>';
}

buttonClick.addEventListener("click", () => {
    resetScore()
    resultElem.innerText = '';
    document.getElementById("restartButton").innerHTML = '';
    setTimeout(() => {
        window.requestAnimationFrame(updateloop);
    }, 1000)
})

function winCheck() {
    if (aiScore.textContent >= 3) {
        resultElem.innerText = "AI Wins!"
        buttonAppear()
    }
    else {
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
    const resetBallPos = ball.ballPos();
    return resetBallPos.right >= window.innerWidth || resetBallPos.left <= 0;
}

function whoScores() {
    const resetBallPos = ball.ballPos()
    if (resetBallPos.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        aiScore.textContent = parseInt(aiScore.textContent) + 1
    }
    ball.reset()
    aiPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

setTimeout(() => {
    window.requestAnimationFrame(updateloop);
}, 1000);