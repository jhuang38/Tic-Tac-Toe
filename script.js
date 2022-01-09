// tic tac toe script

// gameboard
const gameBoard = (() => {
    // array for managing game state
    let gameBoard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', '']];
    
    // update gameboard 
    const updateBoard = (row, column, value) => {
        gameBoard[row][column] = value;
    }

    // check for victory
    const victoryStatus = ((p1Symbol, p2Symbol) => {
        let check = false;
        for (let i = 0; i < 3; ++i) {
            // check rows
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2] && gameBoard[i][0] != ' ' && gameBoard[i][1] != ' ' && gameBoard[i][2] != ' ') {
                // condition for which player wins
                if (gameBoard[i][0] == p1Symbol && gameBoard[i][1] == p1Symbol && gameBoard[i][2] == p1Symbol) {
                    check = p1Symbol;
                } else if (gameBoard[i][0] == p2Symbol && gameBoard[i][1] == p2Symbol && gameBoard[i][2] == p1Symbol) {
                    check = p2Symbol;
                }
                break;
            }
            // check columns
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard [1][i] == gameBoard[2][i] && gameBoard[0][i] != ' ' && gameBoard[1][i] != ' ' && gameBoard[2][i] != ' ') {
                if (gameBoard[0][i] == p1Symbol && gameBoard[1][i] == p1Symbol && gameBoard[2][i] == p1Symbol) {
                    check = p1Symbol;
                } else if (gameBoard[0][i] == p2Symbol && gameBoard[1][i] == p2Symbol && gameBoard[2][i] == p2Symbol) {
                    check = p2Symbol;
                }
                break;
            }
        }
        // check diagonals
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] != ' ' && gameBoard[1][1] != ' ' &&  gameBoard[2][2] != ' ') {
            if (gameBoard[0][0] == p1Symbol && gameBoard[1][1] == p1Symbol && gameBoard[2][2] == p1Symbol) {
                check = p1Symbol;
            } else if (gameBoard[0][0] == p2Symbol && gameBoard[1][1] == p2Symbol && gameBoard[2][2] == p2Symbol) {
                check = p2Symbol;
            }
        }
        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[0][2] != ' ' && gameBoard[1][1] != ' ' && gameBoard[2][0] != ' ') {
            if (gameBoard[0][2] == p1Symbol && gameBoard[1][1] == p1Symbol && gameBoard[2][0] == p1Symbol) {
                check = p1Symbol;
            } else if (gameBoard[0][2] == p2Symbol && gameBoard[1][1] == p2Symbol && gameBoard[2][0] == p2Symbol) {
                check = p2Symbol;
            }
        }
        return check;
    });

    // honestly optional, but more abstraction is :)
    const doVictoryCheck = ((p1Sym, p2Sym) => {
        return victoryStatus(p1Sym, p2Sym);
    });

    return {
        updateBoard,
        doVictoryCheck,
    }
})();



// player object factory
const Player = (playerName, playerSymbol) => {
    let winStatus = false;
    let name = playerName;
    let symbol = playerSymbol;
    const getPlayerName = () => {
        return name;
    }
    const getPlayerSymbol = () => {
        return playerSymbol;
    }
    return {
        getPlayerName,
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
                        if (cell.textContent == ' ' && !victoryAchieved) {
                            cell.textContent = currentSymbol;
                            gameBoard.updateBoard(i, k, currentSymbol);
                            ++currentTurn;
                            currentSymbol = (currentTurn % 2 == 0) ? playerOne.getPlayerSymbol() : playerTwo.getPlayerSymbol();
                            let status = gameBoard.doVictoryCheck(playerOne.getPlayerSymbol(), playerTwo.getPlayerSymbol());
                            if (status == playerOne.getPlayerSymbol()) {
                                console.log(`${playerOne.getPlayerName()} wins!`);
                                victoryAchieved = true;
                            } else if (status == playerTwo.getPlayerSymbol()) {
                                console.log(`${playerTwo.getPlayerName()} wins!`);
                                victoryAchieved = true;
                            }
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
    playerOne = Player('Player one', 'X');
    playerTwo = Player('Player two', 'O');
    let currentTurn = 0;
    let currentSymbol = (currentTurn % 2 == 0) ? playerOne.getPlayerSymbol() : playerTwo.getPlayerSymbol();
    let victoryAchieved = false;
    displayController.addCells();
    
}

game();