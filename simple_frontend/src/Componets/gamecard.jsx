import React from "react";
import { FaPlay } from "react-icons/fa";

const GameCard = ({ game }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-72">
      {/* Game Image */}
      <div className="relative">
        <img src={game.image} alt={game.title} className="w-32 h-32" />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{game.title}</h3>
        <p className="text-sm text-gray-400 mt-2">{game.description}</p>
      </div>

      {/* Play Button */}
      <div className="p-4 flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
          onClick={() => alert(`Starting ${game.title}!`)}
        >
          <FaPlay /> Play
        </button>
      </div>
    </div>
  );
};

export default GameCard;
