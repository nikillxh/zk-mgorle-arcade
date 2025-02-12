import React, { useState } from "react";
import WelcomeImg from "../assets/games/guessing-game.svg";
import ThinkingImg from "../assets/games/thinking.png";
import WinnerImg from "../assets/games/winner.png";
import GameOverImg from "../assets/games/game-over.png";

const GameNGuess = () => {
  const [range, setRange] = useState(10);
  const [tries, setTries] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Start game with user-defined settings
  const startGame = () => {
    setAttemptsLeft(tries);
    setCorrectGuesses(0);
    setGameStarted(true);
    setGameOver(false);
    setRandomNumber(generateRandomNumber(range));
    setMessage(`Guess a number between 1 and ${range}!`);
  };

  // Generate random number
  const generateRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

  // Handle guessing
  const handleGuess = () => {
    if (!guess) {
      setMessage("⚠️ Please enter a valid number!");
      return;
    }

    const numGuess = parseInt(guess, 10);
    if (numGuess < 1 || numGuess > range) {
      setMessage(`⚠️ Enter a number between 1 and ${range}!`);
      return;
    }

    if (numGuess === randomNumber) {
      setCorrectGuesses(correctGuesses + 1);
      setMessage(`🎉 Correct! The number was ${randomNumber}.`);
    } else {
      setMessage(`❌ Wrong! The number was ${randomNumber}.`);
    }

    setAttemptsLeft(attemptsLeft - 1);
    if (attemptsLeft - 1 === 0) {
      setGameOver(true);
    } else {
      setRandomNumber(generateRandomNumber(range));
    }

    setGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[86.3vh] bg-gray-900 text-white p-6">
      {!gameStarted ? (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold">🎯 Number Guessing Game</h1>
          <img src={WelcomeImg} alt="Guessing Game" className="w-60" />
          <div className="flex space-x-8">
          <div className="flex flex-col items-start">
            <label className="text-lg">Enter max range:</label>
            <input
              type="number"
              value={range}
              onChange={(e) => setRange(parseInt(e.target.value, 10))}
              className="w-32 text-center p-2 border rounded-lg text-black"
            />
          </div>
          
          <div className="flex flex-col items-start">
            <label className="text-lg">Enter number of tries:</label>
            <input
              type="number"
              value={tries}
              onChange={(e) => setTries(parseInt(e.target.value, 10))}
              className="w-32 text-center p-2 border rounded-lg text-black"
            />
          </div>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          {!gameOver ? (
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-3xl font-bold">🎯 Number Guessing Game</h1>
              <p className="text-lg">{message}</p>
              <img src={ThinkingImg} alt="Thinking" className="w-48" />
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                className="w-32 text-center p-2 border rounded-lg text-black"
              />
              <button
                onClick={handleGuess}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition"
              >
                Guess
              </button>
              <p className="mt-4 text-gray-400">Attempts left: {attemptsLeft}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-3xl font-bold">🎉 Game Over!</h1>
              <img
                src={correctGuesses > tries / 2 ? WinnerImg : GameOverImg}
                alt="Game Over"
                className="w-60"
              />
              <p className="text-lg">Your final score: {correctGuesses}/{tries}</p>
              <button
                onClick={() => setGameStarted(false)}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameNGuess;
