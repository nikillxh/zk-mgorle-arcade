import React from "react";
import GameCard from "./gamecard";

const App = () => {
  const games = [
    {
      image: "https://via.placeholder.com/300", // Replace with actual image
      title: "Cyber Quest",
      description: "An AI-powered Metroidvania adventure."
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Rogue AI",
      description: "Battle against evolving AI enemies!"
    }
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-8 bg-gray-900 min-h-screen">
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </div>
  );
};

export default App;
