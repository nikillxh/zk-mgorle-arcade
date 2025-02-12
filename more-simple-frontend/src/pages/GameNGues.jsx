import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../constants/nguessABI";
import WelcomeImg from "../assets/games/guessing-game.svg";
import ThinkingImg from "../assets/games/thinking.png";
import WinnerImg from "../assets/games/winner.png";
import GameOverImg from "../assets/games/game-over.png";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const GameNGuess = () => {
  const [range, setRange] = useState(10);
  const [tries, setTries] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [hashedNumbers, setHashedNumbers] = useState([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const getContract = async () => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request user accounts
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, contractABI, signer);
    } catch (error) {
      console.error("Error getting contract:", error);
      throw new Error("Failed to connect to MetaMask. Please try again.");
    }
  };

  const getHashes = async (contract) => {
    try {
      const hashes = await contract.getHashedNumbers();
      console.log("🔹 Hashed Numbers:", hashes);
      setHashedNumbers(hashes);
    } catch (error) {
      console.error("Error getting hashes:", error);
    }
  };

  const startGame = async () => {
    if (range < 1 || tries < 1) {
      setMessage("⚠️ Range and tries must be positive numbers!");
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.generateHashes(tries, range);
      await tx.wait();

      // Wait for blockchain confirmation and get hashes
      await getHashes(contract);

      setAttemptsLeft(tries);
      setGameStarted(true);
      setGameOver(false);
      setIsWinner(false);
      setScore(0);
      setMessage(`Game started! Try guessing a number between 1 and ${range}`);
    } catch (error) {
      console.error("❌ Error starting game:", error);
      setMessage(error.message || "Error starting game. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = async () => {
    if (!guess || isNaN(guess) || guess < 1 || guess > range) {
      setMessage(`⚠️ Please enter a valid number between 1 and ${range}!`);
      return;
    }

    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.makeGuess(parseInt(guess));
      await tx.wait();

      const address = await contract.signer.getAddress();
      const playerScore = await contract.getPlayerScore(address);
      const newScore = Number(playerScore);
      setScore(newScore);

      const isGameWon = newScore === tries;
      if (isGameWon) {
        setIsWinner(true);
        setGameOver(true);
        setMessage("🎉 Congratulations! You've won!");
      } else {
        const newAttemptsLeft = attemptsLeft - 1;
        setAttemptsLeft(newAttemptsLeft);

        if (newAttemptsLeft === 0) {
          setGameOver(true);
          setMessage(`Game Over! Final Score: ${newScore}`);
        } else {
          setMessage(`Keep trying! Score: ${newScore}`);
        }
      }
    } catch (error) {
      console.error("❌ Error making guess:", error);
      setMessage(error.message || "Error submitting guess. Please try again.");
    } finally {
      setLoading(false);
      setGuess("");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {!gameStarted ? (
          <div className="flex flex-col items-center gap-6 max-w-md w-full">
            <h1 className="text-4xl font-bold text-center">🎯 Number Guessing Game</h1>
            <img src={WelcomeImg} alt="Guessing Game" className="w-60" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-lg">Maximum Range:</label>
                <input
                  type="number"
                  value={range}
                  onChange={(e) => setRange(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                  min="1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg">Number of Tries:</label>
                <input
                  type="number"
                  value={tries}
                  onChange={(e) => setTries(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                  min="1"
                />
              </div>
            </div>
            {message && <p className="text-red-500 dark:text-red-400">{message}</p>}
            <button
              onClick={startGame}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
            >
              {loading ? "Starting..." : "Start Game"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center">🎯 Number Guessing Game</h1>
            {gameOver ? (
              <div className="flex flex-col items-center gap-4">
                <img src={isWinner ? WinnerImg : GameOverImg} alt="Result" className="w-60" />
                <p className="text-xl text-center">{message}</p>
                <button
                  onClick={() => setGameStarted(false)}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-200"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg text-center">{message}</p>
                <img src={ThinkingImg} alt="Thinking" className="w-48" />
                
                <div className="w-full space-y-4">
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !loading && handleGuess()}
                    placeholder={`Enter number (1-${range})`}
                    className="w-full text-center p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                    min="1"
                    max={range}
                  />
                  <button
                    onClick={handleGuess}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-400 text-white rounded-lg transition-colors duration-200"
                  >
                    {loading ? "Checking..." : "Make Guess"}
                  </button>
                </div>

                <div className="w-full">
                  <h2 className="text-xl font-semibold text-center mb-2">🔢 Hashed Numbers</h2>
                  <div className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 overflow-auto max-h-40">
                    {hashedNumbers.length > 0 ? (
                      <ul className="list-none space-y-1">
                        {hashedNumbers.map((hash, index) => (
                          <li key={index} className="break-all">{hash}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center">Loading hashed numbers...</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between w-full text-lg">
                  <p>Attempts left: {attemptsLeft}</p>
                  <p>Score: {score}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameNGuess;