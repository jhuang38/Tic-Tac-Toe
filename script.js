// tic tac toe script

// gameboard
const gameBoard = (() => {
    let gameBoard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    const updateBoard = (row, column, value) => {
        gameBoard[row][column] = value;
    }
    return {
        updateBoard,
    }
})();

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
                console.log(newCell);
                newCell.addEventListener('click', () => {
                    console.log(i, k);
                    // why does this keep targeting the last cell?
                    console.log(newCell);
                });
            }
        }
    }
    
    // add event listeners for each new cell

    const initializeBoard = () => {

    }

    return {
        initializeBoard,
        addCells,
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
    playerOne = Player('X');
    playerTwo = Player('O');
    displayController.addCells();
    
}

game();