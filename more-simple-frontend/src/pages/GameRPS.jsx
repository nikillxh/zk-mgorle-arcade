import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = ["ROCK", "PAPER", "SCISSORS"];

const GameRPS = () => {
  const [playerVal, setPlayerVal] = useState(null);
  const [computerVal, setComputerVal] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);

  // Game logic function
  const logic = (player, computer) => {
    if (player === computer) return 0;
    if (
      (player === "ROCK" && computer === "SCISSORS") ||
      (player === "SCISSORS" && computer === "PAPER") ||
      (player === "PAPER" && computer === "ROCK")
    ) {
      return 1;
    }
    return -1;
  };

  // Handle player choice
  const decision = (playerChoice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = logic(playerChoice, compChoice);

    setPlayerVal(playerChoice);
    setComputerVal(compChoice);

    if (result === 1) {
      setPlayerScore((prev) => prev + 1);
    } else if (result === -1) {
      setCompScore((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Rock, Paper, Scissors</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => decision("ROCK")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg transition"
        >
          <FaHandRock className="text-2xl" /> Rock
        </button>
        <button
          onClick={() => decision("PAPER")}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-lg transition"
        >
          <FaHandPaper className="text-2xl" /> Paper
        </button>
        <button
          onClick={() => decision("SCISSORS")}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-lg transition"
        >
          <FaHandScissors className="text-2xl" /> Scissors
        </button>
      </div>

      {/* Game Result */}
      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-xl">Your Choice: <span className="font-bold">{playerVal || "?"}</span></p>
        <p className="text-xl">Computer's Choice: <span className="font-bold">{computerVal || "?"}</span></p>
        <h2 className="text-2xl font-semibold mt-4">Your Score: {playerScore}</h2>
        <h2 className="text-2xl font-semibold">Computer Score: {compScore}</h2>
      </div>
    </div>
  );
};

export default GameRPS;
