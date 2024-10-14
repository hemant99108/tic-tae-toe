/* eslint-disable react/prop-types */

import { useState } from "react";

function Square({ xIsNext, squares, onPlay }) {
  function handleclick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextsquares = squares.slice();
    if (xIsNext) {
      nextsquares[i] = "X";
    } else {
      nextsquares[i] = "O";
    }
    onPlay(nextsquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is: " + winner;
  } else {
    status = "Next player is: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="grid grid-rows-3 gap-4 w-max mx-auto mt-12 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-4 rounded-lg shadow-lg">
      <h1
        className={`text-4xl text-center font-bold text-white mb-4 ${
          xIsNext ? "text-green-300" : "text-yellow-300"
        }`}
      >
        {status}
      </h1>
      <div className=" grid grid-cols-3 gap-4 ">
        <EachButton value={squares[0]} onsquareClick={() => handleclick(0)} />
        <EachButton value={squares[1]} onsquareClick={() => handleclick(1)} />
        <EachButton value={squares[2]} onsquareClick={() => handleclick(2)} />
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <EachButton value={squares[3]} onsquareClick={() => handleclick(3)} />
        <EachButton value={squares[4]} onsquareClick={() => handleclick(4)} />
        <EachButton value={squares[5]} onsquareClick={() => handleclick(5)} />
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <EachButton value={squares[6]} onsquareClick={() => handleclick(6)} />
        <EachButton value={squares[7]} onsquareClick={() => handleclick(7)} />
        <EachButton value={squares[8]} onsquareClick={() => handleclick(8)} />
      </div>
    </div>
  );
}

function EachButton({ value, onsquareClick }) {
  return (
    <button
      onClick={onsquareClick}
      className={`w-24 h-24 border border-gray-400 text-3xl font-bold transition transform duration-300 ease-in-out 
      ${
        value === "X"
          ? "bg-green-500 text-white"
          : value === "O"
          ? "bg-yellow-500 text-white"
          : "bg-gray-100 text-gray-700"
      }
      hover:scale-105 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50`}
    >
      {value}
    </button>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentmove, setcurrentmove] = useState(0);
  const currentSquares = history[currentmove];

  const xIsNext = currentmove % 2 === 0;

  function handlePlay(nextsquares) {
    const nexthistory = [...history.slice(0, currentmove + 1), nextsquares];
    setHistory(nexthistory);
    setcurrentmove(nexthistory.length - 1);
  }

  function jumpTo(nextMove) {
    setcurrentmove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to  Game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description} </button>
      </li>
    );
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="">
        <Square
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>

      <div className="p-4 m-3 ">
        <ol>{moves}</ol>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
