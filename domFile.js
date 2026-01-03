        import *as Gamecontrol from './gameControl.js';
        import *as Gameboard from './gameBoard.js'

        function player(name, symbol){

            return {name,symbol};
        }

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
                        Gameboard.mark(i , player1.symbol);
                        move( Gamecontrol.ResultChecker(Gameboard.getboard()) , 'player1');
                        
                    }
                    else{

                        divtail[i].textContent = player2.symbol; 
                        Gameboard.mark(i, player2.symbol);
                        move( Gamecontrol.ResultChecker(Gameboard.getboard()) , 'player2');
                       
                    }
                
                });
        }

        function move(result , player){

                    if(['1row','2row','3row','1col','2col','3col','1cross','2cross'].includes(result.result)){
                        
                        winbanner.textContent=`${player} won the match`;
                    }else{

                        if(player === 'player1'){
                             winbanner.textContent = 'Next move player2';
                        }
                        else{
                             winbanner.textContent = 'Next move player1';
                        }
                        
                    }
                    console.log(Gameboard.getboard());
            }
       
