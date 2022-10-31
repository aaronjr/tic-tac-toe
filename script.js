document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = (function(){
        'use strict'
        // 9 squares of board
        const _board = {
            1 : '', 2 : '', 3 : '',
            4 : '', 5 : '', 6 : '',
            7 : '', 8 : '', 9 : ''
        }

        // update board, 
        const updateBoard = function(player, slot = 1){
            _board[slot] = player
        }
        // check for 9 inputs
        const gameOver = function(){
            let used = 0
            for(let key in _board){
                // below fills all blocks
                // _board[key] = "X"
                !_board[key] == "" ? used++ : used
            }
            return used == 9 ? true : false
        }
        
        return {updateBoard, gameOver}
    })()

    // create a player, name and X or O
    // use shorthand to return accesible variables
    const Player = (name, piece) => {
        return {name, piece}
    }

    // Create player - will be dynamic
    const playerOne = Player("Aaron", "X")
    const playerTwo = Player("Anna", "O")

    // choice = prompt("x or o")
    // slot = prompt("1 - 9")
    // gameBoard.updateBoard(choice, slot)

    console.log(playerOne.name)
    console.log(playerOne.piece)

    gameBoard.updateBoard(playerOne.name, 6)
    console.log(gameBoard.gameOver())
})