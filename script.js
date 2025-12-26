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
                if(result.result === 'no win'){
                    console.log('NEXT MOVE');
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
        if(board[0]===board[4] && board[4]===board[8]){
            return '1cross';
        }else if(board[2]===board[4] && board[4]===board[6]){
            return '2cross';
        }else{
            return 'not cross';
        }
        
     }

    function VerticalCheck(){
            if(board[0]===board[3] && board[3]===board[6]){
                return '1col';
            }else if(board[2]===board[5] && board[5]===board[8]){
                return '2col';
            }else if(board[3]===board[6] && board[6]===board[9]){
                return '3col';
            }else{
                return 'not column';
            }
    }

    function HorizontalCheck(){
           if(board[0]===board[1] && board[1]===board[2]){
                return '1row';
            }else if(board[3]===board[4] && board[4]===board[5]){
                return '2row';
            }else if(board[6]===board[7] && board[7]===board[8]){
                return '3row';
            }else{
                return 'not row';
            }
    }

    return {mark, getboard, reset, ResultChecker};
}
)();
//FACTORY FUNCTION  ..... 

function player(name, symbol){
    let result;
    function move(index){
        result=Gameboard.mark(index, symbol);
        console.log(Gameboard.getboard());
    }
    return {name,symbol,move,result};
}

const player1 = player('ram', 'X');
const player2 = player('sam', 'O');

player1.move(0);
player2.move(4);
player1.move(1);
player2.move(2);
player1.move(6);
player2.move(5);
player1.move(3);
