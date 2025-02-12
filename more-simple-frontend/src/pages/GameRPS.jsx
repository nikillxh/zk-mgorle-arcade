import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = ["ROCK", "PAPER", "SCISSORS"];

const GameRPS = () => {
  const [playerVal, setPlayerVal] = useState(null);
  const [computerVal, setComputerVal] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [message, setMessage] = useState("Make your move!");

  // Determine winner
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

  // Handle user choice
  const decision = (playerChoice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = logic(playerChoice, compChoice);

    setPlayerVal(playerChoice);
    setComputerVal(compChoice);

    if (result === 1) {
      setPlayerScore(playerScore + 1);
      setMessage("🎉 You Win!");
    } else if (result === -1) {
      setCompScore(compScore + 1);
      setMessage("😢 You Lose!");
    } else {
      setMessage("🤝 It's a Tie!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[86.3vh] bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🪨📄✂️ Rock, Paper, Scissors</h1>

      {/* Choices Buttons */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => decision("ROCK")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg transition shadow-md"
        >
          <FaHandRock className="text-2xl" /> Rock
        </button>
        <button
          onClick={() => decision("PAPER")}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-lg transition shadow-md"
        >
          <FaHandPaper className="text-2xl" /> Paper
        </button>
        <button
          onClick={() => decision("SCISSORS")}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-lg transition shadow-md"
        >
          <FaHandScissors className="text-2xl" /> Scissors
        </button>
      </div>

      {/* Game Result */}
      <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">{message}</h2>
        <p className="text-xl">👤 Your Choice: <span className="font-bold text-blue-400">{playerVal || "?"}</span></p>
        <p className="text-xl">🤖 Computer's Choice: <span className="font-bold text-red-400">{computerVal || "?"}</span></p>
        <hr className="my-4 border-gray-600" />
        <h2 className="text-2xl font-semibold text-green-400">🏆 Your Score: {playerScore}</h2>
        <h2 className="text-2xl font-semibold text-red-400">💻 Computer Score: {compScore}</h2>
      </div>
    </div>
  );
};

export default GameRPS;
