const Gameboard = (function(){
    const board = [];
    let recentlyPlayed;
    let count=1;
    function mark(index, value){
        if(board[index]===undefined){
            board[index] = value;
                if(count === 1){
                    console.log(`marked at index ${index} by: Player${count} , ${board[index]}. 'Now it's Player${count+1}'s turn.'`);
                    recentlyPlayed=`Player${count}`;
                    ++count;
                }else{
                    console.log(`Marked at index ${index} by: Player${count} , ${board[index]}. 'Now it's Player${count-1}'s turn.'`);
                    recentlyPlayed=`Player${count}`;
                    --count;
                }
                
                let result=Gamecontroler.ResultChecker();

                if(result.result === 'no win'){
                    return `Lastly played ${recentlyPlayed}`;
                }
                else if(['1row','2row','3row','1col','2col','3col','1cross','2cross'].includes(result.result) ){
                    return `${recentlyPlayed} won the game`;
                }
        }
        else{
            console.log(`you can't already marked by: ${board[index]}`);
        }
    }

    function getboard(){
        return board;
    }

    function reset(){
        count = 1;
       board.length=0;
        console.log('reseted!')
        console.log('Array after reseted -> ',board);
    }

    return {mark, getboard, reset};
})();

const Gamecontroler = (function(){
  
    const board = Gameboard.getboard();

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
        }
        else{
            console.log('bord is empty!');
            alert('Board is empty!');
        }
    }

    function CrossCheck(){
       

            if(board[0]&&board[0]===board[4] && board[4]===board[8]){
                return '1cross';
            }
        
            if(board[2]&&board[2]===board[4] && board[4]===board[6]){
                return '2cross';
            }
        
        return 'not cross';
     }

    function VerticalCheck(){


            if(board[0]&&board[0]===board[3] && board[3]===board[6]){
                return '1col';
            }
        
                if(board[1]&&board[1]===board[4] && board[4]===board[7]){
                    return '2col';
                }
        
                    if(board[2]&&board[2]===board[5] && board[5]===board[8]){
                        return '3col';
                    }
                
        return 'not column';
    }

    function HorizontalCheck(){
       
            if(board[0]&&board[0]===board[1] && board[1]===board[2]){
                return '1row';
            }
        
        
                if(board[3]&&board[3]===board[4] && board[4]===board[5]){
                    return '2row';
                }
        
        
                    if(board[6]&&board[6]===board[7] && board[7]===board[8]){
                        return '3row';
                    }
                
        return 'not row'
    }
 return {ResultChecker};
})();

//FACTORY FUNCTION  ..... 

function player(name, symbol){

    return {name,symbol};
}

const Displaycontrol =(function(){
   
        const player1 = player('ram', 'X');
        const player2 = player('sam', 'O');

        // REFERENCE SECTION ....

        const winbanner = document.querySelector('.banner');
        const maincontainer = document.querySelector('#maincontainer');
        let currentPlayer;
        const playerOne = document.querySelector('#player1');
        const playerTwo = document.querySelector('#player2');
        const reset = document.querySelector('#reset');
        const divtail=document.querySelectorAll('.tail'); 

        winbanner.textContent= 'Start Game';

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
        });

        for(let i=0; i<divtail.length; i++){

                divtail[i].addEventListener('click' , function(){
                    if(currentPlayer === 'player1'){
                        divtail[i].textContent = player1.symbol;
                        move(i , player1.symbol);
                    }
                    else{
                        divtail[i].textContent = player2.symbol; 
                        move(i, player2.symbol);
                    }
                
                });
        }

        function move(index , symbol){

                let result=Gameboard.mark(index, symbol);

                    if(result==='Player1 won the game' || result==='Player2 won the game'){
                        
                        winbanner.textContent=result;
                    }else{
                        
                        winbanner.textContent=result;
                    }
                    console.log(Gameboard.getboard());
            }
       
})();

