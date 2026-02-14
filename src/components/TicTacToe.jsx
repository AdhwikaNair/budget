import React, { useState, useEffect, useCallback } from 'react';

const TicTacToe = ({ onComplete }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true); // Player is X
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [gameStatus, setGameStatus] = useState('Your Turn (X)');
    const [showOverlay, setShowOverlay] = useState(false);
    const [computersCalculating, setComputersCalculating] = useState(false);

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkResult = useCallback((currentBoard) => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return { winner: currentBoard[a], line: [a, b, c] };
            }
        }
        if (!currentBoard.includes(null)) {
            return { winner: 'tie', line: [] };
        }
        return null;
    }, []);

    const minimax = useCallback((currentBoard, depth, isMaximizing) => {
        const result = checkResult(currentBoard);
        if (result) {
            if (result.winner === 'O') return 10 - depth;
            if (result.winner === 'X') return depth - 10;
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (!currentBoard[i]) {
                    currentBoard[i] = 'O';
                    const score = minimax(currentBoard, depth + 1, false);
                    currentBoard[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (!currentBoard[i]) {
                    currentBoard[i] = 'X';
                    const score = minimax(currentBoard, depth + 1, true);
                    currentBoard[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }, [checkResult]);

    const makeComputerMove = useCallback(() => {
        setComputersCalculating(true);
        setTimeout(() => {
            let bestScore = -Infinity;
            let move;
            const currentBoard = [...board];

            for (let i = 0; i < 9; i++) {
                if (!currentBoard[i]) {
                    currentBoard[i] = 'O';
                    const score = minimax(currentBoard, 0, false);
                    currentBoard[i] = null;
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }

            if (move !== undefined) {
                const newBoard = [...board];
                newBoard[move] = 'O';
                setBoard(newBoard);

                const result = checkResult(newBoard);
                if (result) {
                    setWinner(result.winner);
                    setWinningLine(result.line);
                    setGameStatus(result.winner === 'O' ? 'AI Supremacy' : 'Stalemate');
                    setShowOverlay(true);
                } else {
                    setIsXNext(true);
                    setGameStatus('Your Turn (X)');
                }
            }
            setComputersCalculating(false);
        }, 600);
    }, [board, checkResult, minimax]);

    useEffect(() => {
        if (!isXNext && !winner) {
            setGameStatus('Computer Calculating...');
            makeComputerMove();
        }
    }, [isXNext, winner, makeComputerMove]);

    const handleSquareClick = (index) => {
        if (board[index] || winner || !isXNext) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const result = checkResult(newBoard);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            setGameStatus(result.winner === 'X' ? 'Human Victory' : 'Stalemate');
            setShowOverlay(true);
        } else {
            setIsXNext(false);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine([]);
        setGameStatus('Your Turn (X)');
        setShowOverlay(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] font-pixel animate-slide-up">
            <div className="max-w-md w-full pixel-card p-8 bg-bg-surface">
                <div className="text-center mb-10">
                    <div className="inline-block bg-bg-plum text-white px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest shadow-pixel-sm">
                        Battle Stage
                    </div>
                    <h2 className="text-4xl font-bold text-text-main mb-2">STREET DUEL</h2>
                    <p className={`text-xs font-bold uppercase tracking-widest ${computersCalculating ? 'text-secondary animate-pixel-bounce' : 'text-text-muted'}`}>
                        {gameStatus}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-text-main p-2 shadow-pixel-md">
                    {board.map((square, i) => (
                        <button
                            key={i}
                            onClick={() => handleSquareClick(i)}
                            className={`aspect-square border-4 flex items-center justify-center text-5xl font-bold transition-all duration-75
                                ${!square && isXNext && !winner ? 'hover:bg-primary/30 cursor-pointer' : 'cursor-default active:scale-95'}
                                ${winningLine.includes(i) ? 'bg-primary border-text-main animate-pixel-bounce shadow-pixel-white' : 'bg-bg-surface border-text-main'}
                                ${square === 'X' ? 'text-secondary animate-pixel-pop' : square === 'O' ? 'text-accent animate-pixel-pop' : 'text-transparent'}
                            `}
                        >
                            {square || '·'}
                        </button>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <button
                        onClick={resetGame}
                        className="btn-primary w-full text-sm"
                    >
                        NEW ROUND
                    </button>
                    <button
                        onClick={() => onComplete(0)}
                        className="btn-primary w-full text-sm bg-bg-dark border-text-main hover:bg-bg-surface"
                    >
                        RETREAT
                    </button>
                </div>
            </div>

            {showOverlay && (
                <div className="fixed inset-0 bg-bg-plum/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
                    <div className="pixel-card max-w-sm w-full text-center border-text-main bg-white">
                        <div className="text-5xl mb-4 animate-pixel-bounce">
                            {winner === 'X' ? '💖' : winner === 'O' ? '💀' : '🤝'}
                        </div>
                        <h3 className="text-4xl font-bold mb-2 text-text-main">
                            {winner === 'X' ? 'VICTORY!' : winner === 'O' ? 'DEFEAT' : 'STALEMATE'}
                        </h3>
                        <p className="text-text-dim text-base mb-10 font-bold leading-tight uppercase tracking-tight">
                            {winner === 'X' ? 'You maintained your territory.' :
                                winner === 'O' ? 'The machine claimed the sector.' :
                                    'Both sides withdrew in respect.'}
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={resetGame}
                                className="btn-primary w-full py-4 text-base"
                            >
                                PLAY AGAIN
                            </button>
                            <button
                                onClick={() => onComplete(winner === 'X' ? 2000 : winner === 'tie' ? 500 : 0)}
                                className="btn-primary w-full py-4 text-base bg-secondary text-white"
                            >
                                CLAIM REWARDS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;
