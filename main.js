function createPlayer(name, token) {
    return {
        name: name,
        token: token,
        currentWeapon: null,
        wins: 0
    }
}

let game = {};

function createGame() {
    game.player1 = createPlayer("Human", "🤗");
    game.player2 = createPlayer("Computer", "💻");
    game.gameType = "simple";
    return game;
}

const weapons = ["rock", "paper", "scissors"];


// function takeTurn() {

// }

// function checkForWin() {

// }

// function checkForDraw() {

// }

// function resetGameBoard() {

// }