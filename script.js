
const game = {
    board: [['X','',''], ['','',''],['','O','']],
    player1: 'X',
    player2: 'O',

    render(){
        this.board.forEach((row) =>{
            console.log(row.join(' | '));
        } );
    },
}

class Player{
    type;
    constructor(obj){
        this.type = obj.type;
    }
    put(x, y){
        game.board[x][y] = this.type
    }
}

const playerX = new Player({type: 'X'});
playerX.put(1,2);

const playerY = new Player({type: 'O'});
playerY.put(2,2);

game.render();



