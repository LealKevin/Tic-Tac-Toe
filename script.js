"use strict";
const game = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    player1: 'X',
    player2: 'O',
    currentPlayer: 'X',
    render() {
        const root = document.querySelector('#root');
        if (root === null) {
            throw new Error;
        }
        const grid = document.createElement('div');
        grid.classList.add('grid');
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.coordinates = `${j},${i}`;
                grid.appendChild(cell);
                cell.addEventListener('click', (event) => {
                    this.handlePositionClick(j, i);
                });
            }
        }
        root.appendChild(grid);
        this.board.forEach((row) => {
            console.log(row.join(' | '));
        });
    },
    tryGetWinner() {
        const diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        const diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
        //Diagonal check
        if (diagonal1.every(cell => cell === "X")) {
            return console.log('Player X Win');
        }
        if (diagonal2.every(cell => cell === "O")) {
            return console.log('Player O Win');
        }
        //Rows check
        this.board.forEach((row) => {
            if (row.every((cell) => cell === "X")) {
                return console.log('Player X Win');
            }
            if (row.every((cell) => cell === "O")) {
                return console.log('Player O Win');
            }
        });
        //Columns check
        for (let i = 0; i < this.board.length; i++) {
            const column = [this.board[i][0], this.board[i][1], this.board[i][2]];
            if (column.every((cell) => cell === 'X')) {
                return console.log('Player X Win');
            }
            if (column.every((cell) => cell === 'O')) {
                return console.log('Player O Win');
            }
        }
    },
    playAt(x, y) {
        if (!(this.board[x][y] = '')) {
            alert(`Can't play on already played case`);
        }
        this.board[x][y] = this.currentPlayer;
        //Change current player
        if (this.currentPlayer === 'X') {
            this.currentPlayer = 'O';
        }
        else {
            this.currentPlayer = 'X';
        }
    },
    handlePositionClick(x, y) {
        this.playAt(x, y);
        const winner = this.tryGetWinner();
        if (winner) {
            finishGame(winner);
        }
    }
};
class Player {
    constructor(obj) {
        this.type = obj.type;
    }
}
const playerX = new Player({ type: 'X' });
const playerO = new Player({ type: 'O' });
game.render();
