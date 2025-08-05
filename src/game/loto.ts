// Game Lô Tô 5x5 - Logic
interface Cell {
    number: number;
    marked: boolean;
    row: number;
    col: number;
}

type Board = Cell[];

export class LotoGame {
    playerBoard: Board = [];
    // computerBoard: Board = [];
    calledNumbers: number[] = [];
    gameActive: boolean = false;
    playerWins: number = 0;
    computerWins: number = 0;
    playerMarkedCount: number = 0;
    computerMarkedCount: number = 0;
    gameResult: string | null = null;
    winner:string | null = '';

    constructor() {
        this.startNewGame();
    }

    // Tạo số ngẫu nhiên từ 1-100
    private generateRandomNumber(): number {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Tạo bảng 5x5 với số ngẫu nhiên
    private generateBoard(): Board {
        const board: Board = [];
        for (let i = 0; i < 25; i++) {
            board.push({
                number: this.generateRandomNumber(),
                marked: false,
                row: Math.floor(i / 5),
                col: i % 5
            });
        }
        return board;
    }

    // Bắt đầu game mới
    startNewGame(): Board {
        // Reset game state
        this.gameActive = true;
        this.calledNumbers = [];
        this.winner = null;
        this.gameResult = null;

        // Tạo boards mới
        this.playerBoard = this.generateBoard();
        // this.computerBoard = this.generateBoard();

        // Update counters
        this.updateMarkedCounters();

        console.log('Game mới đã bắt đầu');
        return this.playerBoard
    }

    // Gọi số tiếp theo
    callNextNumber(): void {
        if (!this.gameActive) return;

        const calledNumber = this.generateRandomNumber();
        this.calledNumbers.push(calledNumber);

        // Đánh dấu số trùng khớp
        this.markMatchingNumbers(calledNumber);

        // Kiểm tra thắng thua
        this.checkWinCondition();

        console.log(`Số được gọi: ${calledNumber}`);
    }

    // Đánh dấu các số trùng khớp
    private markMatchingNumbers(calledNumber: number): void {
        // Đánh dấu trên bảng người chơi
        this.playerBoard.forEach(cell => {
            if (cell.number === calledNumber && !cell.marked) {
                cell.marked = true;
            }
        });

        // Đánh dấu trên bảng máy
        /*this.computerBoard.forEach(cell => {
            if (cell.number === calledNumber && !cell.marked) {
                cell.marked = true;
            }
        });*/

        // Cập nhật counters
        this.updateMarkedCounters();
    }

    // Cập nhật số ô đã đánh dấu
    private updateMarkedCounters(): void {
        this.playerMarkedCount = this.playerBoard.filter(cell => cell.marked).length;
        // this.computerMarkedCount = this.computerBoard.filter(cell => cell.marked).length;
    }

    // Kiểm tra điều kiện thắng (5 ô liên tiếp trên một hàng ngang)
    private checkWinCondition(): void {
        const playerWon = this.checkBoardWin(this.playerBoard);
        //const computerWon = this.checkBoardWin(this.computerBoard);

        /*if (playerWon || computerWon) {
            this.gameActive = false;

            if (playerWon && computerWon) {
                this.winner = 'draw';
                this.gameResult = '🤝 Hòa! Cả hai bên đều thắng cùng lúc!';
            } else if (playerWon) {
                this.winner = 'player';
                this.playerWins++;
                this.gameResult = '🎉 Bạn thắng! Chúc mừng! Bạn đã hoàn thành một hàng ngang!';
            } else {
                this.winner = 'computer';
                this.computerWins++;
                this.gameResult = '🤖 Máy thắng! Máy đã hoàn thành một hàng ngang trước bạn!';
            }
        }*/
    }

    // Kiểm tra thắng cho một bảng
    private checkBoardWin(board: Board): boolean {
        // Kiểm tra từng hàng ngang (0-4)
        for (let row = 0; row < 5; row++) {
            let consecutiveMarked = 0;
            for (let col = 0; col < 5; col++) {
                const index = row * 5 + col;
                if (board[index] && board[index].marked) {
                    consecutiveMarked++;
                    if (consecutiveMarked === 5) {
                        return true;
                    }
                } else {
                    consecutiveMarked = 0;
                }
            }
        }
        return false;
    }
}
