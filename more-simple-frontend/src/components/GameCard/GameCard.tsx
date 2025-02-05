import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/game/${game.id}`)}
      className="cursor-pointer rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[350px]" // Increased size
    >
      {/* Image */}
      <div className="h-[120px]"> {/* Increased height */}
        <img
          src={game.img}
          alt={game.title}
          className="max-w-[160px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>
      {/* Game details */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">{game.title}</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {game.description}
        </p>
        <button
          className="bg-primary hover:scale-105 duration-300 text-white py-2 px-6 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
