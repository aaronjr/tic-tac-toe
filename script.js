document.addEventListener('DOMContentLoaded', ()=>{
    const gameBoard = (function (){
        'use strict'
        // 9 squares of board
        let _board = {
            1 : '',
            2 : '',
            3 : '',
            4 : '',
            5 : '',
            6 : '',
            7 : '',
            8 : '',
            9 : ''
        }

        let updateBoard = function(choice, slot){
            _board[slot] = choice
            console.log(_board)
        }
        return {updateBoard}
    })()

    const Player = (name, piece) => {
        console.log(name, piece)
    }

    const playerOne = Player("Aaron", "X")
    const playerTwo = Player("Anna", "O")

    choice = prompt("x or o")
    slot = prompt("1 - 9")
    gameBoard.updateBoard(choice, slot)
})