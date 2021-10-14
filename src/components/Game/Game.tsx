import { useState } from 'react';
import { Obstacle } from '../../types/GameTypes';
import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { Obstacle as ObstacleComponent } from './Obstacle/Obstacle';
import { Player } from './Player/Player';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  const [obstacles] = useState<Obstacle[]>([{ height: 10, x: 1, y: 0 }]);
  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>

      <div className='game-block-container'>
        <div className='game-block'></div>
      </div>
      <Player pokemonUrl={pokemonPlayer?.url} />
      {obstacles.map((obstacle) => (
        <ObstacleComponent />
      ))}
    </div>
  );
};
