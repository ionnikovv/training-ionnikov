import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { Player } from './Player/Player';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
  playerCoord: number;
  setPlayerCoord: (newPlayerCoord: number) => void;
};

export const Game = ({ pokemonPlayer, playerCoord, setPlayerCoord }: Props): JSX.Element => {
  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>

      <div className='game-block-container'>
        <div className='game-block'>
          <div className='game-field'>
            <Player pokemonUrl={pokemonPlayer?.url} playerCoord={playerCoord} setPlayerCoord={setPlayerCoord} />
          </div>
        </div>
      </div>
    </div>
  );
};
