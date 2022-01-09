// tic tac toe script

// gameboard
const gameBoard = (() => {
    let gameBoard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    const updateBoard = (row, column, value) => {
        gameBoard[row][column] = value;
        console.log(gameBoard);
    }
    return {
        updateBoard,
    }
})();



// player object factory
const Player = (playerName, playerSymbol) => {
    let winStatus = false;
    let symbol = playerSymbol;
    const getPlayerSymbol = () => {
        // for debugging purposes
        console.log(`Returned ${playerName}'s symbol`)
        // ^^^^^^^
        return playerSymbol;
    }
    return {
        getPlayerSymbol,
    }
}

// game function
function game() {
    // game controller
    const displayController = (() => {
        const board = document.querySelector(`.board`);
    
        function addCells() {
            for (let i = 0; i < 3; ++i) {
                for (let k = 0; k < 3; ++k) {
                    newCell = document.createElement('div');
                    newCell.classList.add('cell');
                    newCell.setAttribute('data-row', `${i}`);
                    newCell.setAttribute('data-column', `${k}`);
                    newCell.textContent = " ";
                    board.appendChild(newCell);
                }
            }
            // add event listeners for each cell
            for (let i = 0; i < 3; ++i) {
                for (let k = 0; k < 3; ++k) {
                    const cell = document.querySelector(`[data-row="${i}"][data-column="${k}"]`);
                    cell.addEventListener('click', () => {
                        if (cell.textContent == ' ') {
                            console.log(currentSymbol);
                            cell.textContent = currentSymbol;
                            gameBoard.updateBoard(i, k, currentSymbol);
                            ++currentTurn;
                            currentSymbol = (currentTurn % 2 == 0) ? playerOne.getPlayerSymbol() : playerTwo.getPlayerSymbol();
                        }
                    });
                }
            }
        }
    
        return {
            addCells,
        }
    })();
    // player 1 plays on turn 0, 2, 4, etc.
    // player 2 plays on 1,3,5, ...
    // 
    playerOne = Player('playerOne', 'X');
    playerTwo = Player('playerTwo', 'O');
    let currentTurn = 0;
    let currentSymbol = (currentTurn % 2 == 0) ? playerOne.getPlayerSymbol() : playerTwo.getPlayerSymbol();
    let victoryAchieved = false;
    displayController.addCells();
    
}

game();