import { useState } from 'react';
import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { Player } from './Player/Player';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  const [playerCoord, setPlayerCoord] = useState(0);
  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>

      <div className='game-block-container'>
        <div className='game-block'>
          <div className='game-field'>
            <Player pokemonUrl={pokemonPlayer?.url} playerCoord={playerCoord} onChangePlayerCoord={setPlayerCoord} />
          </div>
        </div>
      </div>
    </div>
  );
};
