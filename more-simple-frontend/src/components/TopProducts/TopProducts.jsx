import React from "react";
import CheckersImg from "../../assets/games/checkers.webp";
import TilevilleImg from "../../assets/games/soon.svg";
import LotteryImg from "../../assets/games/thimblerig.svg";
import { FaStar } from "react-icons/fa";

const GamesData = [
  {
    id: 1,
    img: CheckersImg,
    title: "Checkers",
    description:
      "A classic game of strategy. Capture or block your opponent’s pieces and become the champion!",
  },
  {
    id: 2,
    img: TilevilleImg,
    title: "Tileville",
    description:
      "Solve engaging tile puzzles, connect paths, and challenge your brain with fun levels.",
  },
  {
    id: 3,
    img: LotteryImg,
    title: "Lottery",
    description:
      "Test your luck with our exciting lottery game. Pick numbers and win big prizes!",
  },
  {
    id: 1,
    img: CheckersImg,
    title: "Checkers",
    description:
      "A classic game of strategy. Capture or block your opponent’s pieces and become the champion!",
  },
  {
    id: 2,
    img: TilevilleImg,
    title: "Tileville",
    description:
      "Solve engaging tile puzzles, connect paths, and challenge your brain with fun levels.",
  },
  {
    id: 3,
    img: LotteryImg,
    title: "Lottery",
    description:
      "Test your luck with our exciting lottery game. Pick numbers and win big prizes!",
  },
];

const TopGames = ({ handlePlay }) => {
  return (
    <div>
      <div className="container mb-32">
        {/* Header section */}
        <div className="text-left mb-32">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Games to Play
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Enjoy exciting gameplay and challenge yourself with our top-rated games!
          </p>
        </div>
        {/* Game cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-5 place-items-center">
          {GamesData.map((game) => (
            <div
              key={game.id}
              data-aos="zoom-in"
              className="rounded-2xl mt-32 bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* Image */}
              <div className="h-[75px]">
                <img
                  src={game.img}
                  alt={game.title}
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* Game details */}
              <div className="p-4 text-center">
                {/* Star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{game.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {game.description}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={() => handlePlay(game.id)}
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGames;
