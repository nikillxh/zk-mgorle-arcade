import { banner_image } from '../../utils/images';
import { FaGamepad } from 'react-icons/fa';
import GameCard from '../../Componets/gamecard';  // Import the GameCard component
import Cat from '../../assets/images/cat-wife.svg';

const Banner = () => {
  const game = {
    image: Cat, // Replace with actual image
    title: "Cyber Quest",
    description: "An AI-powered Metroidvania adventure."
  };

  return (
    <div className="flex items-center justify-start bg-cover bg-center min-h-[768px] relative" style={{
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), linear-gradient(248.75deg, rgba(0, 159, 157, 0.41) 0%, rgba(15, 10, 60, 0.41) 38.46%), url(${banner_image}) no-repeat`
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Background overlay */}

      <div className="relative container text-white py-12 px-4 md:px-8">
        <div className="text-uppercase text-green-500 font-semibold text-lg mb-6">join streaming</div>
        <h1 className="text-4xl font-light leading-tight mb-10 max-w-3xl">best online game to play</h1>
        <p className="text-lg max-w-3xl mb-8">
          Live gaming with lots of other games.
        </p>
        
        <button type="button" className="flex items-center gap-3 bg-transparent border-2 border-green-500 text-green-500 px-6 py-3 text-lg font-semibold uppercase rounded hover:bg-green-500 hover:text-white transition-all">
          <FaGamepad className="text-white" size={25} />
          <span className="text-white">Play Now</span>
        </button>

        {/* GameCard Component */}
        <div className="mt-8">
          <GameCard game={game} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
