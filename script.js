document.addEventListener('DOMContentLoaded', ()=>{
    const gameBoard = (function (){
        'use strict'
        // 9 squares of board
        const _board = {
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

        const _gameOver = function(){
            let result = ""
            let used = 0
            for(let key in _board){
                // below fills all blocks
                // _board[key] = "X"
                if(!(_board[key] == "")){
                    used++
                }
                console.log(_board[key])
            }

            return result = used == 9 ? true : false
        }

        const updateBoard = function(choice = "x", slot = 1){
            _board[slot] = choice
            console.log(_board)
            console.log(_gameOver())
        }
        
        return {updateBoard}
    })()

    const Player = (name, piece) => {
        console.log(name, piece)
    }

    const playerOne = Player("Aaron", "X")
    const playerTwo = Player("Anna", "O")

    // choice = prompt("x or o")
    // slot = prompt("1 - 9")
    // gameBoard.updateBoard(choice, slot)

    gameBoard.updateBoard()
})