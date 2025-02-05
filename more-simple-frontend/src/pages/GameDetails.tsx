import { useParams } from "react-router-dom";

const GameDetails = () => {
  const { id } = useParams();
  const game = GamesData.find((g) => g.id === Number(id));

  if (!game) {
    return <h1 className="text-center text-3xl text-red-500">Game Not Found</h1>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">{game.title}</h1>
      <img src={game.img} alt={game.title} className="w-full max-w-md mx-auto my-6" />
      <p className="text-lg">{game.description}</p>
      <button className="mt-4 px-6 py-3 bg-primary text-white rounded-lg">Play Game</button>
    </div>
  );
};

export default GameDetails;
