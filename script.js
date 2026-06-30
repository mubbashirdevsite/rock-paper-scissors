const buttons = document.querySelectorAll(".choices button");
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const drawScoreEl = document.getElementById("drawScore");
const roundEl = document.getElementById("round");
const resultText = document.getElementById("resultText");
const detailText = document.getElementById("detailText");
const restartBtn = document.getElementById("restartBtn");
const gameMode = document.getElementById("gameMode");

let userScore = 0;
let computerScore = 0;
let drawScore = 0;
let round = 1;
let gameOver = false;

const choices = ["rock", "paper", "scissors"];

buttons.forEach(btn => {
    btn.addEventListener("click", () => playGame(btn.dataset.choice));
});

restartBtn.addEventListener("click", resetGame);

function playGame(userChoice){

    if(gameOver) return;

    const computerChoice = choices[Math.floor(Math.random()*3)];

    let result = "";

    if(userChoice === computerChoice){
        result = "draw";
        drawScore++;
    }
    else if(
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ){
        result = "win";
        userScore++;
    }else{
        result = "lose";
        computerScore++;
    }

    updateUI(userChoice, computerChoice, result);

    round++;

    checkGameEnd();
}

function updateUI(user, comp, result){

    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;
    drawScoreEl.textContent = drawScore;

    roundEl.textContent = round;

    resultText.textContent =
        result === "win" ? "🎉 You Win!" :
        result === "lose" ? "💀 You Lose!" :
        "🤝 Draw!";

    detailText.textContent = `You: ${user} | Computer: ${comp}`;
}

function checkGameEnd(){

    const limit = parseInt(gameMode.value);

    if(limit === 0) return;

    if(userScore + computerScore + drawScore >= limit){

        gameOver = true;

        if(userScore > computerScore){
            resultText.textContent = "🏆 You Won the Game!";
        }
        else if(userScore < computerScore){
            resultText.textContent = "💻 Computer Wins the Game!";
        }
        else{
            resultText.textContent = "🤝 Game Draw!";
        }
    }
}

function resetGame(){

    userScore = 0;
    computerScore = 0;
    drawScore = 0;
    round = 1;
    gameOver = false;

    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    drawScoreEl.textContent = 0;
    roundEl.textContent = 1;

    resultText.textContent = "Make your move!";
    detailText.textContent = "";
}