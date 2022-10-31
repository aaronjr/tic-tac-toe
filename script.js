document.addEventListener('DOMContentLoaded', () => {
    const GameBoard = (function(){
        'use strict'
        // 9 squares of board
        const _board = {
            1 : '', 2 : '', 3 : '',
            4 : '', 5 : '', 6 : '',
            7 : '', 8 : '', 9 : ''
        }

        // update board, 
        const updateBoard = function(player, slot){
            _board[slot] = player
        }
        // check for 9 inputs if "" is present
        const gameOver = function(){
            //for(let key in _board){
            //    _board[key] = "X"
            //}
            console.log(_board)
            return Object.values(_board).includes("") ? false : true
        }
        
        return {updateBoard, gameOver}
    })()

    const Flow = (function(){
        'use strict'
        let play = (one, two) => {
            // check if game over - if not accept inputs.
            // check again in the middle as odd amount of total turns. 
            while(!GameBoard.gameOver()){
                let oneChoice = prompt("1 - 9")
                GameBoard.updateBoard(one, oneChoice)
                if(GameBoard.gameOver() == true){
                    break
                }
                let twoChoice = prompt("1 - 9")
                GameBoard.updateBoard(two, twoChoice)
            }
            GameBoard.gameOver() == true ? console.log('over') : console.log('how is it here')
        }
        return {play}
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
    // console.log(playerOne.name)
    // console.log(playerOne.piece)

    //GameBoard.updateBoard(playerOne.name, 6)
    // console.log(GameBoard.gameOver())
    Flow.play(playerTwo, playerOne)
})