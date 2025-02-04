'use client';

import { useEffect, useRef, useState } from 'react';
import { GameView, ITick } from '@/games/arkanoid/components/GameView';
import { useSwitchWidgetStorage } from '@/lib/stores/switchWidgetStorage';
import { useWorkerClientStore } from '@/lib/stores/workerClient';
import { GameState } from './lib/gameState';
import { arkanoidConfig } from './config';
import GamePage from '@/components/framework/GamePage';
import GameWidget from '@/components/framework/GameWidget';
import { Leaderboard } from '@/components/framework/GameWidget/ui/Leaderboard';
import { Competition } from '@/components/framework/GameWidget/ui/Competition';
import { ConnectWallet } from '@/components/framework/GameWidget/ui/popups/ConnectWallet';
import { RateGame } from '@/components/framework/GameWidget/ui/popups/RateGame';
import { Lost } from '@/components/framework/GameWidget/ui/popups/Lost';
import { Win } from '@/components/framework/GameWidget/ui/popups/Win';
import { InstallWallet } from '@/components/framework/GameWidget/ui/popups/InstallWallet';
import { DebugCheckbox } from '@/components/framework/GameWidget/ui/DebugCheckbox';
import { FullscreenButton } from '@/components/framework/GameWidget/ui/FullscreenButton';
import { FullscreenWrap } from '@/components/framework/GameWidget/ui/FullscreenWrap';
import { PreRegModal } from './ui/PreRegModal';
import Button from '@/components/shared/Button';
import ArkanoidCoverSVG from './assets/game-cover.svg';
import ArkanoidMobileCoverSVG from './assets/game-cover-mobile.svg';

export default function Arkanoid({
  params,
}: {
  params: { competitionId: string };
}) {
  const [gameState, setGameState] = useState(GameState.NotStarted);
  const [lastTicks, setLastTicks] = useState<ITick[]>([]);
  const [score, setScore] = useState<number>(0);
  const [ticksAmount, setTicksAmount] = useState<number>(0);
  const [competition, setCompetition] = useState<any>(); // Removed type specific to zk-noid
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPreRegModalOpen, setIsPreRegModalOpen] = useState<boolean>(false);
  const [gameId, setGameId] = useState(0);
  const [debug, setDebug] = useState(false);
  const [level, setLevel] = useState<any>(null); // Removed reference to Bricks enum

  const shouldUpdateLeaderboard = useRef(false);
  const switchStore = useSwitchWidgetStorage();
  const workerClientStore = useWorkerClientStore();

  const startGame = () => {
    setGameState(GameState.Active);
    setScore(0); // Reset score at the start of a new game
    setTicksAmount(0); // Reset ticks
  };

  const isRestartButton =
    gameState === GameState.Lost || gameState === GameState.Won;

  useEffect(() => {
    // Placeholder for future competition retrieval logic, if applicable
    // Set the competition state, e.g., fetching from an API or other source
    if (params.competitionId) {
      setCompetition({ id: params.competitionId, rules: 'Sample rules' }); // Example competition setup
    }
  }, [params.competitionId]);

  return (
    <GamePage
      gameConfig={arkanoidConfig}
      image={ArkanoidCoverSVG}
      mobileImage={ArkanoidMobileCoverSVG}
      defaultPage={'Game'}
    >
      <FullscreenWrap isFullscreen={isFullscreen}>
        {competition && (
          <>
            <Leaderboard leaderboard={[]} /> {/* Placeholder for leaderboard */}
            <div className={'flex flex-col gap-4 lg:hidden'}>
              <span className={'w-full text-headline-2 font-bold'}>Rules</span>
              <span
                className={
                  'whitespace-pre-line font-plexsans text-buttons-menu font-normal'
                }
              >
                {competition ? competition.rules : ' - '}
              </span>
            </div>
          </>
        )}

        <GameWidget
          gameId={arkanoidConfig.id}
          ticks={ticksAmount}
          score={score}
          author={arkanoidConfig.author}
        >
          <ConnectWallet connectWallet={() => {}} /> {/* Placeholder for wallet connection */}
          {gameState === GameState.Active && (
            <div
              className={'flex h-full w-full items-center justify-center p-[10%] lg:p-0'}
            >
              <GameView
                onWin={(ticks) => {
                  setLastTicks(ticks);
                  setGameState(GameState.Won);
                }}
                onLost={(ticks) => {
                  setLastTicks(ticks);
                  setGameState(GameState.Lost);
                }}
                onRestart={(ticks) => {
                  setLastTicks(ticks);
                  startGame();
                }}
                level={level}
                gameId={gameId}
                debug={debug}
                setScore={setScore}
                setTicksAmount={setTicksAmount}
              />
            </div>
          )}

          <FullscreenButton
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
          />
        </GameWidget>

        {gameState === GameState.Lost && (
          <Lost startGame={startGame} />
        )}
        {gameState === GameState.Won && (
          <Win
            onBtnClick={() => setGameState(GameState.RateGame)}
            title={'You won! Congratulations!'}
            subTitle={'If you want to see your name in leaderboard you have to send the proof!'}
            btnText={'Send proof'}
          />
        )}
        {gameState === GameState.RateGame && (
          <RateGame
            gameId={arkanoidConfig.id}
            onClick={() => setGameState(GameState.NotStarted)}
          />
        )}
        {isPreRegModalOpen && competition && (
          <PreRegModal competition={competition} />
        )}
      </FullscreenWrap>
      <DebugCheckbox debug={debug} setDebug={setDebug} />
    </GamePage>
  );
}
