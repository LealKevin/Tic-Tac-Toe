"use strict";
const game = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    player1: 'X',
    player2: 'O',
    currentPlayer: 'X',
    playerXName: 'Player X',
    playerOName: 'Player O',
    playerXScore: 0,
    playerOScore: 0,
    message: `Welcome! You can change player's name by double click on it!`,
    get score() {
        return `${this.playerXScore} : ${this.playerOScore}`;
    },
    render() {
        const root = document.querySelector('#root');
        if (root === null) {
            throw new Error;
        }
        root.classList.add('root');
        if (!(document.querySelector('.players'))) {
            const players = document.createElement('div');
            const playerX = document.createElement('div');
            const playerO = document.createElement('div');
            const scores = document.createElement('div');
            const message = document.createElement('div');
            message.classList.add('message');
            playerX.classList.add('playerX');
            playerO.classList.add('player');
            message.textContent = '';
            message.textContent = this.message;
            scores.textContent = this.score;
            playerX.textContent = this.playerXName;
            playerO.textContent = this.playerOName;
            playerX.addEventListener('dblclick', () => {
                const textInput = document.createElement('input');
                const ok = document.createElement('button');
                textInput.classList.add('nameChange');
                ok.textContent = 'Ok!';
                ok.classList.add('okBtn');
                ok.type = 'submit';
                ok.addEventListener('click', () => {
                    const newName = textInput.value;
                    playerX.textContent = newName;
                    this.playerXName = newName;
                });
                textInput.inputMode = 'text';
                playerX.textContent = '';
                playerX.appendChild(textInput);
                playerX.appendChild(ok);
            });
            playerO.addEventListener('dblclick', () => {
                const textInput = document.createElement('input');
                const ok = document.createElement('button');
                ok.textContent = 'Ok!';
                ok.classList.add('okBtn');
                ok.type = 'submit';
                textInput.classList.add('nameChange');
                textInput.inputMode = 'text';
                ok.addEventListener('click', () => {
                    const newName = textInput.value;
                    playerO.textContent = newName;
                    this.playerOName = newName;
                });
                playerO.textContent = '';
                playerO.appendChild(textInput);
                playerO.appendChild(ok);
            });
            players.classList.add('players');
            scores.classList.add('score');
            players.appendChild(playerX);
            players.appendChild(scores);
            players.appendChild(playerO);
            root.appendChild(message);
            root.appendChild(players);
        }
        if (!(document.querySelector('.reset'))) {
            const reset = document.createElement('button');
            reset.classList.add('reset');
            reset.textContent = 'Reset scores';
            reset.addEventListener('click', () => {
                this.playerXScore = 0;
                this.playerOScore = 0;
                const score = document.querySelector('.score');
                if (score) {
                    score.textContent = this.score;
                }
                const message = document.querySelector('.message');
                if (message) {
                    message.textContent = 'Good luck!';
                }
            });
            root.appendChild(reset);
        }
        if (!(document.querySelector('.grid'))) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 3; i++) {
                    const cell = document.createElement('div');
                    if (j === 1 && i === 1) {
                        cell.classList.add('cellCen');
                    }
                    else if (i === 1) {
                        cell.classList.add('cellVert');
                    }
                    else if (j === 1) {
                        cell.classList.add('cellHor');
                    }
                    else {
                        cell.classList.add('cell');
                    }
                    cell.dataset.coordinates = `${j},${i}`;
                    grid.appendChild(cell);
                    cell.addEventListener('click', () => {
                        cell.textContent = this.currentPlayer;
                        this.handlePositionClick(j, i);
                    });
                    root.appendChild(grid);
                }
            }
        }
        this.board.forEach((row) => {
            console.log(row.join(' | '));
        });
    },
    tryGetWinner() {
        const diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        const diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
        //Diagonal check
        if (diagonal1.every(cell => cell === "X")) {
            return 'X';
        }
        if (diagonal1.every(cell => cell === "O")) {
            return 'O';
        }
        if (diagonal2.every(cell => cell === "X")) {
            return 'X';
        }
        if (diagonal2.every(cell => cell === "O")) {
            return 'O';
        }
        //Rows check
        for (let row of this.board) {
            if (row.every((cell) => cell === "X")) {
                return 'X';
            }
            if (row.every((cell) => cell === "O")) {
                return 'O';
            }
        }
        ;
        //Columns check
        for (let i = 0; i < this.board.length; i++) {
            const column = [this.board[0][i], this.board[1][i], this.board[2][i]];
            if (column.every((cell) => cell === 'X')) {
                return 'X';
            }
            if (column.every((cell) => cell === 'O')) {
                return 'O';
            }
        }
        //Tiec heck
        const isBoardEmpty = this.board.every(row => row.every(cell => cell !== ''));
        if (isBoardEmpty) {
            return 'Tie';
        }
    },
    playAt(x, y) {
        if (!(this.board[x][y] === '')) {
            alert(`Can't play on already played case`);
        }
        else {
            this.board[x][y] = this.currentPlayer;
            //Change current player
            if (this.currentPlayer === 'X') {
                this.currentPlayer = 'O';
            }
            else {
                this.currentPlayer = 'X';
            }
        }
    },
    finishGame(winner) {
        this.currentPlayer = 'X';
        if (winner === 'Tie') {
            this.message = `It's a tie!`;
        }
        else {
            if (winner === 'X') {
                this.message = "The winner is: " + this.playerXName + '!';
            }
            else {
                this.message = "The winner is: " + this.playerOName + '!';
            }
        }
        if (winner === 'X') {
            this.playerXScore += 1;
        }
        if (winner === 'O') {
            this.playerOScore += 1;
        }
        const grid = document.querySelector('.grid');
        if (grid) {
            grid.remove();
        }
        const message = document.querySelector('.message');
        if (message) {
            message.textContent = this.message;
        }
        const score = document.querySelector('.score');
        if (score) {
            score.textContent = this.score;
        }
        this.board = this.board.map(row => row.map(() => ''));
        this.render();
    },
    handlePositionClick(x, y) {
        this.playAt(x, y);
        const winner = this.tryGetWinner();
        if (winner) {
            this.finishGame(winner);
        }
        else {
            this.render();
        }
    }
};
game.render();
