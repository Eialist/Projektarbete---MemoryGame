//connecting variables with the corresponding class in html
const gameStartBtn = document.querySelector('.game-start-btn');
const playerOneInput = document.querySelector('.playerone-name-field');
const playerTwoInput = document.querySelector('.playertwo-name-field');
const playerTurnLbl = document.querySelector('.player-turn-lbl');
const playerOneScorePara = document.querySelector('.player-one-score');
const playerTwoScorePara = document.querySelector('.player-two-score');
const removeInputs = document.querySelector('.start-container');
const section = document.querySelector('section');
const rematchBtn = document.querySelector('.rematch-btn');
const winner = document.querySelector('.game-info > h3');
const gameInfo = document.querySelector('.game-info');
const cardContainer = document.querySelector('.card-container');

// declaring variables for later use
let playerOneName, playerTwoName, players, currentPlayer; 
let gameTurn = 0; 

// start function which reads in players name 
function startGame() {
    playerOneName = playerOneInput.value;
    playerTwoName = playerTwoInput.value;
    
    let playerOne = {
        name: playerOneName,
        score: 0
    }
    let playerTwo = {
        name: playerTwoName,
        score: 0
    }

    players = [playerOne, playerTwo];


    updateDisplays(players);

    removeInputs.style.display = 'none';
    cardContainer.style.pointerEvents = 'none';

    return playerOne, playerTwo;
}


// this part of the code hides the gameinfo - points and who's turn it is until the game has started.
gameInfo.style.visibility = 'hidden';
// this makes the cards unclickable until game has started
cardContainer.style.pointerEvents = 'none';

// function that shows usernames and scoreboard
function showGameInfo() {
    gameInfo.style.visibility = 'visible';
    cardContainer.style.pointerEvents = 'inherit';
    return gameInfo;
}

// function to not have double eventListeners on gameStartBtn.
function activateGame() {
    startGame();
    showGameInfo();
}

// makes the game start if you press enter instead of the button - start game
playerTwoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        activateGame();
    }
});

// start game
gameStartBtn.addEventListener('click', activateGame);




// function to update display 
function updateDisplays(players) {
    let currentPlayer = players[gameTurn];
    playerTurnLbl.innerText = currentPlayer.name; 
    playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
    playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
}



// an array with cards as objects
const memoryCards = [{
    name: 'bee',
    img: './Assets/bee.png',
},
{
    name: 'butterfly',
    img: './Assets/butterfly.png',
},
{
    name: 'crab',
    img: './Assets/crab.png',
},
{
    name: 'deer',
    img: './Assets/deer.png',
},
{
    name: 'dog',
    img: './Assets/dog.png',
},
{
    name: 'frog',
    img: './Assets/frog.png',
},
{
    name: 'jellyfish',
    img: './Assets/jellyfish.png',
},
{
    name: 'koala',
    img: './Assets/koala.png',
},
{
    name: 'owl',
    img: './Assets/owl.png',
},
{
    name: 'pig',
    img: './Assets/pig.png',
},
{
    name: 'snake',
    img: './Assets/snake.png',
},
{
    name: 'whale',
    img: './Assets/whale.png',
},
]

// .concat merges two arrays - also is useful to put together two of the same array
const cardGrid = memoryCards.concat(memoryCards).sort(randomizeCards); 

// this function makes the card be placed random in the cardGrid as it is called in .sort
function randomizeCards() {  
    return 0.5 - Math.random();
}



// placing the cards on the game board, adding classes and making them flipable 
cardGrid.forEach((item) => {
    const card = document.createElement('div');
    const front = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    front.classList = 'front';
    back.classList = 'back';

    front.src = item.img;
    card.setAttribute('name', item.name);
    
    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', (e) => {
        let isFlipped = document.querySelectorAll('.is-flipped');
        if (isFlipped.length < 2){
        card.classList.toggle('is-flipped');
        checkForMatch();
    }
    });
})



function endGame() {
    // let match = document.querySelectorAll('.match');
    const winner = document.querySelector('.game-info > h3');
    console.log(players[0].name + ":" + players[0].score + " - " + players[1].name + ":" + players[1].score);
    if (players[0].score + players[1].score == 12) {
        if (players[0].score > players[1].score) {
        winner.innerText = `${players[0].name} har vunnit`;
        
        } else if (players[0].score < players[1].score) {
        winner.innerText = `${players[1].name} har vunnit`;
       
        } else {
        winner.innerText = 'Det blev oavgjort!'
        
        }
        rematchBtn.style.display = 'inherit';
    console.log('end of game'); 
    }
};



// this function is checking for match and giving points to pairs otherwise the gameturn is changed
function checkForMatch() {
    let isFlipped = document.querySelectorAll('.is-flipped');
    console.log("Checking for match");
    if (isFlipped.length == 2) {
        if (isFlipped[0].getAttribute('name') == isFlipped[1].getAttribute('name')) {
            setTimeout(function() {
                isFlipped[0].classList = 'match';
                isFlipped[1].classList = 'match';
                isFlipped[0].classList.remove('is-flipped');
                isFlipped[1].classList.remove('is-flipped');
            }, 2000);
            currentPlayer.score = currentPlayer.score + 1;
            if (gameTurn == 0) {
                playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
            } else {
                playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
            }
                
            console.log("Equal");
            endGame();
            
        
        } else if (isFlipped[0].getAttribute('name') !== isFlipped[1].getAttribute('name')) {
            setTimeout(function() {
                isFlipped[0].classList.remove('is-flipped');
                isFlipped[1].classList.remove('is-flipped');
                gameTurn = (gameTurn + 1) % 2;
                currentPlayer = players[gameTurn];
                playerTurnLbl.innerText = currentPlayer.name;
            }, 1500);
            console.log("Not equal");
        };
    }
};
