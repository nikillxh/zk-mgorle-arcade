import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const LotteryGame = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [prizePool, setPrizePool] = useState("100.00");
  const [latestWinner, setLatestWinner] = useState("Not Yet Announced");
  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    // Simulate countdown for next draw
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const drawTime = new Date().setHours(24, 0, 0, 0); // Next draw at midnight
      const timeLeft = drawTime - now;

      const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "0");

      setCountdown(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const buyTickets = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const pricePerTicket = ethers.parseEther("0.01");
      const totalCost = pricePerTicket * BigInt(ticketCount);

      await signer.sendTransaction({
        to: "0xYourContractAddress", // Replace with your contract address
        value: totalCost,
      });

      alert("✅ Tickets Purchased!");
    } catch (error) {
      console.error("Transaction failed", error);
      alert("❌ Transaction Rejected!");
    }
  };

  return (
    <div className="h-[86.3vh] flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold">🎟️ Blockchain Lottery</h1>
      <p className="mt-2 text-lg">Win big prizes in our fair, on-chain lottery!</p>
      
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-xl">💰 Prize Pool: <span className="font-bold">{prizePool} ETH</span></p>
        <p className="mt-2 text-xl">🏆 Latest Winner: <span className="font-bold">{latestWinner}</span></p>
        <p className="mt-2 text-xl">⏳ Next Draw In: <span className="font-bold">{countdown}</span></p>
        
        <div className="mt-6 flex items-center">
          <input
            type="number"
            min="1"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            className="w-20 p-2 text-center rounded bg-gray-700 text-white"
          />
          <span className="ml-2">tickets (0.01 ETH each)</span>
        </div>
        
        <button
          onClick={buyTickets}
          className="mt-4 w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold"
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default LotteryGame;