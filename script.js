const Gameboard = (function(){
    const board = [];
    let recentlyPlayed;
    let count=1;

    function mark(index, value){
        if(board[index]===undefined){
            board[index] = value;
                if(count === 1){
                    console.log(`marked at index ${index} by: Player${count} , ${board[index]}. Now it's Player${count+1}'s turn.`);
                    recentlyPlayed=`Player${count}`;
                    ++count;
                }else{
                    console.log(`Marked at index ${index} by: Player${count} , ${board[index]}. Now it's Player${count-1}'s turn.`);
                    recentlyPlayed=`Player${count}`;
                    --count;
                }
                
                let result=ResultChecker();
                console.log('"result from the mark function:->" ', result);
                if(result.result === 'no win'){
                    return 'NEXT MOVE';
                }else if(['1row','2row','3row','1col','2col','3col','1cross','2cross'].includes(result.result) ){
                    console.log(`"${recentlyPlayed} won the game"`);
                    return `${recentlyPlayed} won the game`;
                }
        }else{
            console.log(`you can't already marked by: ${board[index]}`);
        }
    }

    function getboard(){
        return board;
    }

    function reset(){
        count = 1;
        for(let i=0; i<board.length; i++){
            board[i] = '';
        }
        console.log('reseted!')
    }

    function PrecheckFunction(){
        let i = 0;
        while(i<board.length){
            if(board[i]!== '')
                return true;
            ++i;
         }
        return false;
    }

    function ResultChecker(){
        let result;
        
        if(PrecheckFunction()){

         result =  HorizontalCheck();
         //console.log('"returned value from the horuzontalchecker() -> "', result);
                if(result === '1row'|| result==='2row'|| result==='3row'){
                    let i;
                    if(result === '1row')
                        i=0;
                    else if(result === '2row')
                        i=3;
                    else 
                        i=6;
                return {result , index: i};
                }
        result = VerticalCheck();
                if(result === '1col' || result==='2col' || result==='3col'){
                    let i;
                    if(result === '1col')
                        i=1;
                    else if(result === '2col')
                        i=2;
                    else 
                        i=3;
                    return {result , index: i};
                }
        result = CrossCheck();
                if(result == '1cross' || result === '2cross' ){
                    let i;
                    if(result === '1cross')
                        i=0;
                    else
                        i=2;
                    return {result , index: i};
                }
        
         return {result: 'no win'};
        }else{
            console.log('bord is empty!');
            alert('Board is empty!');
        }
    }

    function CrossCheck(){

        if(board[0]!==undefined || board[4]!==undefined || board[8]!==undefined){
            if(board[0]===board[4] && board[4]===board[8]){
                return '1cross';
            }
        }
        if(board[2]!==undefined || board[4]!==undefined || board[6]!==undefined){
            if(board[2]===board[4] && board[4]===board[6]){
                return '2cross';
            }
        }
        return 'not cross';
     }

    function VerticalCheck(){

        if(board[0]!==undefined || board[3]!==undefined || board[6]!==undefined){
            if(board[0]===board[3] && board[3]===board[6]){
                return '1col';
            }
        }
        if(board[1]!==undefined || board[4]!==undefined || board[7]!==undefined){
                if(board[1]===board[4] && board[4]===board[7]){
                    return '2col';
                }
        }
        if(board[2]!==undefined || board[5]!==undefined || board[8]!==undefined){
                    if(board[2]===board[5] && board[5]===board[8]){
                        return '3col';
                    }
                }
        return 'not column';
    }

    function HorizontalCheck(){
        if(board[0]!==undefined || board[1]!==undefined || board[2]!==undefined){
            if(board[0]===board[1] && board[1]===board[2]){
                return '1row';
            }
        }
        if(board[3]!==undefined || board[4]!==undefined || board[5]!==undefined){
                if(board[3]===board[4] && board[4]===board[5]){
                    return '2row';
                }
        }
        if(board[6]!==undefined || board[7]!==undefined || board[8]!==undefined){
                    if(board[6]===board[7] && board[7]===board[8]){
                        return '3row';
                    }
                }
        return 'not row'
    }
       

    return {mark, getboard, reset, ResultChecker};
})();

//FACTORY FUNCTION  ..... 
 let result;
function player(name, symbol){
   
    function move(index){
        result=Gameboard.mark(index, symbol);
        if(result=== 'Player1 won the game' || 'Player2 won the game'){
            domWinBanner(result);
        }else{
            domWinBanner(result);
        }
        console.log(Gameboard.getboard());
    }
    return {name,symbol,move,result};
}


function domWinBanner(result){
 winbanner.textContent=result;
 console.log('"After the win , array -> "',Gameboard.getboard());
 //Gameboard.reset();
}

const player1 = player('ram', 'X');
const player2 = player('sam', 'O');


// REFERENCE SECTION ....
const winbanner = document.querySelector('.banner');
const maincontainer = document.querySelector('#maincontainer');
let currentPlayer = 'player1';
const playerOne = document.querySelector('#player1');
const playerTwo = document.querySelector('#player2');
const reset = document.querySelector('#reset');
console.log(playerOne);

playerOne.addEventListener('click' , function(){
    currentPlayer = 'player1';
});
playerTwo.addEventListener('click' , function(){
    currentPlayer = 'player2';
});

reset.addEventListener('click' , function(){
    Gameboard.reset();
    for(let i=0; i<9 ; ++i){
        divtail[i].textContent= '';
    }
    winbanner.textContent='Start Game';
    //winbanner.setAttribute('style', 'background-color:white;');
})

const divtail=document.querySelectorAll('.tail');
for(let i=0; i<divtail.length; i++){

divtail[i].addEventListener('click' , function(){
    if(currentPlayer === 'player1'){
         divtail[i].textContent = "X";
         player1.move(i);
    }
    else{
         divtail[i].textContent = "O"; 
         player2.move(i);
    }
        
});
}