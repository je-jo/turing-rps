let game = {};

function createPlayer(name, token) {
    return {
        name: name,
        token: token,
        currentWeapon: null,
        wins: 0
    }
}

function createGame() {
    game.player1 = createPlayer("Human", "🤗");
    game.player2 = createPlayer("Computer", "💻");
    game.gameType = "classic";
    game.currentMessage = null;
    return game;
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getRandomFighter() {
    const weapons = ["rock", "paper", "scissors"];
    const weaponsDifficult = ["rock", "paper", "scissors", "lizzard", "alien"];
    if (game.gameType === "classic") {
        return weapons[getRandomIndex(weapons)];
    } else if (game.gameType === "difficult") {
        return weaponsDifficult[getRandomIndex(weaponsDifficult)];
    }
}

function takeTurn() {
    game.player1.currentWeapon = getRandomFighter();
    game.player2.currentWeapon = getRandomFighter();
    checkForDraw(game.player1.currentWeapon, game.player2.currentWeapon);
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
        (p1fighter === "scissors" && p2fighter === "lizzard") ||
        (p1fighter === "lizzard" && p2fighter === "paper") ||
        (p1fighter === "lizzard" && p2fighter === "alien") ||
        (p1fighter === "alien" && p2fighter === "scissors") ||
        (p1fighter === "alien" && p2fighter === "rock")) {
        game.player1.wins += 1;
        game.currentMessage = `${game.player1.name} wins this round!`
    } else {
        game.player2.wins += 1;
        console.log(`${game.player2.name} wins this round!`)
        game.currentMessage = `${game.player2.name} wins this round!`
    }
}

// function resetGameBoard() {

// }

createGame();