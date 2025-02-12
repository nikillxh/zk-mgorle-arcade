import React, { useState } from "react";

import WelcomeImg from "../assets/games/guessing-game.svg";
import ThinkingImg from "../assets/games/thinking.png";
import WinnerImg from "../assets/games/winner.png";
import GameOverImg from "../assets/games/game-over.png";

import contractABI from "../constants/nguessABI";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


const GameNGuess = () => {

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

  const startGame1 = async () => {
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


  const [gameConfig, setGameConfig] = useState({ range: 10, attempts: 3 });
  const [gameState, setGameState] = useState({
    isStarted: false,
    numbers: [],
    hashes: [],
    timestamps: [],
    currentHashIndex: 0,
    isGameOver: false,
    score: 0,
  });

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [revealedTimestamp, setRevealedTimestamp] = useState(null);

  const simpleHash = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash * 31 + input.charCodeAt(i)) % 1000000007;
    }
    return hash.toString(16);
  };

  const generateNumbersAndHashes = (count, maxRange) => {
    const nums = [], hashedVals = [], timestamps = [];

    while (nums.length < count) {
      const num = Math.floor(Math.random() * maxRange) + 1;
      if (!nums.includes(num)) {
        const timestamp = Date.now().toString();
        const last4Digits = num.toString().padStart(4, "0").slice(-4);
        const hashInput = `${num}${last4Digits}${timestamp}`;

        nums.push(num);
        timestamps.push(timestamp);
        hashedVals.push(simpleHash(hashInput));
      }
    }

    return { numbers: nums, hashes: hashedVals, timestamps };
  };

  const startGame = () => {
    if (gameConfig.range < 1 || gameConfig.attempts < 1) {
      setMessage("⚠️ Range and attempts must be positive numbers!");
      return;
    }

    if (gameConfig.attempts > gameConfig.range) {
      setMessage("⚠️ Number of attempts cannot exceed the range!");
      return;
    }

    const { numbers, hashes, timestamps } = generateNumbersAndHashes(gameConfig.attempts, gameConfig.range);
    setGameState({
      isStarted: true,
      numbers,
      hashes,
      timestamps,
      currentHashIndex: 0,
      isGameOver: false,
      score: 0,
    });

    setMessage(`Guess the number for Hash #1`);
    setRevealedTimestamp(null);
    setGuess("");
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (!guessNum || guessNum < 1 || guessNum > gameConfig.range) {
      setMessage(`⚠️ Enter a valid number between 1 and ${gameConfig.range}`);
      return;
    }

    const { currentHashIndex, numbers, hashes, timestamps } = gameState;
    const currentNumber = numbers[currentHashIndex];
    const timestamp = timestamps[currentHashIndex];
    const last4Digits = guessNum.toString().padStart(4, "0").slice(-4);
    const guessHash = simpleHash(`${guessNum}${last4Digits}${timestamp}`);

    if (guessHash === hashes[currentHashIndex]) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
        currentHashIndex: prev.currentHashIndex + 1,
        isGameOver: prev.currentHashIndex + 1 >= prev.hashes.length,
      }));

      if (currentHashIndex + 1 >= hashes.length) {
        setMessage(`🎉 Game Over! Final Score: ${gameState.score + 1}/${hashes.length}`);
      } else {
        setMessage(`✅ Correct! Try Hash #${currentHashIndex + 2}`);
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        currentHashIndex: prev.currentHashIndex + 1,
        isGameOver: prev.currentHashIndex + 1 >= prev.hashes.length,
      }));

      if (currentHashIndex + 1 >= hashes.length) {
        setMessage(`Game Over! The number was ${currentNumber}. Final Score: ${gameState.score}/${hashes.length}`);
      } else {
        setMessage(`❌ Wrong! The number was ${currentNumber}. Try Hash #${currentHashIndex + 2}`);
      }
    }

    setRevealedTimestamp(timestamp);
    setGuess("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <div className="h-[86.3vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="container mx-auto max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {!gameState.isStarted ? (
          <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold">🔍 Number Guessing Game</h1>
          <img src={WelcomeImg} alt="Guessing Game" className="w-60 my-4" />        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-lg font-medium">Number Range (1 to ?)</label>
                <input
                  type="number"
                  value={gameConfig.range}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, range: Math.max(1, parseInt(e.target.value) || 0) }))}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-medium">Number of rounds</label>
                <input
                  type="number"
                  value={gameConfig.attempts}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, attempts: Math.max(1, parseInt(e.target.value) || 0) }))}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  min="1"
                />
              </div>
            </div>
            {message && <p className="text-red-500 text-center font-medium">{message}</p>}
            <br />
            <button 
              onClick={() => { startGame1(); startGame(); }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">🔢 Guess the Number</h1>
            {gameState.isGameOver ? (
              <div className="space-y-4 text-center">
                <p className="text-xl font-medium">{message}</p>
                {revealedTimestamp && (
                  <p className="text-gray-500">🔓 Random Noise: {revealedTimestamp}</p>
                )}
                <button 
                  onClick={() => setGameState(prev => ({ ...prev, isStarted: false }))}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-center font-medium">{message}</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">#</th>
                        <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Hash</th>
                        <th className="px-4 py-3 border border-gray-300 dark:border-gray-600">Noise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameState.hashes.map((hash, index) => (
                        <tr 
                          key={index} 
                          className={`text-center ${index === gameState.currentHashIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                          <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">{index + 1}</td>
                          <td className="px-4 py-3 border border-gray-300 dark:border-gray-600 font-mono">{hash}</td>
                          <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                            {index < gameState.currentHashIndex ? gameState.timestamps[index] : "🔒"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="space-y-4">
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Enter a number between 1 and ${gameConfig.range}`}
                    className="w-full p-3 text-center border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    min="1"
                    max={gameConfig.range}
                  />
                  <button 
                    onClick={handleGuess}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    Submit Guess
                  </button>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <p>Current Hash: {gameState.currentHashIndex + 1}/{gameState.hashes.length}</p>
                  <p>Score: {gameState.score}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameNGuess;