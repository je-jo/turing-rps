let game = {};

function createGame() {
    game.player1 = createPlayer("Human", "🤗");
    game.player2 = createPlayer("Computer", "💻");
    game.gameType = "difficult";
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

function takeTurn() {
    game.player1.currentFighter = getRandomFighter();
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