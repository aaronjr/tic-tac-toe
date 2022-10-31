document.addEventListener('DOMContentLoaded', () => {

    // create a player, name and X or O
    // use shorthand to return accesible variables
    const Player = (name, piece) => {
        return {name, piece}
    }
    form = document.querySelector('form')
    backForm = document.querySelector('.backForm')
    // check for form submission and save names
    form.addEventListener('submit', (event)=>{
        // stop submit
        event.preventDefault();
        let one = form.one.value
        let two = form.two.value

        // hide from
        form.style.display = "none"
        form.style.visibility = "hidden"
        backForm.style.display = "none"
        backForm.style.visibility = "hidden"

        // create players from inputted name
        const playerOne = Player(one, "X")
        const playerTwo = Player(two, "O")

        // set second player first so it's skipped within logic
        let last = "O"
        let playerCurrent = playerTwo
        document.addEventListener('click',(event)=>{
            if(event.target.className == "square"){
                if(!event.target.hasChildNodes()){ 
                    if(!GameBoard.gameOver()){
                        // update DOM where possible
                    last == "O" ? last = "X" : last = "O";
                    let p = document.createElement("p")
                    p.textContent = last
                    event.target.append(p)

                    // set the correct person and their choice
                    playerCurrent == playerTwo ? playerCurrent = playerOne : playerCurrent = playerTwo
                    let choice = event.target.getAttribute("index")

                    // Pass to function
                    Flow.play(playerCurrent, choice)
                    }
                    else{
                        // load a form to play again
                    }
                    
                }  
            }
        })
    })

    // add 9 grids to page with index of its corresponding square.
    grid = document.querySelector(".myGrid")
    for(let i = 0; i < 9; i++){
        div = document.createElement('div')
        div.setAttribute("index", i +1)
        div.className = "square"
        grid.append(div)
    }

    // below is the game.
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
            if ( Object.values(_board).includes("") && Boolean(!GameBoard.checkWinner())){
                return false 
            }
            else{
                return true 
            }
                
        }

        // return functions
        return {updateBoard, gameOver, checkWinner}
    })()

    // controls flow of the game
    const Flow = (function(){
        'use strict'
        const _choose = (player, choice) => {
            if(!GameBoard.gameOver()){
                // add choice
                GameBoard.updateBoard(player, choice)
            }
            if(GameBoard.gameOver() && Boolean(!GameBoard.checkWinner())){
                let outcome = document.querySelector('.outcome')
                outcome.textContent = "Draw"
            }
            if(Boolean(GameBoard.checkWinner())){
                let outcome = document.querySelector('.outcome')
                let winner = GameBoard.checkWinner()
                outcome.textContent = winner
            }
        }
        const play = (player, choice) => {    
            // call function inside of play
            _choose(player, choice)
        }
        return {play}
    })()

})