//function for timer countdown
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let interval=setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if(timer==0||gameMemory[currentEmojiPosition/50].length==13){
            clearInterval(interval);
            display.innerText='sorry you lose the game ';
            console.alert();
        }
    }, 1000);
}
// function to create random index of emoji image
function randomNumber1to5(){
    return Math.ceil(Math.random()*5);
}
// return number approximate to 50
function approximateTo(number,range){
    if(number>=0&&number<range){
        return 0;
    }
    return number-(number%range);
}
//function to create random position in window for emoji
function randomPosition(start,end){
    return Math.ceil(Math.random()*(end-start-55))+5;
}

//function to create html object for emoji
var currentEmojiPosition=0;
function createEmoji(gameBoardStart,gameBoardEnd,gameBoardMargin){  
    let emoji=document.createElement('img');
    emoji.classList.add('emoji');
    emoji.setAttribute('src',`images/${randomNumber1to5()}.png`);
    document.body.append(emoji);
    currentEmojiPosition=approximateTo(randomPosition(gameBoardStart,gameBoardEnd),50);
    emoji.style.left=(gameBoardStart+currentEmojiPosition+gameBoardMargin)+'px';
    emoji.style.top='0px'; 
    return emoji;
}

//control emoji image movement
var currentEmoji;
function moveEmoji(emoji,gameBoardStart,gameBoardEnd,boardBottom,gameBoardMargin){
    currentEmoji=emoji;
    let currentTopPosition=Number(emoji.style.top.slice(0,-2));
    let timer=setInterval(function(){
        currentTopPosition+=10;
        emoji.style.top=currentTopPosition+'px';
        if(stopMovement(emoji,boardBottom,gameMemory)){
           clearInterval(timer);
           addToMemory(emoji,currentEmojiPosition,currentTopPosition,boardBottom);
           currentEmoji=createEmoji(gameBoardStart,gameBoardEnd,gameBoardMargin);
           moveEmoji(currentEmoji,gameBoardStart,gameBoardEnd,boardBottom,gameBoardMargin);         

        }   
    },50);
}

// control movement by left and right arrow
var currentLeftPosition;
function movementControl(){
    currentLeftPosition=Number(currentEmoji.style.left.slice(0,-2));
    document.addEventListener('keydown',function(event){ 
       
        if(event.key=='ArrowRight'){
            currentLeftPosition+=50;
            currentEmojiPosition+=50;
            if(currentEmojiPosition/50<10){
                if(gameMemory[currentEmojiPosition/50].length<=gameMemory[(currentEmojiPosition/50)+1].length){
                 currentEmoji.style.left=currentLeftPosition+'px';
                }
                else{
                    currentLeftPosition-=50;
                    currentEmojiPosition-=50;
                    }
            }
            else{
            currentLeftPosition-=50;
            currentEmojiPosition-=50;
            }
            
           
        }
        else if(event.key=='ArrowLeft'){
            currentLeftPosition-=50;
            currentEmojiPosition-=50;
            if(currentEmojiPosition/50>0){
                if(gameMemory[currentEmojiPosition/50].length<=gameMemory[(currentEmojiPosition/50)-1].length){
                currentEmoji.style.left=currentLeftPosition+'px';
                }
                else{
                    currentLeftPosition+=50;
                    currentEmojiPosition+=50;
                    }
            } 
            else{
            currentLeftPosition+=50;
            currentEmojiPosition+=50;
            }
        }
    
    });   
}
function stopMovement(emoji,boardBottom,game_memory){
    let emojiBottomPosition=Number(emoji.style.top.slice(0,-2))+emoji.offsetWidth;
    if(emojiBottomPosition>=boardBottom-(game_memory[currentEmojiPosition/50].length*50)){
        return true;
    }

}

function addToMemory(emoji,emojiPosition,emojiTop,gameBoardBottom){
    let indexOfEmojiImg=Number(emoji.getAttribute('src').charAt(7));
    let counter=document.querySelector('#emj'+indexOfEmojiImg);
    counter.innerText=`${Number(counter.innerText)+1}`;
    if(emojiPosition>=0&&emojiPosition<50){
        gameMemory[0][((gameBoardBottom-emojiTop+1)/50)-1]=emoji;
    }
    else if((gameBoardBottom-emojiTop)+1>=0&&(gameBoardBottom-emojiTop+1)<50){
        gameMemory[(emojiPosition)/50][0]=emoji;
    }
    else if(emojiPosition>=0&&emojiPosition<50&&(gameBoardBottom-emojiTop)+1>=0&&(gameBoardBottom-emojiTop+1)<50){
        gameMemory[0][0]=emoji;
    }
    else{
        gameMemory[(emojiPosition)/50][((gameBoardBottom-emojiTop+1)/50)-1]=emoji;
    }
}

