import { useState } from 'react';
import { Game } from './Game';
import { PokemonsData } from '../../types/PokemonsData';

type Props = {
  pokemonPlayer: PokemonsData | undefined;
};

export const StateForGame = ({ pokemonPlayer }: Props): JSX.Element => {
  const [playerCoord, setPlayerCoord] = useState(0);

  return (
    <div>
      <Game pokemonPlayer={pokemonPlayer} playerCoord={playerCoord} setPlayerCoord={setPlayerCoord} />;
    </div>
  );
};
