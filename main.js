let game = {};

const fighters = [
    {
        value: "rock",
        imgSrc: ("assets/happy-rocks.png")
    },
    {
        value: "paper",
        imgSrc: ("assets/happy-paper.png")
    },
    {
        value: "scissors",
        imgSrc: ("assets/happy-scissors.png")
    },
    {
        value: "lizard",
        imgSrc: ("assets/lizard.png")
    },
    {
        value: "alien",
        imgSrc: ("assets/happy-alien.png")
    },
]

function createGame() {
    game.player1 = createPlayer("Human", "👱‍♂️");
    game.player2 = createPlayer("Computer", "💻");
    game.gameType = null;
    game.currentMessage = null;
    return game;
}

function createPlayer(name, token) {
    return {
        name: name,
        token: token,
        currentFighter: null,
        wins: 0
    }
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function getRandomFighter() {
    if (game.gameType === "classic") {
        return fighters[getRandomIndex(3)];
    } else if (game.gameType === "difficult") {
        return fighters[getRandomIndex(5)];
    }
}

function takeTurn(chosenFighter) {
    game.player1.currentFighter = chosenFighter;
    game.player2.currentFighter = getRandomFighter();
    checkForDraw(game.player1.currentFighter.value, game.player2.currentFighter.value);
    console.table(game)
}

function checkForDraw(p1fighter, p2fighter) {
    if (p1fighter === p2fighter) {
        game.currentMessage = "It's a draw!"
    }
    else {
        checkForWin(p1fighter, p2fighter)
    }
}

function checkForWin(p1fighter, p2fighter) {
    if ((p1fighter === "rock" && p2fighter === "scissors") ||
        (p1fighter === "rock" && p2fighter === "lizard") ||
        (p1fighter === "paper" && p2fighter === "rock") ||
        (p1fighter === "paper" && p2fighter === "alien") ||
        (p1fighter === "scissors" && p2fighter === "paper") ||
        (p1fighter === "scissors" && p2fighter === "lizard") ||
        (p1fighter === "lizard" && p2fighter === "paper") ||
        (p1fighter === "lizard" && p2fighter === "alien") ||
        (p1fighter === "alien" && p2fighter === "scissors") ||
        (p1fighter === "alien" && p2fighter === "rock")) {
        game.player1.wins += 1;
        game.currentMessage = `${game.player1.token} ${game.player1.name} wins this round!`
    } else {
        game.player2.wins += 1;
        game.currentMessage = `${game.player2.token} ${game.player2.name} wins this round!`
    }
}

// dom manipulation

// 1. variables

var viewStart = document.querySelector(".view-start");
var viewGame = document.querySelector(".view-game");
var viewEndRound = document.querySelector(".view-end-round");

var btnBack = document.querySelector(".btn-back");
var btnsDifficult = document.querySelectorAll(".btn-fighter-diff");

var p1chosenFighter = document.querySelector(".player-1-chosen-fighter");
var p2chosenFighter = document.querySelector(".player-2-chosen-fighter");
var endRoundHeader = document.querySelector(".end-round-header");
var p1wins = document.querySelector(".p1wins");
var p2wins = document.querySelector(".p2wins");

// 2. functions

function hide(elem) {
    elem.classList.add("hidden");
}

function show(elem) {
    elem.classList.remove("hidden");
}

function renderStart() {
    show(viewStart);
    hide(viewGame);
    hide(viewEndRound);
    hide(btnBack);
}

function renderGame() {
    if (game.gameType === "classic") {
        btnsDifficult.forEach(btn => hide(btn));
    }
    if (game.gameType === "difficult") {
        btnsDifficult.forEach(btn => show(btn));
    }
    hide(viewStart);
    show(viewGame);
    hide(viewEndRound);
    show(btnBack);
}

function renderEndRound() {
    hide(viewGame);
    p1chosenFighter.style.backgroundImage = `url(${game.player1.currentFighter.imgSrc})`;
    endRoundHeader.textContent = "...";
    p2chosenFighter.style.backgroundImage = "none";
    p1wins.textContent = "...";
    p2wins.textContent = "...";
    show(viewEndRound);
    hide(btnBack);
    setTimeout(() => {
        p2chosenFighter.style.backgroundImage = `url(${game.player2.currentFighter.imgSrc})`;
    }, 200)
    setTimeout(() => {
        endRoundHeader.textContent = game.currentMessage;
        p1wins.textContent = game.player1.wins;
        p2wins.textContent = game.player2.wins;
    }, 600);
}

// 3. event listeners

viewStart.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-type")) {
        game.gameType = e.target.value;
        renderGame();
    }
});

viewGame.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-fighter")) {
        let p1chosenFighter = fighters.find(elem => elem.value === e.target.value);
        takeTurn(p1chosenFighter);
        renderEndRound();
        setTimeout(() => {
            renderGame();
        }, 2500);
    }
});

btnBack.addEventListener("click", renderStart);

window.addEventListener("load", function () {
    createGame();
    renderStart();
});








