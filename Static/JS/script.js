//alert("Hello Programmer !")

function ageCalculator() {
    var age=prompt("What is your age in years ?");
    var ageInDays=(2022-age)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode("your age in days is "+ageInDays+" .");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
};

function reset() {
    document.getElementById('ageCalculator').remove();
};

function generateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="https://thecatapi.com/api/images/get?format=src&type=small";
    div.appendChild(image);
};

function rpsGame(yourChoice){
    //console.log(yourChoice);
    var botChoice =numberToChoise(randRpsInt());
    //alert(botChoice);
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    alert(humanChoice);
    result=  decideWinner(humanChoice,botChoice)
    console.log(result);
    message=finalMessage(result);
    rpsFrontEnd(humanChoice,botChoice)

};

function randRpsInt(){
    return Math.floor(Math.random() * 3);
};

function numberToChoise(number){
    choice=['rock','paper','scissor'][number];
    console.log(choice+" "+number);
    return choice;
};

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={
        'rock':{'scissor':1,'rock':0.5 ,'paper':0},
        'paper':{'rock':1 ,'paper':0.5,'scissor':0},
        'scissor':{'paper':1,'scissor':0.5,'rock':0}
    };
    
    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
};

function finalMessage([yourScore,computerScore]){
    if(yourScore==0){
        return {'message':'You Lost','color':'red'};
    }else if (yourScore==0.5){
        return {'message':'Game Tied','color':'Yellow'};
    } else {
        return{'message':'You Won','color':'Green'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+imageDatabase[humanImageChoice]+"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+"; font-size :60px padding:30px;'>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML="<img src='"+imageDatabase[botImageChoice]+"'height= 150 width=150 style='box-shadow: 0px 10px 50px rgba(243,50,233,1);'>"
  
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
  
};

// Challenge 4 : Change the color of button
var all_buttons=document.getElementsByTagName('button');

var copyAllButtons=[];

for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    console.log(buttonThingy.value);
    if(buttonThingy.value==='red'){
        buttonRed();
    }else if(buttonThingy.value==='green'){
        buttonGreen();
    }else if(buttonThingy.value==='yellow'){
        buttonYellow();
    }else if(buttonThingy.value==='reset'){
        buttonColorReset();
    }else if(buttonThingy.value==='random'){
        randomColor();
    }
}

function buttonRed(){
    for(let i=0;i<all_buttons.length;i++){
       // console.log(all_buttons[i].classList);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');   
    }
}

function buttonGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }
}

function buttonYellow(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning')
    }
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        console.log(copyAllButtons[i]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColor(){
    let choises=['btn-danger','btn-success','btn-warning','btn-primary']
    for(let i=0;i<all_buttons.length;i++){
        console.log(Math.floor(Math.random()*4));
        let randomNumber=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choises[randomNumber]);
    }
}

//Challange-5 Balckjack
let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,10]},
    'wins':0,
    'losses':0,
    'draws':0,
};

const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']

const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const lossSound=new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);


function blackjackHit(){
   // alert("Congratualtion !")
   let card=randomCard();
   showCard(card,YOU);
   updateScore(card,YOU);
   showScore(YOU);
  // computeWinner();
   //console.log(YOU['score']);
}

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        cardImage.src=`static/image/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
};

function blackjackDeal(){
    //computeWinner();
    let yourImages= document.querySelector('#your-box').querySelectorAll('img');
    let dealerImage=document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }

    for(i=0;i<dealerImage.length;i++){
        dealerImage[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

    document.querySelector('#blackjack-result').textContent="Let's Play";
    document.querySelector('#blackjack-result').style.color='black';
};

function updateScore(card,activePlayer){
    if(card==='A'){
        //If adding 11 keeps me below 21 than add 11 else add 1
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score']+=blackjackGame['cardsMap'][card];
    }   
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color='RED';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    } 
}

function dealerLogic(){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);

    if(DEALER['score'] > 15){
        let winner=computeWinner();
        showResult(winner);
    }
}

// Calculat winner and show the winner 
function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        //higher score than the dealer or when the dealer is at 21 or under 21
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log('You Won!');
            blackjackGame['wins']++;
            winner=YOU;
        }else if (YOU['score'] < DEALER['score']){
            console.log('You Lost!');
            blackjackGame['losses']++;
            winner=DEALER;  
        }else if (YOU['score'] === DEALER['score']){
            console.log('Draw!');
            blackjackGame['draws']++;
        }
        //Condition :- When user bust but dealer won't
    }else if(YOU['score'] > 21 && DEALER['score']<=21){
        console.log('You Lost!');
        blackjackGame['losses'];
        winner=DEALER;
        }
        //Condition :- When you and Dealer busts
        else if(YOU['score'] > 21 && DEALER['score'] > 21){
            console.log('You Drew');
            blackjackGame['losses']++;
        }
        console.log("Winner is ",winner);
        return winner;
    }

function showResult(winner){
    let message,messageColor;

    if(winner === YOU){
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='You Won!';
        messageColor='green';
        winSound.play();
    } else if (winner === DEALER){
        document.querySelector('losses').textContent=blackjackGame['losses'];
        message='You Lost!';
        messageColor='red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message= 'You Drew';
        messageColor= 'black';
    }

    document.querySelector('#blackjack-result').textContent=message;
    document.querySelector('#blackjack-result').style.color=messageColor;
}    