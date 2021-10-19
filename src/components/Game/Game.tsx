import { PokemonsData } from '../../types/PokemonsData';
import './Game.css';
import { Player } from './Player/Player';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

export const Game = ({ pokemonPlayer }: Props): JSX.Element => {
  return (
    <div className='game-wrapper'>
      <span className='game-logo'>RUN, {pokemonPlayer?.name}, RUN!!!</span>

      <div className='game-block-container'>
        <div className='game-block'>
          <div className='game-field'>
            <Player pokemonUrl={pokemonPlayer?.url} />
          </div>
        </div>
      </div>
    </div>
  );
};
