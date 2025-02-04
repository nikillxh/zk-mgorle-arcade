import { useContext, useEffect, useState } from 'react';
// import { Field, Poseidon, PublicKey, UInt64 } from 'o1js'; // Commented out Mina-related imports
import { useNetworkStore } from '@/lib/stores/network';
// import { ClientAppChain } from 'zknoid-chain-dev'; // Commented out Mina-related import
import GamePage from '@/components/framework/GamePage';
import { numberGuessingConfig } from './config';
import ZkNoidGameContext from '@/lib/contexts/ZkNoidGameContext';
import { useProtokitChainStore } from '@/lib/stores/protokitChain';
import CoverSVG from './assets/game-cover.svg';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { useNotificationStore } from '@/components/shared/Notification/lib/notificationStore';

export default function NumberGuessing({
  params,
}: {
  params: { competitionId: string };
}) {
  const [hiddenNumberHash, setHiddenNumberHash] = useState<bigint>(0n);
  const [userScore, setUserScore] = useState<bigint>(0n);
  const [inputNumber, setInputNumber] = useState<number>(1);

  const { client } = useContext(ZkNoidGameContext);

  if (!client) {
    throw Error('Context app chain client is not set');
  }

  const networkStore = useNetworkStore();
  const protokitChain = useProtokitChainStore();
  const notificationStore = useNotificationStore();

  // Commenting out Mina blockchain-related client logic
  /*
  const client_ = client as ClientAppChain<
    typeof numberGuessingConfig.runtimeModules,
    any,
    any,
    any
  >;

  const query = networkStore.protokitClientStarted
    ? client_.query.runtime.GuessGame
    : undefined;
  */

  const hideNumber = async (number: number) => {
    // Placeholder for future blockchain integration
    console.log(`Hiding number: ${number}`);
  };

  const guessNumber = async (number: number) => {
    // Placeholder for future blockchain integration
    console.log(`Guessing number: ${number}`);

    if (number === 42) {
      notificationStore.create({
        type: 'success',
        message: 'Guessed correctly',
      });
    } else {
      notificationStore.create({
        type: 'error',
        message: 'Guessed incorrectly!',
      });
    }
  };

  useEffect(() => {
    // Placeholder for fetching game state from new blockchain
    console.log('Fetching game state...');
  }, [protokitChain.block]);

  return (
    <GamePage
      gameConfig={numberGuessingConfig}
      image={CoverSVG}
      mobileImage={CoverSVG}
      defaultPage="Game"
    >
      <motion.div
        className="flex grid-cols-4 flex-col-reverse gap-6 pt-10 lg:grid lg:pt-0"
        animate="windowed"
      >
        <div className="flex flex-col gap-4 p-4 bg-gray-800 text-white rounded-xl shadow-md lg:hidden">
          <span className="text-headline-2 font-bold">Game Rules</span>
          <span className="text-buttons-menu font-normal">
            {numberGuessingConfig.rules}
          </span>
        </div>

        <div className="hidden h-full w-full flex-col gap-6 bg-gray-900 p-6 rounded-xl shadow-md text-white lg:flex">
          <div className="flex w-full gap-2 text-lg uppercase text-left-accent">
            <span>Game status:</span>
            <span>{hiddenNumberHash ? 'Guessing' : 'Hiding'}</span>
          </div>
          <span className="text-lg">User Score: {userScore}</span>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">
                {hiddenNumberHash ? 'Guess the number:' : 'Enter number to hide:'}
              </span>
              <input
                type="number"
                className="text-black p-2 rounded-md border border-gray-400"
                value={inputNumber}
                onChange={(e) => setInputNumber(parseInt(e.target.value))}
              />
              <Button
                label={hiddenNumberHash ? 'Guess Number' : 'Hide Number'}
                onClick={() =>
                  hiddenNumberHash
                    ? guessNumber(inputNumber)
                    : hideNumber(inputNumber)
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
    </GamePage>
  );
}
