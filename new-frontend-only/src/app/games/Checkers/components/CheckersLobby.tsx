import GamePage from '@/components/framework/GamePage';
import { useContext } from 'react';
import CheckersCoverSVG from '../assets/game-cover.svg';
import CheckersCoverMobileSVG from '../assets/game-cover-mobile.svg';
import ZkNoidGameContext from '@/lib/contexts/ZkNoidGameContext';
import { ClientAppChain } from 'zknoid-chain-dev'; // Comment this import when switching to the new blockchain
import LobbyPage from '@/components/framework/Lobby/LobbyPage';
import { checkersConfig } from '../config';
import { useNetworkStore } from '@/lib/stores/network';

export default function CheckersLobby({
  params,
}: {
  params: { lobbyId: string };
}) {
  const networkStore = useNetworkStore();
  const { client } = useContext(ZkNoidGameContext);

  if (!client) {
    throw Error('Context app chain client is not set');
  }

  // For now, the client is linked to the Mina blockchain. Comment the below line when integrating with the new blockchain.
  const client = client as ClientAppChain;

  // Comment out the old blockchain-related logic when moving to a new blockchain protocol.
  // const clientQuery = networkStore.protokitClientStarted 
  //   ? client.query.runtime.CheckersLogic
  //   : undefined;

  return (
    <GamePage
      gameConfig={checkersConfig}
      image={CheckersCoverSVG}
      mobileImage={CheckersCoverMobileSVG}
      defaultPage={'Lobby list'}
    >
      <LobbyPage
        lobbyId={params.lobbyId}
        query={/* Update with new blockchain query logic */}
        contractName={'CheckersLogic'}
        config={checkersConfig}
      />
    </GamePage>
  );
}
