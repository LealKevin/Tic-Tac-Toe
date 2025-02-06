const game = {
    board: [['','',''], ['','',''],['','','']],
    player1: 'X',
    player2: 'O',
    currentPlayer: 'X',

    render(){

        const root:HTMLDivElement | null = document.querySelector('#root');
        if(root === null){
            throw new Error;
        }
        root.classList.add('root');

        if(!(document.querySelector('.grid'))){
            const grid:HTMLDivElement = document.createElement('div');
            grid.classList.add('grid');

            for( let j = 0 ; j < 3 ; j++ ){
                for( let i = 0 ; i < 3 ; i++ ){
                    const cell:HTMLDivElement = document.createElement('div');
                    if( j === 1 && i === 1){
                        cell.classList.add('cellCen')
                    } else if( i === 1 ){
                        cell.classList.add('cellVert');
                    }else if( j === 1 ){
                        cell.classList.add('cellHor');
                    }else{
                        cell.classList.add('cell');
                    }
                    cell.dataset.coordinates = `${j},${i}`
                    grid.appendChild(cell);

                    cell.addEventListener('click',() => {
                            cell.textContent = this.currentPlayer;
                            this.handlePositionClick(j, i) 
                        })
                        root.appendChild(grid);
                }
            }
        }


        this.board.forEach((row) =>{
            console.log(row.join(' | '));
        });
    },
    tryGetWinner(): 'X' | 'O' | 'Tie' | null{
        const diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        const diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];

//Diagonal check
        if(diagonal1.every(cell => cell === "X")){
            return 'X'
        }
        if(diagonal1.every(cell => cell === "O")){
            return 'O'
        }
        if(diagonal2.every(cell => cell === "X")){
            return 'X'
        }
        if(diagonal2.every(cell => cell === "O")){
            return 'O'
        }
//Rows check
        this.board.forEach((row) => {
            if(row.every((cell) => cell === "X")){
                return 'X'
            }
            if(row.every((cell) => cell === "O")){
                return 'O'
            }
        });

//Columns check
       for(let i = 0 ; i < this.board.length ; i++){
         const column = [this.board[0][i], this.board[1][i], this.board[2][i] ]        
         if(column.every((cell) => cell === 'X')){
            return 'X'  
         }
         if(column.every((cell) => cell === 'O')){
            return 'O'
         }
       }

//Tiec heck
        const isBoardEmpty = this.board.every( row => row.every(cell => cell !== '') ) 
        if(isBoardEmpty){
            return 'Tie';
        }
    },

    playAt(x: number,y: number){
        if(!(this.board[x][y] === '')){
            alert(`Can't play on already played case`);
        }else{
            this.board[x][y] = this.currentPlayer ;
            //Change current player
            if(this.currentPlayer === 'X'){
                this.currentPlayer = 'O'
            } else {
                this.currentPlayer = 'X'
            }
        }

    },
    finishGame(winner: string){
        this.currentPlayer = 'X'
        if(winner === 'Tie'){
           console.log(`It's a tie!`);
        }else{
            console.log("The winner is: " + winner);
        }
        const grid = document.querySelector('.grid');
        if(grid){
            grid.remove();
        }
        this.board = this.board.map(row => row.map(() => ''));
        this.render()
    }, 

    handlePositionClick(x: number, y: number){
        this.playAt(x,y);
        this.render();

        const winner: string | null = this.tryGetWinner();
        if(winner){
            this.finishGame(winner);
        }
    }

};

class Player{
    type: string;

    constructor(obj:{ type: string }){
        this.type = obj.type;
    }
}

const playerX = new Player({type: 'X'});


const playerO = new Player({type: 'O'});
game.render();



