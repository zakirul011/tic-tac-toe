import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button
            className="text-2xl size-14 border border-gray-300 rounded cursor-pointer"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ squareValues, isX, onPlay, onReset }) {
    let player = isX ? "X" : "O";
    let status = `Next Player: ${player}`;

    const winner = calculateWinner(squareValues);
    if (winner) {
        status = `Winner: ${winner}`;
    }

    function handleSquareClick(i) {
        if (squareValues[i] || winner) return;

        let nextSquareValues = [...squareValues];
        nextSquareValues[i] = player;

        onPlay(nextSquareValues);
    }

    return (
        <>
            <h1 className="text-2xl mb-4">{status}</h1>
            <div className="inline-grid grid-cols-3 gap-2 m-4">
                <Square
                    value={squareValues[0]}
                    onSquareClick={() => handleSquareClick(0)}
                />
                <Square
                    value={squareValues[1]}
                    onSquareClick={() => handleSquareClick(1)}
                />
                <Square
                    value={squareValues[2]}
                    onSquareClick={() => handleSquareClick(2)}
                />
                <Square
                    value={squareValues[3]}
                    onSquareClick={() => handleSquareClick(3)}
                />
                <Square
                    value={squareValues[4]}
                    onSquareClick={() => handleSquareClick(4)}
                />
                <Square
                    value={squareValues[5]}
                    onSquareClick={() => handleSquareClick(5)}
                />
                <Square
                    value={squareValues[6]}
                    onSquareClick={() => handleSquareClick(6)}
                />
                <Square
                    value={squareValues[7]}
                    onSquareClick={() => handleSquareClick(7)}
                />
                <Square
                    value={squareValues[8]}
                    onSquareClick={() => handleSquareClick(8)}
                />
            </div>
            <button
                className="block m-3 px-4 py-2 border border-black-300 rounded cursor-pointer hover:bg-amber-300 hover:border-amber-300 transition-colors hover:shadow-sm"
                onClick={onReset}
            >
                Reset
            </button>
        </>
    );
}

function History({ history, onJump }) {
    const moves = history.map((squares, move) => {
        let description = "Go to start the game";
        if (move > 0) {
            description = (
                <>
                    Go to move #<span className="font-bold">{move}</span>
                </>
            );
        }
        return (
            <li key={move}>
                <button
                    className="cursor-pointer hover:text-amber-600"
                    onClick={() => onJump(move)}
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <>
            <h2 className="text-2xl">History</h2>
            <ol>{moves}</ol>
        </>
    );
}

export default function App() {
    // states
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [isX, setIsX] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);

    let currentSquares = history[currentMove];

    // handlers
    function handlePlay(nextSquareValues) {
        setIsX(!isX);
        let nextHistory = [
            ...history.slice(0, currentMove + 1),
            nextSquareValues,
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function handleReset() {
        setHistory([Array(9).fill(null)]);
        setIsX(true);
        setCurrentMove(0);
    }
    function handleJump(move) {
        setCurrentMove(move);
        setIsX(move % 2 == 0);
    }

    return (
        <div className="flex gap-24">
            <div>
                <Board
                    squareValues={currentSquares}
                    isX={isX}
                    onPlay={handlePlay}
                    onReset={handleReset}
                />
            </div>
            <div>
                <History history={history} onJump={handleJump} />
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
