// initialize board and teams
let board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
const humanTeam = "X";
const aiTeam = board.oppositePlayer(humanTeam);
let currentTeam = humanTeam; // let human start

// initialize AI
let aiPlayer = new TicTacToe.TicTacToeAIPlayer();
aiPlayer.initialize(aiTeam, board);

// add event listener to input-buttons
let buttons = document.getElementsByClassName("tictactoe_button")
for(let i = 0; i < 9; i ++) {
    const x = i % 3;
    const y = Math.floor(i / 3);

    buttons[i].addEventListener("click", () => {
        humanMove(x, y);
    })
}
document.getElementById('button_restart').addEventListener("click", () => {
    console.log("resetting board..");
    resetBoard();
})
document.getElementById('button_exit').addEventListener("click", () => {
    window.history.back();
})

function resetBoard() {
    board = new TicTacToe.TicTacToeBoard(['','','','','','','','','']);
    updateHTMLBoard();
    currentTeam = humanTeam; // let human start
    aiPlayer.initialize(aiTeam, board);

    // enable buttons
    for(let i = 0; i < 9; i ++) {
        buttons[i].removeAttribute("disabled");
    }
}

// 'toggle' current team
function changeTeam() {
    if(currentTeam === humanTeam) {
        currentTeam = aiTeam;
    } else {
        currentTeam = humanTeam;
    }
    console.log("its now", currentTeam, "'s Turn!");
}

// visually updates the Buttons
function updateHTMLBoard() {
    for(let i = 0; i < 9; i++) {
        const team = board.board[i];
        buttons[i].innerHTML = team;
        buttons[i].className = "tictactoe_button";
        if(team == humanTeam)
            buttons[i].classList.add('tictactoe_button_teamHuman')
        else if(team == aiTeam)
            buttons[i].classList.add('tictactoe_button_teamAI')
    }
}

// tests whether a team has won
function testWinner() {
    if(board.winner() !== null) {
        if(board.winner().cell === '') {
            console.warn("Draw!");
        } else {
            console.warn(board.winner().cell + " is the winner!");
        }

        // disable buttons
        for(let i = 0; i < 9; i ++) {
            buttons[i].setAttribute("disabled", "true");
        }
        return false;
    }
    return true;
}

// make move for the human team
function humanMove(x, y) {
    let cancel = false;
    if(currentTeam === humanTeam) {
        // do human move
        const move = {
            x: x,
            y: y
        }
        try {
            board.makeMove(humanTeam, move);
            changeTeam();
        } catch (e) {
            console.warn("invalid move");
            cancel = true;
        }
        updateHTMLBoard();

        // answer with AI-Move
        if(testWinner() && cancel === false) {
            const aiMove = aiPlayer.makeMove();
            if (aiMove != null) {
                board.makeMove(aiTeam, aiMove);
                changeTeam();
            } else {
                console.error("if u see this, u did fuck up!");
            }

            updateHTMLBoard();
            testWinner();
        }
    }
}

