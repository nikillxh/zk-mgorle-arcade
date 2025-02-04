import Arkanoid from './Arkanoid';
import NewArkanoidCompetitionPage from './components/NewArkanoidCompetitionPage';
import ArkanoidCompetitionsListPage from './components/ArkanoidCompetitionsListPage';
import { LogoMode } from '@/app/constants/games';

const description =
  'Old but gold game. Beat all the bricks and protect the ball from falling';

const rules = `In Arkanoid, your objective is to break all the bricks on the screen using a bouncing ball and a platform. 
    
    You can control the game by using the left and right arrow keys on your keyboard to move the platform. 
    You need to bounce the ball and prevent it from falling off the bottom of the screen.

    Try to try to hit the ball while cart is moving to give it acceleration and control the ball's flight
    `;

export const arkanoidConfig = {
  id: 'arkanoid',
  type: 'SinglePlayer',  // Adjusted as it's no longer ZkNoidGameType
  name: 'Arkanoid game',
  description: description,
  image: '/image/games/arkanoid.svg',
  logoMode: LogoMode.FULL_WIDTH,
  genre: 'Arcade',  // Adjusted as it's no longer ZkNoidGameGenre
  features: ['SinglePlayer'],  // Adjusted as it's no longer ZkNoidGameFeature
  isReleased: true,
  releaseDate: new Date(2023, 11, 1),
  popularity: 60,
  author: 'Game Team',  // Changed from 'ZkNoid Team'
  rules: rules,
  runtimeModules: {},  // No longer need ArkanoidGameHub
  page: Arkanoid,
  pageCompetitionsList: ArkanoidCompetitionsListPage,
  pageNewCompetition: NewArkanoidCompetitionPage,
};

export const arkanoidRedirectConfig = {
  id: 'arkanoid',
  type: 'SinglePlayer',  // Adjusted
  name: 'Arkanoid game',
  description: description,
  image: '/image/games/arkanoid.svg',
  logoMode: LogoMode.FULL_WIDTH,
  genre: 'Arcade',  // Adjusted
  features: ['SinglePlayer'],  // Adjusted
  isReleased: true,
  releaseDate: new Date(2023, 11, 1),
  popularity: 60,
  author: 'Game Team',  // Changed
  rules: rules,
  runtimeModules: {},  // No longer need ArkanoidGameHub
  page: undefined as any,
  pageCompetitionsList: ArkanoidCompetitionsListPage,
  pageNewCompetition: NewArkanoidCompetitionPage,
  externalUrl: 'https://proto.example.io/games/arkanoid/global',  // Adjusted URL
};
