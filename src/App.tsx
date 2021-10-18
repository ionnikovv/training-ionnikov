import { useState } from 'react';
import './App.css';
import { Game } from './components/Game/Game';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';
import { PokemonsData } from './types/PokemonsData';

export const App = (): JSX.Element => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [pokemonPlayer, setPokemonPlayer] = useState<PokemonsData>();

  return (
    <div className='main-wrapper'>
      {isGameStarted ? (
        <Game pokemonPlayer={pokemonPlayer} />
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
