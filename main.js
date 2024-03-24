let game = {};

function createGame() {
    game.player1 = createPlayer("Human", "🤗");
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
    const fighters = ["rock", "paper", "scissors", "lizard", "alien"];
    if (game.gameType === "classic") {
        return fighters[getRandomIndex(3)];
    } else if (game.gameType === "difficult") {
        return fighters[getRandomIndex(5)];
    }
}

function takeTurn(chosenFighter) {
    game.player1.currentFighter = chosenFighter;
    game.player2.currentFighter = getRandomFighter();
    checkForDraw(game.player1.currentFighter, game.player2.currentFighter);
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
        game.currentMessage = `${game.player1.name} wins this round!`
    } else {
        game.player2.wins += 1;
        game.currentMessage = `${game.player2.name} wins this round!`
    }
}

// dom manipulation

var viewStart = document.querySelector(".game-type-view");
var viewGame = document.querySelector(".choose-fighter-view");
var viewEndRound = document.querySelector(".end-round-view");

var btnChange = document.querySelector(".btn-change");
var btnsDifficult = document.querySelectorAll(".btn-fighter-diff");

viewStart.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-type")) {

        game.gameType = e.target.value;
        hide(viewStart);
        show(viewGame);
        hide(viewEndRound);
        show(btnChange);
    }
    if (game.gameType === "classic") {
        btnsDifficult.forEach(btn => hide(btn));
    }
    if (game.gameType === "difficult") {
        btnsDifficult.forEach(btn => show(btn));
    }
});

viewGame.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-fighter")) {
        hide(viewGame);
        hide(btnChange);
        takeTurn(e.target.value);
        renderEndRoundView();
        show(viewEndRound);
        setTimeout(() => {
            hide(viewEndRound);
            show(viewGame);
            show(btnChange);
        }, 3500);
    }
});

btnChange.addEventListener("click", function () {
    show(viewStart);
    hide(viewGame);
    hide(viewEndRound);
    hide(btnChange)
})

function hide(elem) {
    elem.classList.add("hidden");
}

function show(elem) {
    elem.classList.remove("hidden");
}

p1chosenFighter = document.querySelector(".player-1-chosen-fighter");
p2chosenFighter = document.querySelector(".player-2-chosen-fighter");
endRoundHeader = document.querySelector(".end-round-header");
p1wins = document.querySelector(".p1wins");
p2wins = document.querySelector(".p2wins");

function renderEndRoundView() {
    endRoundHeader.textContent = game.currentMessage;
    p1chosenFighter.textContent = game.player1.currentFighter;
    p2chosenFighter.textContent = game.player2.currentFighter;
    p1wins.textContent = game.player1.wins;
    p2wins.textContent = game.player2.wins;
}



hide(viewGame);
hide(viewEndRound);
hide(btnChange);
createGame();
