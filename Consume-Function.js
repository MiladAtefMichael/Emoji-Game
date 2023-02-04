//background game sound
let backgroundAudio=document.createElement('audio');
backgroundAudio.setAttribute('src','Audio/backgroundAudio.mp3');
backgroundAudio.play();

//create game Board
let gameBoard=document.createElement('div');
gameBoard.classList.add('gameBoard');
document.body.append(gameBoard);

// set dimenstions of game board
let gameBoardStart=window.innerWidth/2;
let gameBoardEnd=gameBoardStart+ gameBoard.offsetWidth;
let gameBoardTop=50;
let gameBoardBotton=gameBoardTop+gameBoard.offsetHeight;

// display game Board
gameBoard.style.left=gameBoardStart+'px';
gameBoard.style.top=gameBoardTop+'px';

//this array store emoji shape and position of every emoji restrict emoji movement
var gameMemory=[];
for(let i=0;i<10;i++){
   gameMemory[i]=new Array();
}
//start game button identification
let startGameButton=document.querySelector('button');
startGameButton.onclick=function(){
   //timer display
   var twoMinutes = 60 * 2;
   let timeDisplay = document.querySelector('.timer');
   startTimer(twoMinutes, timeDisplay);
   //game functionality
   let emoji=createEmoji(gameBoardStart,gameBoardEnd,5);
   
   moveEmoji(emoji,gameBoardStart,gameBoardEnd,gameBoardBotton,5);
   movementControl();
   
}









