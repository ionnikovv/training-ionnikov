import { useState } from 'react';
import './App.css';
import { Game } from './components/Game/Game';
import { SelectPokemons } from './components/SelectPokemons/SelectPokemons';
import { PokemonsData } from './types/PokemonsData';

type Props = {
  disabledPokemons?: string[];
  selectedPokemonSize?: number;
};

export const App = ({ disabledPokemons = [''], selectedPokemonSize = 1 }: Props): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [pokemonPlayer, setPokemonPlayer] = useState<PokemonsData>();
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

  const onSelectPokemon = (pokemon: PokemonsData, isCurrentlySelected: boolean): void => {
    setPokemonPlayer(pokemon);
    if (isCurrentlySelected) {
      setIsSelected(!isSelected);
      setSelectedPokemons(selectedPokemons.filter((item) => item !== pokemon.name));
    } else {
      if (disabledPokemons.includes(pokemon.name)) return;

      if (selectedPokemons.length >= selectedPokemonSize)
        return setSelectedPokemons([...selectedPokemons.slice(1), pokemon.name]);

      setIsSelected(!isSelected);
      setSelectedPokemons([...selectedPokemons, pokemon.name]);
    }
  };

  return (
    <div className='main-wrapper'>
      {isSelected && (
        <div className='btn-start-wrapper'>
          <button
            className='btn-start'
            onClick={() => {
              setIsSelected(false);
              setIsGameStarted(true);
            }}
          >
            Start
          </button>
        </div>
      )}
      {isGameStarted ? (
        <Game pokemonPlayer={pokemonPlayer} />
      ) : (
        <SelectPokemons selectedPokemons={selectedPokemons} onSelectPokemon={onSelectPokemon} />
      )}
    </div>
  );
};
