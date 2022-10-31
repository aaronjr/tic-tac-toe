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
                // player.piece
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
            
                if((first != "" && second != "" && third != "") && (first === second && second === third)){
                    // return name of who won
                    return first
                }
            }
        }

        // check through 9 squares and see if any are blank
        const gameOver = function(){
            return Object.values(_board).includes("") ? false : true
        }

        // return functions
        return {updateBoard, gameOver, checkWinner}
    })()

    // controls flow of the game
    const Flow = (function(){
        'use strict'
        const play = (one, two) => {
            // prompt the next player and update board
            const choose = (player) => {
                if(!GameBoard.gameOver() && Boolean(!GameBoard.checkWinner())){
                    let choice = prompt("1 - 9")
                    GameBoard.updateBoard(player, choice)
                    player == one ? choose(two) : choose(one)
                }
                else if(GameBoard.gameOver() && Boolean(!GameBoard.checkWinner())){
                    return console.log("Draw")
                }
                else{
                    return console.log(GameBoard.checkWinner())
                }
            }
            // call function inside of play
            choose(one)
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

    // Flow.play(playerTwo, playerOne)

    // add 9 grids to page with index of its corresponding square.
    grid = document.querySelector(".myGrid")
    for(let i = 0; i < 9; i++){
        div = document.createElement('div')
        div.setAttribute("index", i +1)
        div.className = "square"
        grid.append(div)
    }
})