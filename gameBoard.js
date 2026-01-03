
    let board = [];
    /*let recentlyPlayed;
    let count=1;*/
    function mark(index, value){
        if(board[index]===undefined){
            board[index] = value;
             /*   if(count === 1){
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
                } */
        }
        else{
            console.log(`you can't already marked by: ${board[index]}`);
        }
    }

    function getboard(){
        return board;
    }

    function reset(){
       // count = 1;
       board.length=0;
        console.log('reseted!')
        console.log('Array after reseted -> ',board);
    }

    export {mark, getboard, reset};
