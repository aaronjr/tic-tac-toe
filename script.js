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
            if(_board[slot] == ""){
                _board[slot] = player.name
            }
            else{
                updateBoard(player, prompt("Choose again: 1-9"))
            }
        }
        // check for a winner
        const checkWinner = function(){
            let options = []

            // possible lines to win on
            let top = [1,2,3]
            let middle = [4,5,6]
            let bottom = [7,8,9]
            let left = [1,4,7]
            let center = [2,5,8]
            let right = [3,6,9]
            let diagLeft = [1,5,9]
            let diagRight = [3,5,7]

            // add to array
            options.push(top, middle, bottom, left, center, right, diagLeft, diagRight)

            // loop through board and see if any winners yet
            for(let i = 0; i < options.length; i++){
                let first = _board[options[i][0]]
                let second = _board[options[i][1]]
                let third = _board[options[i][2]]
                if(!options[i].includes("") && first === second && second === third && first === third){
                    console.log(`winner is ${first} winning blocks ${options[i][0]}, ${options[i][1]}, ${options[i][2]} `)
                    return first
                }
            }
        }

        // check for 9 inputs if "" is present
        const gameOver = function(){
            //for(let key in _board){
            //    _board[key] = "X"
            //}
            console.log(_board)
            return Object.values(_board).includes("") ? false : true
        }
        
        return {updateBoard, gameOver, checkWinner}
    })()

    const Flow = (function(){
        'use strict'
        let play = (one, two) => {
            // check if game over - if not accept inputs.
            // check again in the middle as odd amount of total turns. 
            while(!GameBoard.gameOver() || GameBoard.checkWinner){
                let oneChoice = prompt("1 - 9")
                GameBoard.updateBoard(one, oneChoice)
                if(GameBoard.gameOver() == true || GameBoard.checkWinner == true){
                    return `Game over, winner is ${GameBoard.checkWinner}`
                }
                let twoChoice = prompt("1 - 9")
                GameBoard.updateBoard(two, twoChoice)
            }

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

   //console.log(GameBoard.checkWinner())
})