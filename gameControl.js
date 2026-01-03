    import *as Gameboard from './gameBoard.js';

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
  export {ResultChecker , HorizontalCheck ,VerticalCheck ,CrossCheck};

