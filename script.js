document.addEventListener('DOMContentLoaded', () => {

    // create a player, name and X or O
    // use shorthand to return accesible variables
    class Player{
        constructor(name, piece){
            this.name = name;
            this.piece = piece
        }
    }

    // get items for making input form float on screen
    const formNames = document.querySelector('.formNames')
    const backForm = document.querySelector('.backForm')
    // play again form
    const formAgain = document.querySelector('.formAgain')
    // outcome div
    const outcome = document.querySelector('.outcome')

    // check for form submission and save names
    formNames.addEventListener('submit', (event)=>{
        // stop submit
        event.preventDefault();

        // hide form
        formNames.style.display = "none"
        formNames.style.visibility = "hidden"
        backForm.style.display = "none"
        backForm.style.visibility = "hidden"

        // create players from inputted name
        playerOne = new Player(formNames.one.value, "X")
        playerTwo = new Player(formNames.two.value, "O")

        // call function to listen for events
        flow = new Flow(playerOne, playerTwo)
        flow.listen()
    })

    // below is the game.
    const GameBoard = (function(){
        'use strict'
        // 9 squares of board
        const _board = {
            1 : '', 2 : '', 3 : '',
            4 : '', 5 : '', 6 : '',
            7 : '', 8 : '', 9 : ''
        }

        // loop over the board and reset to empty values
        const clearBoard = function(){
            for(let slot in _board){
                _board[slot] = ""
            }
        }

        // update board, 
        const updateBoard = function(player, slot){   
            _board[slot] = player.name
        }
        // check for a winner
        const checkWinner = function(){
            // empty array
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
        // also check there isn't already a winner before 9 squares are played
        const gameOver = function(){
            return Object.values(_board).includes("") && Boolean(!GameBoard.checkWinner()) ? false : true
        }

        // return functions
        return {updateBoard, gameOver, checkWinner, clearBoard}
    })()

    // controls flow of the game
    class Flow{
        constructor (one, two){
            this.one = one
            this.two = two
        }
        'use strict'
        _choose = (player, choice) => {
            // if game isn't over update board
            if(!GameBoard.gameOver()){
                // add choice
                GameBoard.updateBoard(player, choice)
            }
            // if 9 squares played and no winner - display draw
            if(GameBoard.gameOver() && Boolean(!GameBoard.checkWinner())){
                outcome.textContent = "It's a draw"
                setTimeout(function() { flow.again() }, 1500);
            }
            // if winner, display name
            if(Boolean(GameBoard.checkWinner())){
                let winner = GameBoard.checkWinner()
                outcome.textContent = `${winner} won!`
                // wait 1.5 seconds and load again function
                setTimeout(function() { flow.again() }, 1500);
            }
        }

        listen = () => {
            // set second player first so it's skipped within logic
            let last = this.two.piece
            let playerCurrent = this.two

            // listen for clicked square
            document.addEventListener('click',(event)=>{
                if(event.target.className == "square"){
                    // check for empty square
                    if(!event.target.hasChildNodes()){ 

                        // check game hasn't finished
                        if(!GameBoard.gameOver()){

                            // update DOM
                            last == this.two.piece ? last = this.one.piece : last = this.two.piece;
                            let p = document.createElement("p")
                            p.textContent = last
                            event.target.append(p)

                            // set the correct person and their choice - makes player one first
                            playerCurrent == playerTwo ? playerCurrent = playerOne : playerCurrent = playerTwo
                            let choice = event.target.getAttribute("index")

                            // Pass to function
                            flow._choose(playerCurrent, choice)
                        }
                    }  
                }
            })
        }

        // function to call game again
        again = () => {
            // show second from
            backForm.style.display = "grid"
            backForm.style.visibility = "visible"
            formAgain.style.display = "flex"
            formAgain.style.visibility = "visible"

            // check for form being submitted
            formAgain.addEventListener('submit', (event)=>{
                 // stop submit
                event.preventDefault();

                // clear all squares
                let square = document.querySelectorAll('.square')
                square.forEach(element => {
                    while(element.firstChild){
                        element.removeChild(element.lastChild);
                    }
                });
                // hide form
                backForm.style.display = "none"
                backForm.style.visibility = "hidden"
                formAgain.style.display = "none"
                formAgain.style.visibility = "hidden"

                // reset board to empty and outcome
                GameBoard.clearBoard()
                outcome.textContent = ""
                // the game will now continue as long as yes is clicked
                // users will alternate goes
            })
            // reload page to change names
            document.addEventListener('click', (event)=>{
                if(event.target.className == "newNames"){
                    location.reload();
                }
            })
        }
    }
})