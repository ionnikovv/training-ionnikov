import { useState } from 'react';
import './App.css';
import { StateForGame } from './components/Game/StateForGame';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';
import { PokemonsData } from './types/PokemonsData';

export const App = (): JSX.Element => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [pokemonPlayer, setPokemonPlayer] = useState<PokemonsData>();

  return (
    <div className='main-wrapper'>
      {isGameStarted ? (
        <StateForGame pokemonPlayer={pokemonPlayer} />
      ) : (
        <div>
          <SelectPokemons
            selectedPokemons={pokemonPlayer ? [pokemonPlayer.name] : []}
            onSelectPokemon={setPokemonPlayer}
          />
          {pokemonPlayer && (
            <div className='btn-start-wrapper'>
              <button
                className='btn-start'
                onClick={() => {
                  setIsGameStarted(true);
                }}
              >
                Start
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
